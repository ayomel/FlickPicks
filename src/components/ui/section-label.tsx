import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionLabelProps = {
  children: ReactNode
  className?: string
}

export const SectionLabel = ({ children, className }: SectionLabelProps) => {
  return (
    <p
      className={cn(
        'm-0 font-mono text-xs font-semibold tracking-[0.08em] text-brand uppercase',
        className,
      )}
    >
      {children}
    </p>
  )
}
