import type { Product } from '../types/product'

export const birthdayCandle: Product = {
  id: 'gift-box-ribbon',
  name: 'Gift Box Ribbon',
  priceCents: 200,
  category: 'add-on',
  description: 'Simple ribbon add-on to make the gift box feel finished without much effort.',
  stockLevel: 50,
  imageQuery: 'gift ribbon present',
  imageEmoji: '🎀',
  imageGradient: 'linear-gradient(135deg, #fce7f3, #fae8ff)',
  localImagePath: '/gifts/Gift-Box-Ribbon_1.webp',
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
    imageQuery: 'gift note card stationery',
    imageEmoji: '💌',
    imageGradient: 'linear-gradient(135deg, #fae8ff, #fbcfe8)',
  },
]
