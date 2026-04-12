import type { Product } from '../types/product'

export const birthdayCandle: Product = {
  id: 'birthday-candle',
  name: 'Birthday Candle',
  priceCents: 200,
  category: 'add-on',
  description: 'A simple candle upsell that lifts order value without friction.',
  stockLevel: 50,
  imageEmoji: '🕯️',
  imageGradient: 'linear-gradient(135deg, #ede9fe, #fce7f3)',
}

export const addOns: Product[] = [
  birthdayCandle,
  {
    id: 'gift-note',
    name: 'Handwritten Gift Note',
    priceCents: 300,
    category: 'add-on',
    description: 'Short note card for birthdays, office orders, or apologies.',
    stockLevel: 25,
    imageEmoji: '💌',
    imageGradient: 'linear-gradient(135deg, #fae8ff, #fbcfe8)',
  },
]
