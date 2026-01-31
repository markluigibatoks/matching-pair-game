import { configureStore } from '@reduxjs/toolkit'

//reducer
import startGameSliceReducer from './feat/startGame/startGame.slice'
import fetchGameHistoryReducer from './feat/fetchGameHistory/fetchGameHistory.slice'
import fetchGameReducer from './feat/fetchGame/fetchGame.slice'

export const makeStore = configureStore({
  reducer: {
    startGameSlice: startGameSliceReducer,
    fetchGameHistory: fetchGameHistoryReducer,
    fetchGameSlice: fetchGameReducer,
  },
});

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;