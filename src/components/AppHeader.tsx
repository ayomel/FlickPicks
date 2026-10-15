import { Link } from 'react-router-dom'
import { MovieSearch } from '@/components/Search/MovieSearch'
import { Wordmark } from '@/components/brand/Wordmark'
import { cn } from '@/lib/utils'

export const AppHeader = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'flex h-14 items-center gap-6 border-b border-border/80 bg-background/92 px-6 backdrop-blur-md',
          'sm:h-16 sm:px-8',
        )}
      >
        <Link
          to="/"
          className={cn(
            'inline-flex shrink-0 outline-none',
            'transition-opacity hover:opacity-90',
            'focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
        >
          <Wordmark />
        </Link>
        <div className="ml-auto hidden w-full max-w-lg sm:block">
          <MovieSearch />
        </div>
      </div>
    </header>
  )
}
