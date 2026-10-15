import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { MovieDetails } from '@/types/movieDetails'
import { resolveBackdropUrl } from '@/utils/formatMovie'
import { cn } from '@/lib/utils'
import { HeroBackdrop } from './HeroBackdrop'
import { MovieHeroOverlays } from './MovieHeroOverlays'
import { MovieMetadata } from './MovieMetadata'

type MovieHeroProps = {
  movie: MovieDetails
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
  const backdropUrl = resolveBackdropUrl(movie)

  return (
    <section className="relative min-h-[420px] min-h-[55svh] w-full overflow-hidden bg-background sm:min-h-[520px] sm:min-h-[65svh]">
      <HeroBackdrop backdropUrl={backdropUrl} />
      <MovieHeroOverlays />
      <div className="relative z-10 flex min-h-[420px] min-h-[55svh] flex-col justify-between px-6 pb-10 pt-20 sm:min-h-[520px] sm:min-h-[65svh] sm:px-8 sm:pt-24 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            to="/"
            className={cn(
              'inline-flex items-center gap-2 rounded-md text-sm font-medium text-foreground/90',
              'outline-none transition-colors hover:text-foreground',
              'focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to browse
          </Link>
        </div>
        <div className="mx-auto w-full max-w-6xl">
          <MovieMetadata movie={movie} />
        </div>
      </div>
    </section>
  )
}
