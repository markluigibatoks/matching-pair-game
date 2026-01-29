import { Match } from "../../types"

export type FetchGameParams = {
  matchingPairId: number
}

export type GameState = {
  match: Match | null
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}