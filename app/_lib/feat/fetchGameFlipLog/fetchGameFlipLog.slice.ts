import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchGameFlipLogState } from './fetchGameFlipLog.type'
import { fetchGameFlipLog } from './fetchGameFlipLog.thunk'
import { flipCard } from '../flipCard/flipCard.thunk'

const initialState: FetchGameFlipLogState = {
  gameFlipLog: [],
  gameOver: false,
  status: 'idle',
  hasInitialized: false
}

const fetchGameFlipLogSlice = createSlice({
  name: 'Flip Card',
  initialState,
  reducers: {
    setHasInitialized: (state, action: PayloadAction<boolean>) => {
      state.hasInitialized = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchGameFlipLog.pending, (state, action) => {
    })
    .addCase(fetchGameFlipLog.fulfilled, (state, action) => {
      state.gameFlipLog = action.payload.gameFlipLogs
      state.gameOver = action.payload.gameOver
    })
    .addCase(fetchGameFlipLog.rejected, (state, action) => {
    })
    .addCase(flipCard.pending, (state, action) => {
    })
    .addCase(flipCard.fulfilled, (state, action) => {
      state.gameFlipLog = action.payload.gameFlipLogs
      state.gameOver = action.payload.gameOver
    })
    .addCase(flipCard.rejected, (state, action) => {
    })
  }
})

export const fetchGameFlipLogActions = fetchGameFlipLogSlice.actions
export default fetchGameFlipLogSlice.reducer