import {
  useEffect,
  useRef,
  useState,
  type FocusEventHandler,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/ui/section-label'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export type MediaRowItemOptions = {
  tabIndex: number
  onFocus: FocusEventHandler<HTMLElement>
  eager: boolean
}

type MediaRowProps<T> = {
  label: string
  title: string
  items: T[]
  getKey: (item: T) => string | number
  renderItem: (item: T, options: MediaRowItemOptions) => ReactNode
  isLoading?: boolean
  isError?: boolean
  emptyMessage?: string
  errorMessage?: string
  footer?: ReactNode
  className?: string
  variant?: 'poster' | 'backdrop'
  showHeading?: boolean
  /** First N cards load eagerly for LCP on above-the-fold rows. */
  eagerCount?: number
}

const MediaRowSkeleton = ({ variant }: { variant: 'poster' | 'backdrop' }) => {
  const cardClass =
    variant === 'backdrop' ? 'w-64 shrink-0 sm:w-80' : 'w-36 shrink-0 sm:w-40'
  const aspectClass = variant === 'backdrop' ? 'aspect-video' : 'aspect-[2/3]'

  return (
    <div className="flex gap-3 overflow-hidden py-2">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className={cardClass}>
          <Skeleton className={cn(aspectClass, 'w-full rounded-md')} />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}

type ArrowSlotProps = {
  show: boolean
  enabled: boolean
  label: string
  onPress: () => void
  children: ReactNode
}

const ArrowSlot = ({
  show,
  enabled,
  label,
  onPress,
  children,
}: ArrowSlotProps) => {
  if (!show) return null
  if (!enabled) {
    return <div className="hidden size-10 shrink-0 sm:block" aria-hidden />
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      excludeFromTabOrder
      aria-label={label}
      className="hidden size-10 shrink-0 sm:inline-flex"
      onPress={onPress}
    >
      {children}
    </Button>
  )
}

export function MediaRow<T>({
  label,
  title,
  items,
  getKey,
  renderItem,
  isLoading = false,
  isError = false,
  emptyMessage = 'Nothing here yet.',
  errorMessage = "Couldn't load this row.",
  footer,
  className,
  variant = 'poster',
  showHeading = true,
  eagerCount = 0,
}: MediaRowProps<T>) {
  const listRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const itemCount = items.length
  const isEmpty = !isLoading && !isError && itemCount === 0
  const skipId = `after-${label}-${title}`.toLowerCase().replace(/\s+/g, '-')
  const hasOverflow = canScrollLeft || canScrollRight

  const updateScrollState = () => {
    const list = listRef.current
    if (!list) return
    const maxScroll = list.scrollWidth - list.clientWidth
    const nextLeft = list.scrollLeft > 1
    const nextRight = maxScroll > 1 && list.scrollLeft < maxScroll - 1
    setCanScrollLeft((prev) => (prev === nextLeft ? prev : nextLeft))
    setCanScrollRight((prev) => (prev === nextRight ? prev : nextRight))
  }

  useEffect(() => {
    if (isLoading || isError || isEmpty) return
    const list = listRef.current
    if (!list) return

    updateScrollState()
    list.addEventListener('scroll', updateScrollState, { passive: true })
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(list)

    return () => {
      list.removeEventListener('scroll', updateScrollState)
      observer.disconnect()
    }
  }, [isLoading, isError, isEmpty, itemCount])

  const scrollByCards = (direction: 1 | -1) => {
    const list = listRef.current
    if (!list) return
    const delta = Math.max(200, Math.floor(list.clientWidth * 0.8))
    list.scrollBy({ left: direction * delta, behavior: 'smooth' })
  }

  const focusItem = (index: number) => {
    if (itemCount === 0) return
    const nextIndex = Math.min(itemCount - 1, Math.max(0, index))
    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex))
    const item = listRef.current?.querySelector(
      `[data-row-index="${nextIndex}"]`,
    )
    const target =
      item instanceof HTMLElement
        ? (item.querySelector<HTMLElement>('a[href], button, [tabindex]') ??
          item)
        : null
    target?.focus()
    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusItem(activeIndex + 1)
      return
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusItem(activeIndex - 1)
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      focusItem(0)
      return
    }
    if (event.key === 'End') {
      event.preventDefault()
      focusItem(itemCount - 1)
    }
  }

  return (
    <section className={cn('relative z-10 py-8', className)}>
      <div className="px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          {showHeading ? (
            <>
              <SectionLabel className="mb-2">{label}</SectionLabel>
              <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            </>
          ) : null}

          {isLoading ? (
            <MediaRowSkeleton variant={variant} />
          ) : isError ? (
            <p className="m-0 text-sm text-muted-foreground">{errorMessage}</p>
          ) : isEmpty ? (
            <p className="m-0 text-sm text-muted-foreground">{emptyMessage}</p>
          ) : (
            <>
              <a
                href={`#${skipId}`}
                className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-foreground/70"
              >
                Skip {title}
              </a>

              <div className="flex items-center gap-2">
                <ArrowSlot
                  show={hasOverflow}
                  enabled={canScrollLeft}
                  label={`Scroll ${title} left`}
                  onPress={() => scrollByCards(-1)}
                >
                  <ChevronLeft />
                </ArrowSlot>

                <ul
                  ref={listRef}
                  aria-label={title}
                  className={cn(
                    'm-0 flex min-w-0 flex-1 list-none gap-3 overflow-x-auto py-3',
                    'snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]',
                    'px-1 scroll-px-1 sm:scroll-px-12',
                  )}
                  onKeyDown={onListKeyDown}
                >
                  {items.map((item, index) => (
                    <li
                      key={getKey(item)}
                      data-row-index={index}
                      className="contents"
                    >
                      {renderItem(item, {
                        tabIndex: index === activeIndex ? 0 : -1,
                        onFocus: () =>
                          setActiveIndex((prev) =>
                            prev === index ? prev : index,
                          ),
                        eager: index < eagerCount,
                      })}
                    </li>
                  ))}
                </ul>

                <ArrowSlot
                  show={hasOverflow}
                  enabled={canScrollRight}
                  label={`Scroll ${title} right`}
                  onPress={() => scrollByCards(1)}
                >
                  <ChevronRight />
                </ArrowSlot>
              </div>

              <div id={skipId} />
            </>
          )}

          {footer}
        </div>
      </div>
    </section>
  )
}
