import { cn } from '@/lib/utils'

type WordmarkProps = {
  className?: string
}

export const Wordmark = ({ className }: WordmarkProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-heading text-base font-extrabold tracking-[0.04em] text-foreground uppercase',
        className,
      )}
      aria-label="FlickPick"
    >
      <span>Flick</span>
      <span className="mx-0.5 text-brand" aria-hidden>
        ◆
      </span>
      <span>Pick</span>
    </span>
  )
}
