'use client'

import Deck from "@/app/_components/deck"
import { fetchGame } from "@/app/_lib/feat/fetchGame/fetchGame.thunk"
import { useAppDispatch } from "@/app/_lib/hooks"
import { use, useEffect } from "react"

export default function Page({
  params,
}: {
  params:  Promise<{ matchId: number }>
}) {

  const {matchId} = use(params)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGame({ matchingPairId: matchId }))
  }, [dispatch, matchId])

  return (
    <div>
      <h1>Game ID</h1>
      <p className="text-white">{matchId}</p>

      <Deck />
    </div>
  )
}
