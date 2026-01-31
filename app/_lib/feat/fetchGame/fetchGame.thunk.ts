import { createAsyncThunk } from '@reduxjs/toolkit'
import { FetchGameParams } from './fetchGame.types';
import { ApiResponse, Match } from '../../types';
import camelcaseKeys from 'camelcase-keys';


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

    return camelcaseKeys<Match>(data.data, { deep: true });
  } catch (error) {
    return rejectWithValue('Could not start game');
  } 
})
