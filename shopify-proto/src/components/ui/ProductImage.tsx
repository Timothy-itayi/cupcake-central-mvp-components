type ProductImageProps = {
  title: string
  imageUrl?: string
  imageAlt?: string
  imageEmoji: string
  imageGradient: string
  heightClassName?: string
  emojiClassName?: string
  isLoading?: boolean
}

export const ProductImage = ({
  title,
  imageUrl,
  imageAlt,
  imageEmoji,
  imageGradient,
  heightClassName = 'min-h-28',
  emojiClassName = 'text-5xl',
  isLoading = false,
}: ProductImageProps) => (
  <div
    className={[
      'product-image-frame',
      heightClassName,
      isLoading ? 'animate-pulse' : '',
    ].join(' ')}
    style={{ background: imageGradient }}
  >
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={imageAlt || title}
        className="product-image-media"
        loading="lazy"
      />
    ) : (
      <div className={`product-image-media flex items-center justify-center ${emojiClassName}`}>
        <span aria-hidden="true">{imageEmoji}</span>
        <span className="sr-only">{title}</span>
      </div>
    )}
  </div>
)
