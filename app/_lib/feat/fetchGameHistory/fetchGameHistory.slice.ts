import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchGameHistoryState } from './fetchGameHistory.type'
import { fetchGameHistory } from './fetchGameHistoty.thunk'
import { flipCard } from '../flipCard/flipCard.thunk'

const initialState: FetchGameHistoryState = {
  gameHistory: [],
  status: 'idle',
  hasInitialized: false
}

const fetchGameHistorySlice = createSlice({
  name: 'Flip Card',
  initialState,
  reducers: {
    setHasInitialized: (state, action: PayloadAction<boolean>) => {
      state.hasInitialized = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchGameHistory.pending, (state, action) => {
      console.log('pending')
    })
    .addCase(fetchGameHistory.fulfilled, (state, action) => {
      state.gameHistory = action.payload
      state.status = 'fulfilled'
    })
    .addCase(fetchGameHistory.rejected, (state, action) => {
      console.log('rejected')
    })
    .addCase(flipCard.pending, (state, action) => {
      console.log('pending')
    })
    .addCase(flipCard.fulfilled, (state, action) => {
      state.gameHistory = action.payload
      state.status = 'fulfilled'
    })
    .addCase(flipCard.rejected, (state, action) => {
      console.log('rejected')
    })
  }
})

export const fetchGameHistoryActions = fetchGameHistorySlice.actions
export default fetchGameHistorySlice.reducer