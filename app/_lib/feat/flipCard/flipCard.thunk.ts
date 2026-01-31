import { createAsyncThunk } from '@reduxjs/toolkit'
import { FlipCardParams } from './flipCard.types';
import { ApiResponse, GameHistory } from '../../types';
import camelcaseKeys from 'camelcase-keys';

export const flipCard = createAsyncThunk<
  GameHistory[],
  FlipCardParams
>('card/flipCard', async ({ cardId, matchingPairId }, { getState, requestId, rejectWithValue}) => {

  try {
    const response = await fetch('http://localhost:8000/api/game-histories', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ card_id: cardId, matching_pair_id: matchingPairId })
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
