import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startGame } from "./startGame.thunk";

const initialState = {
  difficulty: 1,
  name: ""
}

const startGameSlice = createSlice({
  name: 'Start Game',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setDifficulty: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload
    },
    resetForm: (state, _) => {
      state.name = ''
      state.difficulty = 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGame.pending, (state, action) => {
        console.log('pending')
      })
      .addCase(startGame.fulfilled, (state, action) => {
        console.log('fulfilled')
      })
      .addCase(startGame.rejected, (state, action) => {
        console.log('rejected')
      })
  },
})

export const startGameActions = startGameSlice.actions;
export default startGameSlice.reducer;