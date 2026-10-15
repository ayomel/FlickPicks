import { useTrendingQuery } from '@/hooks/useTrendingQuery'
import { useHeroSlideshow } from '@/hooks/useHeroSlideshow'
import { hasBackdrop } from '@/types/trending'
import { HeroBackground } from './HeroBackground'
import { HeroOverlay } from './HeroOverlay'
import { HeroContent } from './HeroContent'
import { HeroRankTag } from './HeroRankTag'
import { MovieYear } from './MovieYear'
import { MovieTitle } from './MovieTitle'
import { MovieDescription } from './MovieDescription'
import { MovieActions } from './MovieActions'
import { HeroControls } from './HeroControls'

const HeroFrame = ({ children }: { children: string }) => {
  return (
    <section className="flex min-h-svh items-end bg-background px-6 pb-16 pt-16 text-sm text-muted-foreground sm:px-8 lg:px-10">
      <p className="m-0 font-mono text-xs">{children}</p>
    </section>
  )
}

export const FeatureMovieHero = () => {
  const { data, isLoading, isError } = useTrendingQuery()
  const movies = data?.results.filter(hasBackdrop) ?? []
  const {
    index,
    progress,
    playing,
    next,
    prev,
    goTo,
    setPaused,
    reducedMotion,
  } = useHeroSlideshow(movies.length)
  const movie = movies[index]

  if (isLoading) {
    return <HeroFrame>Loading trending movies…</HeroFrame>
  }

  if (isError) {
    return <HeroFrame>Couldn&apos;t load trending movies.</HeroFrame>
  }

  if (!movie) {
    return <HeroFrame>No trending movies right now.</HeroFrame>
  }

  return (
    <section
      className="relative min-h-svh overflow-hidden bg-background text-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const nextFocus = event.relatedTarget
        if (
          !(nextFocus instanceof Node) ||
          !event.currentTarget.contains(nextFocus)
        ) {
          setPaused(false)
        }
      }}
    >
      <HeroBackground
        backdropPath={movie.backdrop_path}
        reducedMotion={reducedMotion}
      />
      <HeroOverlay />
      <HeroContent>
        <HeroRankTag rank={index + 1} />
        <MovieYear releaseDate={movie.release_date} />
        <MovieTitle title={movie.title} />
        <MovieDescription overview={movie.overview} />
        <MovieActions movie={movie} />
      </HeroContent>
      <HeroControls
        index={index}
        count={movies.length}
        progress={progress}
        playing={playing}
        onPrev={prev}
        onNext={next}
        onGoTo={goTo}
      />
    </section>
  )
}

export default FeatureMovieHero
