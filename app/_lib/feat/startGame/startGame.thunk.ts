import { createAsyncThunk } from '@reduxjs/toolkit'
import { StartGameParams } from './startGame.types';


export const startGame = createAsyncThunk<
  string,
  StartGameParams
>('card/startGame', async ({difficulty, name}, { getState, requestId, rejectWithValue}) => {

  try {
    const response = await fetch('http://localhost:8000/api/matching-pairs', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ difficulty, name })
    })

    if(!response.ok) {
      throw new Error('Failed to start game')
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue('Could not start game');
  } 
})
