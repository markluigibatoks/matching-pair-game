
export type FlipCardParams = {
  cardId: number
  matchingPairId: string
}

export type FlipCardState = {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}