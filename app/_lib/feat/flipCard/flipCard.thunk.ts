import { createAsyncThunk } from '@reduxjs/toolkit'
import { FlipCardParams } from './flipCard.types';
import { ApiResponse, Match } from '../../types';
import camelcaseKeys from 'camelcase-keys';

export const flipCard = createAsyncThunk<
  Match,
  FlipCardParams
>('card/flipCard', async ({ cardId, matchingPairId }, { getState, requestId, rejectWithValue}) => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game-flip-logs`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ card_id: cardId, matching_pair_id: matchingPairId })
    })

    if(!response.ok) {
      throw new Error('Failed to start game')
    }

    const data = (await response.json()) as ApiResponse<Match>;
    
    return camelcaseKeys<Match>(data.data, { deep: true })
    
  } catch (error) {
    return rejectWithValue('Could not start game');
  } 
})
