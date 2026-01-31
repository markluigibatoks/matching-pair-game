export interface ApiResponse<T> {
  data: T
}

export type Match = {
  id: number
  name: string
  gameOver: number
  difficulty: number
  createdAt: string
  updatedAt: string
  cards: Card[]
}

export type GameHistory = {
    cardId: number
    matchingPairId: number
    updatedAt: Date
    createdAt: Date
    id: number
    isMatched: boolean
    matchedWith: number | null
    card: Card
}

export type Card = {
  id: number
  position: number
  matchingPairId: number
  cardTemplateId: number
  createdAt: string
  updatedAt: string
  cardTemplate: CardTemplate
}

export type CardTemplate = {
  id: number
  value: string
  category: string
  createdAt: string
  updatedAt: string
}