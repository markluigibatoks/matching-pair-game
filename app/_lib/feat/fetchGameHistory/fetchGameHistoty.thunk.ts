import { createAsyncThunk } from '@reduxjs/toolkit'
import { FetchGameHistoryParams } from './fetchGameHistory.type';
import { ApiResponse, GameHistory } from '../../types';
import camelcaseKeys from 'camelcase-keys';

export const fetchGameHistory = createAsyncThunk<
  GameHistory[],
  FetchGameHistoryParams
>('card/fetchGameHistory', async ({ matchingPairId }, { getState, requestId, rejectWithValue}) => {

  try {
    const response = await fetch(`http://localhost:8000/api/game-histories?matching_pair_id=${matchingPairId}`, {
      method: 'GET',
    })

    if(!response.ok) {
      throw new Error('Failed to start game')
    }

    const data = (await response.json()) as ApiResponse<GameHistory[]>;

    return camelcaseKeys<GameHistory[]>(data.data, { deep: true })
    
  } catch (error) {
    return rejectWithValue('Could not start game');
  } 
})
