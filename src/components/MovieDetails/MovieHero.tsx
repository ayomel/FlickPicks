import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { MovieDetails } from '@/types/movieDetails'
import { cn } from '@/lib/utils'
import { HeroBackdrop } from './HeroBackdrop'
import { MovieHeroOverlays } from './MovieHeroOverlays'
import { MovieMetadata } from './MovieMetadata'

type MovieHeroProps = {
  movie: MovieDetails
}

const heroMinHeight = 'min-h-[min(80svh,760px)]'

export const MovieHero = ({ movie }: MovieHeroProps) => {
  const backdropPath = movie.backdrop_path
  const absoluteUrl =
    !backdropPath && movie.backdrop?.startsWith('http') ? movie.backdrop : null

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-background',
        heroMinHeight,
      )}
    >
      <HeroBackdrop backdropPath={backdropPath} absoluteUrl={absoluteUrl} />
      <MovieHeroOverlays />
      {/* Solid bottom edge so the hero meets page background without a seam */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-linear-to-t from-background to-transparent"
        aria-hidden
      />
      <div
        className={cn(
          'relative z-10 flex flex-col justify-between px-6 pb-10 pt-20 sm:px-8 sm:pt-24 lg:px-10',
          heroMinHeight,
        )}
      >
        <div className="mx-auto w-full max-w-6xl">
          <Link
            to="/"
            className={cn(
              'inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-sm font-medium text-foreground/90 backdrop-blur-sm',
              'outline-none transition-colors hover:text-foreground',
              'focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to browse
          </Link>
        </div>
        <div
          className={cn(
            'relative mx-auto w-full max-w-6xl',
            "before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-linear-to-b before:from-transparent before:via-background/85 before:via-25% before:to-background",
            'lg:before:hidden',
          )}
        >
          <div className="relative max-lg:pt-20">
            <MovieMetadata movie={movie} />
          </div>
        </div>
      </div>
    </section>
  )
}
