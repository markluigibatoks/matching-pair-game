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

export type Card = {
  id: number
  position: number
  matchingPairId: number
  cardTemplateId: number
  createdAt: string
  updatedAt: string
  card_template: CardTemplate
}

export type CardTemplate = {
  id: number
  value: string
  category: string
  createdAt: string
  updatedAt: string
}