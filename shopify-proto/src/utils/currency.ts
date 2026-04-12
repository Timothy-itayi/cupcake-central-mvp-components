export const formatCurrency = (priceCents: number) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(priceCents / 100)
