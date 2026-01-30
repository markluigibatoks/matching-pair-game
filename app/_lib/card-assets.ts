export const CARD_ASSETS = {
  none:          { emoji: '',   category: 'none'},
  // Fruits
  apple_red:     { emoji: '🍎', category: 'fruit' },
  apple_green:   { emoji: '🍏', category: 'fruit' },
  banana:        { emoji: '🍌', category: 'fruit' },
  orange:        { emoji: '🍊', category: 'fruit' },
  lemon:         { emoji: '🍋', category: 'fruit' },
  lime:          { emoji: '🍋‍🟩', category: 'fruit' },
  watermelon:    { emoji: '🍉', category: 'fruit' },
  grapes:        { emoji: '🍇', category: 'fruit' },
  strawberry:    { emoji: '🍓', category: 'fruit' },
  cherry:        { emoji: '🍒', category: 'fruit' },
  pineapple:     { emoji: '🍍', category: 'fruit' },
  pear:          { emoji: '🍐', category: 'fruit' },
  peach:         { emoji: '🍑', category: 'fruit' },
  melon:         { emoji: '🍈', category: 'fruit' },
  kiwi:          { emoji: '🥝', category: 'fruit' },
  mango:         { emoji: '🥭', category: 'fruit' },
  blueberry:     { emoji: '🫐', category: 'fruit' },
  coconut:       { emoji: '🥥', category: 'fruit' },

  // Vegetables
  tomato:        { emoji: '🍅', category: 'vegetable' },
  eggplant:      { emoji: '🍆', category: 'vegetable' },
  avocado:       { emoji: '🥑', category: 'vegetable' },
  chili_pepper:  { emoji: '🌶️', category: 'vegetable' },
  bell_pepper:   { emoji: '🫑', category: 'vegetable' },
} as const

export type CardKey = keyof typeof CARD_ASSETS;
