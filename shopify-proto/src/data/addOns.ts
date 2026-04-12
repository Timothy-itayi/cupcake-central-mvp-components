import type { Product } from '../types/product'

export const giftBoxRibbon: Product = {
  id: 'gift-box-ribbon',
  name: 'Gift Box Ribbon',
  priceCents: 200,
  category: 'add-on',
  description: 'A simple ribbon finish for gift boxes that need to feel ready to hand over.',
  stockLevel: 50,
  imageQuery: 'gift ribbon present',
  imageEmoji: '🎀',
  imageGradient: 'linear-gradient(135deg, #fce7f3, #fae8ff)',
  localImagePath: '/gifts/Gift-Box-Ribbon_1.webp',
}

export const giftNote: Product = {
  id: 'gift-note',
  name: 'Handwritten Gift Note',
  priceCents: 300,
  category: 'add-on',
  description: 'Add a short handwritten message so the order arrives ready to gift.',
  stockLevel: 25,
  imageQuery: 'gift note card stationery',
  imageEmoji: '💌',
  imageGradient: 'linear-gradient(135deg, #fae8ff, #fbcfe8)',
}

export const addOns: Product[] = [
  giftBoxRibbon,
  giftNote,
]
