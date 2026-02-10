import { GameFlipLog } from "../../types"

export type FetchGameFlipLogParams = {
  matchingPairId: string
}

export type FetchGameFlipLogState = {
  gameFlipLog: GameFlipLog[]
  gameOver: boolean
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  hasInitialized: boolean
}