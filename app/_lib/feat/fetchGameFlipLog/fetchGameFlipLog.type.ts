import { GameFlipLog } from "../../types"

export type FetchGameFlipLogParams = {
  matchingPairId: string
}

export type FetchGameFlipLogState = {
  gameFlipLog: GameFlipLog[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  hasInitialized: boolean
}