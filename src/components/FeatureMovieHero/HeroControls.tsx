import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type HeroControlsProps = {
  index: number
  count: number
  progress: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

const padSlide = (value: number) => String(value).padStart(2, '0')

export const HeroControls = ({
  index,
  count,
  progress,
  onPrev,
  onNext,
  onGoTo,
}: HeroControlsProps) => {
  if (count <= 1) return null

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 sm:px-8 sm:pb-8 lg:px-10">
      <div className="flex items-center gap-3 sm:gap-4">
        <p
          className="m-0 shrink-0 font-mono text-xs tracking-[0.08em] text-muted-foreground tabular-nums"
          aria-live="polite"
        >
          <span className="text-foreground">{padSlide(index + 1)}</span>
          {' / '}
          {padSlide(count)}
        </p>

        <div
          className="flex min-w-0 flex-1 items-center gap-1"
          role="tablist"
          aria-label="Featured movies"
        >
          {Array.from({ length: count }, (_, segmentIndex) => {
            const isActive = segmentIndex === index
            const fill = segmentIndex < index ? 1 : isActive ? progress : 0

            return (
              <button
                key={segmentIndex}
                type="button"
                role="tab"
                aria-label={`Show movie ${segmentIndex + 1}`}
                aria-selected={isActive}
                className="group relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-muted-foreground/25 transition-colors hover:bg-muted-foreground/40"
                onClick={() => onGoTo(segmentIndex)}
              >
                <span
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full bg-brand',
                    isActive
                      ? 'transition-none'
                      : 'transition-[width] duration-200',
                  )}
                  style={{ width: `${fill * 100}%` }}
                />
              </button>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            aria-label="Previous movie"
            className="size-11"
            onPress={onPrev}
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="Next movie"
            className="size-11"
            onPress={onNext}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
