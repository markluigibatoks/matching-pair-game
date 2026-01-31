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
    })
    .addCase(fetchGameHistory.fulfilled, (state, action) => {
      state.gameHistory = action.payload
    })
    .addCase(fetchGameHistory.rejected, (state, action) => {
    })
    .addCase(flipCard.pending, (state, action) => {
    })
    .addCase(flipCard.fulfilled, (state, action) => {
      state.gameHistory = action.payload
    })
    .addCase(flipCard.rejected, (state, action) => {
    })
  }
})

export const fetchGameHistoryActions = fetchGameHistorySlice.actions
export default fetchGameHistorySlice.reducer