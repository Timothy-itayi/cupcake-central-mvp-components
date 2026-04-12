import type { ReactNode } from 'react'

type PageSectionProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

export const PageSection = ({
  eyebrow,
  title,
  description,
  children,
}: PageSectionProps) => (
  <section className="section-shell space-y-8">
    <div className="space-y-3">
      <p className="section-eyebrow">{eyebrow}</p>
      <div className="space-y-2">
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
      </div>
    </div>

    {children}
  </section>
)
