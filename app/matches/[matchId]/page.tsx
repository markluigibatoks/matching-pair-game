'use client'

import Deck from "@/app/_components/deck"
import { fetchGame } from "@/app/_lib/feat/fetchGame/fetchGame.thunk"
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks"
import Link from "next/link"
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
    <div className="p-8 w-screen h-screen flex gap-12 flex-col items-center">
      <div className="max-w-xs w-full flex space-between items-center gap-16">
        <div className="w-full flex flex-col">
          <p className="truncate w-24">{fetchGameState.match.name}</p>
          <span>Difficulty: {fetchGameState.match.difficulty}</span>
        </div>

        <Link href="/" className="w-full bg-white rounded px-4 py-2 text-black hover:opacity-90">New Game</Link>
      </div>
      <Deck cards={fetchGameState.cards}/>
    </div>
  )
}
