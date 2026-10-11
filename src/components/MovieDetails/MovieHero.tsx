import type { MovieDetails } from '@/types/movieDetails'
import { resolveBackdropUrl } from '@/utils/formatMovie'
import { HeroBackdrop } from './HeroBackdrop'
import { MovieHeroOverlays } from './MovieHeroOverlays'
import { MovieMetadata } from './MovieMetadata'
import { AddToWatchlistButton } from './AddToWatchlistButton'
import { TrailerLink } from './TrailerLink'

type MovieHeroProps = {
  movie: MovieDetails
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
  const backdropUrl = resolveBackdropUrl(movie)

  return (
    <section className="relative min-h-[650px] min-h-[80svh] w-full overflow-hidden bg-background">
      <HeroBackdrop backdropUrl={backdropUrl} />
      <MovieHeroOverlays />
      <div className="relative z-10 flex min-h-[650px] min-h-[80svh] flex-col justify-end px-6 pb-10 pt-24 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
          <div className="flex flex-wrap gap-3">
            <TrailerLink movie={movie} />
            <AddToWatchlistButton movieId={movie.id} />
          </div>
          <MovieMetadata movie={movie} />
        </div>
      </div>
    </section>
  )
}
