import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HERO_INTERVAL_MS } from '@/hooks/useHeroSlideshow'
import { cn } from '@/lib/utils'

type HeroControlsProps = {
  index: number
  count: number
  progress: number
  playing: boolean
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

const padSlide = (value: number) => String(value).padStart(2, '0')

export const HeroControls = ({
  index,
  count,
  progress,
  playing,
  onPrev,
  onNext,
  onGoTo,
}: HeroControlsProps) => {
  const userNavRef = useRef(false)
  const [liveText, setLiveText] = useState('')

  useEffect(() => {
    if (userNavRef.current) {
      setLiveText(`${padSlide(index + 1)} / ${padSlide(count)}`)
      userNavRef.current = false
      return
    }
    // Autoplay advanced the slide; clear so SR does not re-announce.
    setLiveText('')
  }, [index, count])

  if (count <= 1) return null

  const markUserNav = (action: () => void) => {
    userNavRef.current = true
    action()
  }

  const onTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      markUserNav(onNext)
      return
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      markUserNav(onPrev)
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      markUserNav(() => onGoTo(0))
      return
    }
    if (event.key === 'End') {
      event.preventDefault()
      markUserNav(() => onGoTo(count - 1))
    }
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 sm:px-8 sm:pb-8 lg:px-10">
      <div className="flex items-center gap-3 sm:gap-4">
        <p
          className="m-0 shrink-0 font-mono text-xs tracking-[0.08em] text-muted-foreground tabular-nums"
          aria-hidden={liveText ? true : undefined}
        >
          <span className="text-foreground">{padSlide(index + 1)}</span>
          {' / '}
          {padSlide(count)}
        </p>
        <p className="sr-only" aria-live="polite">
          {liveText}
        </p>

        <div
          className="hidden min-w-0 flex-1 items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex"
          role="group"
          aria-label="Featured movies"
          tabIndex={0}
          onKeyDown={onTrackKeyDown}
        >
          {Array.from({ length: count }, (_, segmentIndex) => {
            const isActive = segmentIndex === index
            const isComplete = segmentIndex < index

            return (
              <button
                key={segmentIndex}
                type="button"
                tabIndex={-1}
                aria-label={`Show movie ${segmentIndex + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className="group relative flex h-6 min-w-0 flex-1 items-center"
                onClick={() => markUserNav(() => onGoTo(segmentIndex))}
              >
                <span className="relative h-1 w-full overflow-hidden rounded-full bg-muted-foreground/25 transition-colors group-hover:bg-muted-foreground/40">
                  {isComplete ? (
                    <span className="absolute inset-0 rounded-full bg-brand" />
                  ) : null}
                  {isActive ? (
                    <span
                      key={`${index}-${playing ? 'play' : 'pause'}-${progress.toFixed(3)}`}
                      className={cn(
                        'absolute inset-y-0 left-0 origin-left rounded-full bg-brand',
                        playing && 'w-full',
                      )}
                      style={
                        playing
                          ? {
                              animation: `hero-progress-fill ${HERO_INTERVAL_MS}ms linear forwards`,
                              animationDelay: `-${progress * HERO_INTERVAL_MS}ms`,
                            }
                          : { width: `${progress * 100}%` }
                      }
                    />
                  ) : null}
                </span>
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
            onPress={() => markUserNav(onPrev)}
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="Next movie"
            className="size-11"
            onPress={() => markUserNav(onNext)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
