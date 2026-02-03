'use client'

import Deck from "@/app/_components/deck"
import { fetchGame } from "@/app/_lib/feat/fetchGame/fetchGame.thunk"
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks"
import { use, useEffect } from "react"

export default function Page({
  params,
}: {
  params:  Promise<{ matchId: number }>
}) {

  const {matchId} = use(params)

  const fetchGameState = useAppSelector((state) => state.fetchGameSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGame({ matchingPairId: matchId }))
  }, [dispatch, matchId])

  //This needs re-work
  if(!fetchGameState.match) {
    return <p>Loading match...</p>
  }

  return (
    <div>
      <h1>Game ID</h1>
      <p className="text-white">{matchId}</p>
      <Deck cards={fetchGameState.cards}/>
    </div>
  )
}
