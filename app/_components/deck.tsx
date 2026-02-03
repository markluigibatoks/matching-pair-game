'use client'

import Card from "./card";
import { useAppDispatch, useAppSelector } from "../_lib/hooks";
import { flipCard as flipCardThunk } from "../_lib/feat/flipCard/flipCard.thunk";
import { Card as CardType, GameFlipLog } from "../_lib/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { CARD_ASSETS, CardKey } from "../_lib/card-assets";
import { fetchGameFlipLog as fetchGameFlipLogThunk } from "../_lib/feat/fetchGameFlipLog/fetchGameFlipLog.thunk";
import { useParams } from "next/navigation";
import { fetchGameFlipLogActions } from "../_lib/feat/fetchGameFlipLog/fetchGameFlipLog.slice";

export default function Deck ({ cards }: {cards?: CardType[]}) {

  const [currentFlip, setCurrentFlip] = useState<number[]>([])
  const isLockedRef = useRef(false)

  const dispatch = useAppDispatch();
  const fetchGameFlipLogState = useAppSelector((state) => state.fetchGameFlipLog)

  const params = useParams<{matchId: string}>()

  //set the game by getting the game history
  const hasFetchedOnce = useRef(false)
  useEffect(() => {
    if (hasFetchedOnce.current) return

    hasFetchedOnce.current = true;
    dispatch(fetchGameFlipLogThunk({ matchingPairId: params.matchId }))
      .unwrap()
      .then((result) => {
        dispatch(fetchGameFlipLogActions.setHasInitialized(true))

        result.gameFlipLogs.forEach((history) => {
          if(history.matchedWith === null) {
            setCurrentFlip([history.cardId])
          }
        })
      })
  }, [dispatch, params.matchId])

  //flip the card and set a timeout to send the request to get the game history
  function handleOnFlip(card: CardType) {
    //0. Disable the on click
    if(isLockedRef.current) return
    isLockedRef.current = true
    //1. flip the card on click
    setCurrentFlip(prev => {
      if(prev.includes(card.id)) {
        return prev
      }

      return [...prev, card.id]
    })
    //2. dispatch thunk on transition end
  }

  function handleOnTransitionEnd (card: CardType, isFlipped: boolean) {
    if(currentFlip.length >= 2) {
      setCurrentFlip([])
    }

    //guard on site refresh
    if(isFlipped) {
      dispatch(flipCardThunk({cardId: card.id, matchingPairId: params.matchId})).then(() => {
        const areCardsFlippingBack = currentFlip.length < 1
        isLockedRef.current = areCardsFlippingBack
      })
    }

    //check here if the match is over
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
    <div className="grid grid-cols-4 gap-4 place-items-center max-w-xs">
      {
        cards && cards.map((card) => {

          const pendingHistory = pendingMatchesMap.get(card.id)
          const isMatched = !!pendingHistory

          const cardValue =  CARD_ASSETS[card.cardTemplate.value as CardKey]   

          return (
            <Card onClick={() => handleOnFlip(card)} onTransitionEnd={() => handleOnTransitionEnd(card, currentFlip.includes(card.id))} key={card.id} value={cardValue.emoji} isFlipped={currentFlip.includes(card.id)} isMatched={isMatched} />
          )
        })
      }
    </div>
  )
}