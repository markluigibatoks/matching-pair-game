import { GameHistory } from "../../types"

export type FetchGameHistoryParams = {
  matchingPairId: string
}

export type FetchGameHistoryState = {
  gameHistory: GameHistory[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  hasInitialized: boolean
}