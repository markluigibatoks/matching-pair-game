import { GameHistory } from "../../types"

export type FlipCardParams = {
  cardId: number
  matchingPairId: string
}

export type FlipCardState = {
  gameHistory: GameHistory[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}