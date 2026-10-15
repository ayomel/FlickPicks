import type { ReactNode } from 'react'
import { SectionLabel } from '@/components/ui/section-label'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type MediaRowProps = {
  label: string
  title: string
  children: ReactNode
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  footer?: ReactNode
  className?: string
}

const MediaRowSkeleton = () => {
  return (
    <div className="flex gap-3 overflow-hidden py-2">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="w-36 shrink-0 sm:w-40">
          <Skeleton className="aspect-[2/3] w-full rounded-md" />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export const MediaRow = ({
  label,
  title,
  children,
  isLoading = false,
  isError = false,
  errorMessage = "Couldn't load this row.",
  footer,
  className,
}: MediaRowProps) => {
  return (
    <section className={cn('relative z-10 py-8', className)}>
      <div className="px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionLabel className="mb-2">{label}</SectionLabel>
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>

          {isLoading ? (
            <MediaRowSkeleton />
          ) : isError ? (
            <p className="m-0 text-sm text-muted-foreground">{errorMessage}</p>
          ) : (
            <ul
              className={cn(
                'm-0 flex list-none gap-3 overflow-x-auto p-0 py-2',
                'snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]',
              )}
            >
              {children}
            </ul>
          )}

          {footer}
        </div>
      </div>
    </section>
  )
}
