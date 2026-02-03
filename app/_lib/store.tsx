import { configureStore } from '@reduxjs/toolkit'

//reducer
import startGameSliceReducer from './feat/startGame/startGame.slice'
import fetchGameFlipLogReducer from './feat/fetchGameFlipLog/fetchGameFlipLog.slice'
import fetchGameReducer from './feat/fetchGame/fetchGame.slice'

export const makeStore = configureStore({
  reducer: {
    startGameSlice: startGameSliceReducer,
    fetchGameFlipLog: fetchGameFlipLogReducer,
    fetchGameSlice: fetchGameReducer,
  },
});

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;