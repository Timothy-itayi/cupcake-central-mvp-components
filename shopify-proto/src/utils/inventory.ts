export const LOW_STOCK_THRESHOLD = 5

export const isLowStockLevel = (stockLevel: number) =>
  stockLevel > 0 && stockLevel <= LOW_STOCK_THRESHOLD
