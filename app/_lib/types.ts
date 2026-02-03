export interface ApiResponse<T> {
  data: T
}

export type Match = {
  id: number
  name: string
  gameOver: boolean
  difficulty: number
  createdAt: string
  updatedAt: string
  cards: Card[]
  gameFlipLogs: GameFlipLog[];
}

export type GameFlipLog = {
    cardId: number
    matchingPairId: number
    updatedAt: Date
    createdAt: Date
    id: number
    matchedWith: number | null
    card: Card
}

export type Card = {
  id: number
  position: number
  isMatched: boolean
  matchingPairId: number
  cardTemplateId: number
  createdAt: null
  updatedAt: Date | null
  cardTemplate: CardTemplate
}

export type CardTemplate = {
  id: number
  value: string
  category: string
  createdAt: string
  updatedAt: string
}