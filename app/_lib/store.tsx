import { configureStore } from '@reduxjs/toolkit'

//reducer
import startGameSliceReducer from './feat/startGame/startGame.slice'

export const makeStore = configureStore({
  reducer: {
    startGameSlice: startGameSliceReducer
  },
});

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;