import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGame } from "./fetchGame.thunk";
import { Match } from "../../types";
import { GameState } from "./fetchGame.types";

const initialState: GameState = {
  match: null,
  cards: [],
  status: 'idle'
}

const fetchGameSlice = createSlice({
  name: 'Fetch Game',
  initialState,
  reducers: {
    // setName: (state, action: PayloadAction<string>) => {
    //   state.name = action.payload
    // }
    setMatch: (state, action: PayloadAction<Match>) => {
      state.match = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGame.pending, (state, action) => {
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.match = action.payload
        state.cards = action.payload.cards
      })
      .addCase(fetchGame.rejected, (state, action) => {
      })
  },
})

export const fetchGameActions = fetchGameSlice.actions;
export default fetchGameSlice.reducer;