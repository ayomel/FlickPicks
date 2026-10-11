import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type SearchDropdownProps = {
  listboxId: string
  isOpen: boolean
  children: ReactNode
}

export const SearchDropdown = ({
  listboxId,
  isOpen,
  children,
}: SearchDropdownProps) => {
  const reducedMotion = usePrefersReducedMotion()

  if (!isOpen) return null

  return (
    <div
      id={listboxId}
      role="listbox"
      className={cn(
        'absolute top-[calc(100%+6px)] z-[60] max-h-80 w-full overflow-y-auto rounded-lg border border-border bg-card',
        !reducedMotion && 'animate-in fade-in duration-150',
      )}
    >
      {children}
    </div>
  )
}

type SearchDropdownMessageProps = {
  children: ReactNode
}

export const SearchDropdownMessage = ({
  children,
}: SearchDropdownMessageProps) => {
  return (
    <p className="m-0 px-3 py-4 text-sm text-muted-foreground">{children}</p>
  )
}
