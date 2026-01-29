import { createAsyncThunk } from '@reduxjs/toolkit'
import { FetchGameParams } from './fetchGame.types';
import { ApiResponse, Match } from '../../types';


export const fetchGame = createAsyncThunk<
  Match,
  FetchGameParams
>('card/fetchGame', async ({ matchingPairId }, { getState, requestId, rejectWithValue}) => {

  try {
    const response = await fetch(`http://localhost:8000/api/matching-pairs/${matchingPairId}`, {
      method: 'GET',
    })

    if(!response.ok) {
      throw new Error('Failed to start game')
    }

    const data = (await response.json()) as ApiResponse<Match>

    return data.data;
  } catch (error) {
    return rejectWithValue('Could not start game');
  } 
})
