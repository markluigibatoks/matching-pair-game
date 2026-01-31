'use client'

import Card from "./card";
import { useAppDispatch, useAppSelector } from "../_lib/hooks";
import { flipCard as flipCardThunk } from "../_lib/feat/flipCard/flipCard.thunk";
import { Card as CardType, GameHistory } from "../_lib/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { CARD_ASSETS, CardKey } from "../_lib/card-assets";
import { fetchGameHistory as fetchGameHistoryThunk } from "../_lib/feat/fetchGameHistory/fetchGameHistoty.thunk";
import { useParams } from "next/navigation";
import { fetchGameHistoryActions } from "../_lib/feat/fetchGameHistory/fetchGameHistory.slice";

export default function Deck ({ cards }: {cards?: CardType[]}) {

  const [currentFlip, setCurrentFlip] = useState<number[]>([])

  const dispatch = useAppDispatch();
  const fetchGameHistoryState = useAppSelector((state) => state.fetchGameHistory)

  const params = useParams<{matchId: string}>()

  //set the game by getting the game history
  const hasFetchedOnce = useRef(false)
  useEffect(() => {
    if (hasFetchedOnce.current) return

    hasFetchedOnce.current = true;
    dispatch(fetchGameHistoryThunk({ matchingPairId: params.matchId }))
      .unwrap()
      .then((result) => {
        dispatch(fetchGameHistoryActions.setHasInitialized(true))

        result.forEach((history) => {
          if(history.matchedWith === null) {
            setCurrentFlip([history.cardId])
          }
        })
      })
  }, [dispatch, params.matchId])

  //flip the card and set a timeout to send the request to get the game history
  function handleOnFlip(card: CardType) {
    //1. flip the card on click
    setCurrentFlip(prev => {
      if(prev.includes(card.id)) {
        return prev
      }

      return [...currentFlip, card.id]
    })
    //2. dispatch thunk on transition end
  }

  function handleOnTransitionEnd (card: CardType, isFlipped: boolean) {
    //guard on site refresh
    if(isFlipped) {
      dispatch(flipCardThunk({cardId: card.id, matchingPairId: params.matchId}))
    }

    if(currentFlip.length >= 2) {
      setCurrentFlip([])
    }
  }

  const pendingMatchesMap = useMemo(() => {
    const map = new Map<number, GameHistory>()

    fetchGameHistoryState.gameHistory.forEach((history) => {
      if(history.isMatched) {
        map.set(history.cardId, history)
      }
    })

    return map
  }, [fetchGameHistoryState.gameHistory])

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