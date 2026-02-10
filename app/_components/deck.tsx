'use client'

import Card from "./card";
import { useAppDispatch, useAppSelector } from "../_lib/hooks";
import { flipCard as flipCardThunk } from "../_lib/feat/flipCard/flipCard.thunk";
import { Card as CardType, GameFlipLog } from "../_lib/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { CARD_ASSETS, CardKey } from "../_lib/card-assets";
import { fetchGameFlipLog as fetchGameFlipLogThunk } from "../_lib/feat/fetchGameFlipLog/fetchGameFlipLog.thunk";
import { useParams, useRouter } from "next/navigation";
import { fetchGameFlipLogActions } from "../_lib/feat/fetchGameFlipLog/fetchGameFlipLog.slice";

export default function Deck ({ cards }: {cards?: CardType[]}) {
  const router = useRouter()

  const [currentFlip, setCurrentFlip] = useState<number[]>([])
  const isLockedRef = useRef(false)

  const dispatch = useAppDispatch();
  const fetchGameFlipLogState = useAppSelector((state) => state.fetchGameFlipLog)

  const params = useParams<{matchId: string}>()

  //set the game by getting the game history
  const hasFetchedOnce = useRef(false)
  useEffect(() => {
    if (hasFetchedOnce.current) return

    dispatch(fetchGameFlipLogThunk({ matchingPairId: params.matchId }))
      .unwrap()
      .then((result) => {
        if(result.gameOver) {
          router.replace('/gameover/win')
          router.refresh()
        }

        return result
      })
      .then((result) => {
        dispatch(fetchGameFlipLogActions.setHasInitialized(true))

        result.gameFlipLogs.forEach((history) => {
          if(history.matchedWith === null) {
            setCurrentFlip([history.cardId])
          }
        })
      })
      .finally(() => {
        hasFetchedOnce.current = true;
      })
  }, [dispatch, fetchGameFlipLogState.gameOver, params.matchId, router])

  //flip the card and send the request to get the game history
  function handleOnFlip(card: CardType) {
    //0. Disable the on click
    if(isLockedRef.current) return
    isLockedRef.current = true
    //1. flip the card on click
    //2. dispatch thunk
    dispatch(flipCardThunk({cardId: card.id, matchingPairId: params.matchId}))
      .unwrap()
      .then(() => {
        //set the flip on success
        setCurrentFlip(prev => {
          if(prev.includes(card.id)) {
            return prev
          }

          return [...prev, card.id]
        })
      })
  }

  function handleOnTransitionEnd (isMatched: boolean) {
    isLockedRef.current = false

    //empty the current flip then the cards will flip back
    if(currentFlip.length >= 2) {
      setCurrentFlip([])

      //if the cards matched, they wont flip back and set it to false
      //if the cards do not matched, the cards will flip back and locked is to true
      isLockedRef.current = !isMatched
    }

    if(fetchGameFlipLogState.gameOver) {
      router.replace('/gameover/win')
      router.refresh()
    }
  }

  const pendingMatchesMap = useMemo(() => {
    const map = new Map<number, GameFlipLog>()

    fetchGameFlipLogState.gameFlipLog.forEach((flipLog) => {
      if(flipLog.card.isMatched) {
        map.set(flipLog.cardId, flipLog)
      }
    })

    return map
  }, [fetchGameFlipLogState.gameFlipLog])

  return (
    <div className="grid grid-cols-4 gap-4 place-items-center max-w-xs max-h-70">
      {
        cards && cards.map((card) => {

          const pendingHistory = pendingMatchesMap.get(card.id)
          const isMatched = !!pendingHistory

          const cardValue =  CARD_ASSETS[card.cardTemplate.value as CardKey]   

          return (
            <Card onClick={() => handleOnFlip(card)} onTransitionEnd={() => handleOnTransitionEnd(isMatched)} key={card.id} value={cardValue.emoji} isFlipped={currentFlip.includes(card.id)} isMatched={isMatched} />
          )
        })
      }
    </div>
  )
}