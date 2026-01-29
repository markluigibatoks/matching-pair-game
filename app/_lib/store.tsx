import { configureStore } from '@reduxjs/toolkit'

//reducer
import startGameSliceReducer from './feat/startGame/startGame.slice'
import flipCardSliceReducer from './feat/flipCard/flipCard.slice'
import fetchGameReducer from './feat/fetchGame/fetchGame.slice'

export const makeStore = configureStore({
  reducer: {
    startGameSlice: startGameSliceReducer,
    flipCardSlice: flipCardSliceReducer,
    fetchGameSlice: fetchGameReducer,
  },
});

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;