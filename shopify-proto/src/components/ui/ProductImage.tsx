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
      'relative overflow-hidden rounded-[1.25rem]',
      heightClassName,
      isLoading ? 'animate-pulse' : '',
    ].join(' ')}
    style={{ background: imageGradient }}
  >
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={imageAlt || title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    ) : (
      <div className={`flex h-full w-full items-center justify-center ${emojiClassName}`}>
        <span aria-hidden="true">{imageEmoji}</span>
        <span className="sr-only">{title}</span>
      </div>
    )}
  </div>
)
