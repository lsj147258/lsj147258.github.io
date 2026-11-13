import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons'

type Props = {
  eyebrow: string
  title: ReactNode
  description?: string
  link?: { to: string; label: string }
}

export default function SectionHeading({ eyebrow, title, description, link }: Props) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-title mt-3 text-3xl sm:text-[2.35rem]">{title}</h2>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{description}</p>
        )}
      </div>
      {link && (
        <Link to={link.to} className="arrow-link shrink-0">
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
