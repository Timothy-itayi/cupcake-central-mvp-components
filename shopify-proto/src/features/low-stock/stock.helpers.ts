export const getStockBadge = (stockLevel: number) => {
  if (stockLevel === 0) {
    return {
      label: 'Sold out today',
      tone: 'sold-out' as const,
    }
  }

  if (stockLevel <= 3) {
    return {
      label: `Only ${stockLevel} left today!`,
      tone: 'urgent' as const,
    }
  }

  return null
}
