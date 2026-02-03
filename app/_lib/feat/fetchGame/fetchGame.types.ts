import { Card, Match } from "../../types"

export type FetchGameParams = {
  matchingPairId: number
}

export type GameState = {
  match: Match | null
  cards: Card[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}