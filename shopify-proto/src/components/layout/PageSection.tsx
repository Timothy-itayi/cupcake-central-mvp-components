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
  <section className="space-y-8 rounded-[2.25rem] border border-[#f5ddd5] bg-white/92 p-6 shadow-[0_18px_55px_rgba(109,67,53,0.08)] backdrop-blur sm:p-8">
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ec4f9f]">
        {eyebrow}
      </p>
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-[#3f2520] sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-[#6f5c56] sm:text-base">
          {description}
        </p>
      </div>
    </div>

    {children}
  </section>
)
