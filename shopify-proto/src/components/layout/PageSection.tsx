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
  <section className="space-y-8 rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-sm sm:p-8">
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
        {eyebrow}
      </p>
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-stone-600 sm:text-base">
          {description}
        </p>
      </div>
    </div>

    {children}
  </section>
)
