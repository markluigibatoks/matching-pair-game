import { createAsyncThunk } from '@reduxjs/toolkit'
import { StartGameParams } from './startGame.types';
import { ApiResponse, Match } from '../../types';
import camelcaseKeys from 'camelcase-keys';

export const startGame = createAsyncThunk<
  Match,
  StartGameParams
>('card/startGame', async ({difficulty, name}, { getState, requestId, rejectWithValue}) => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/matching-pairs`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ difficulty, name })
    })

    if(!response.ok) {
      throw new Error('Failed to start game')
    }

    const data = (await response.json()) as ApiResponse<Match>;

    return camelcaseKeys<Match>(data.data, {deep: true})
  } catch (error) {
    return rejectWithValue('Could not start game');
  } 
})
