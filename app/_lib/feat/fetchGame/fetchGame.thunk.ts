import { createAsyncThunk } from '@reduxjs/toolkit'
import { FetchGameParams } from './fetchGame.types';


export const fetchGame = createAsyncThunk<
  string,
  FetchGameParams
>('card/fetchGame', async ({ matchingPairId }, { getState, requestId, rejectWithValue}) => {

  try {
    const response = await fetch(`http://localhost:8000/api/matching-pairs/${matchingPairId}`, {
      method: 'GET',
    })

    if(!response.ok) {
      throw new Error('Failed to start game')
    }

    const data = await response.json();
    console.log("response is ok")
    return data;
  } catch (error) {
    return rejectWithValue('Could not start game');
  } 
})
