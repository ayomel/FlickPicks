import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/ui/section-label'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type MediaRowProps = {
  label: string
  title: string
  children: ReactNode
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
  emptyMessage?: string
  errorMessage?: string
  footer?: ReactNode
  className?: string
  variant?: 'poster' | 'backdrop'
  showHeading?: boolean
}

type FocusableCardProps = {
  tabIndex?: number
  onFocus?: () => void
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

const injectCardProps = (
  child: ReactNode,
  props: FocusableCardProps,
): ReactNode => {
  if (!isValidElement(child)) return child

  const element = child as ReactElement<{ children?: ReactNode }>
  if (element.type === 'li' && isValidElement(element.props.children)) {
    const card = element.props.children as ReactElement<FocusableCardProps>
    return cloneElement(element, undefined, cloneElement(card, props))
  }

  return cloneElement(element as ReactElement<FocusableCardProps>, props)
}

export const MediaRow = ({
  label,
  title,
  children,
  isLoading = false,
  isError = false,
  isEmpty = false,
  emptyMessage = 'Nothing here yet.',
  errorMessage = "Couldn't load this row.",
  footer,
  className,
  variant = 'poster',
  showHeading = true,
}: MediaRowProps) => {
  const listRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const items = Children.toArray(children)
  const itemCount = items.length
  const skipId = `after-${label}-${title}`.toLowerCase().replace(/\s+/g, '-')

  const scrollByCards = (direction: 1 | -1) => {
    const list = listRef.current
    if (!list) return
    const delta = Math.max(200, Math.floor(list.clientWidth * 0.8))
    list.scrollBy({ left: direction * delta, behavior: 'smooth' })
  }

  const focusItem = (index: number) => {
    if (itemCount === 0) return
    const nextIndex = Math.min(itemCount - 1, Math.max(0, index))
    setActiveIndex(nextIndex)
    const target =
      listRef.current?.querySelectorAll<HTMLElement>('a, button')[nextIndex]
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

              <div className="relative">
                <Button
                  size="icon"
                  variant="secondary"
                  excludeFromTabOrder
                  aria-label={`Scroll ${title} left`}
                  className="absolute top-1/2 left-0 z-10 hidden size-10 -translate-y-1/2 sm:inline-flex"
                  onPress={() => scrollByCards(-1)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  excludeFromTabOrder
                  aria-label={`Scroll ${title} right`}
                  className="absolute top-1/2 right-0 z-10 hidden size-10 -translate-y-1/2 sm:inline-flex"
                  onPress={() => scrollByCards(1)}
                >
                  <ChevronRight />
                </Button>

                <ul
                  ref={listRef}
                  aria-label={title}
                  className={cn(
                    'm-0 flex list-none gap-3 overflow-x-auto p-0 py-2',
                    'snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]',
                    'sm:px-12',
                  )}
                  onKeyDown={onListKeyDown}
                >
                  {items.map((child, index) =>
                    injectCardProps(child, {
                      tabIndex: index === activeIndex ? 0 : -1,
                      onFocus: () => setActiveIndex(index),
                    }),
                  )}
                </ul>
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
