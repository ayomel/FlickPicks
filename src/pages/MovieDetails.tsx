import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useMovieDetailsQuery } from '@/hooks/useMovieDetailsQuery'
import { MovieHero } from '@/components/MovieDetails/MovieHero'
import { MovieOverview } from '@/components/MovieDetails/MovieOverview'
import { WatchProviders } from '@/components/MovieDetails/WatchProviders'
import { MovieDetailsInfo } from '@/components/MovieDetails/MovieDetailsInfo'
import { MovieDetailsSkeleton } from '@/components/MovieDetails/MovieDetailsSkeleton'
import { MovieDetailsError } from '@/components/MovieDetails/MovieDetailsError'
import { TrailerPlayer } from '@/components/MovieDetails/TrailerPlayer'
import { AddToWatchlistButton } from '@/components/MovieDetails/AddToWatchlistButton'
import { VideosRow } from '@/components/MovieDetails/VideosRow'
import { MoreTrendingRow } from '@/components/MovieDetails/MoreTrendingRow'
import { Seo } from '@/components/Seo'
import { isNumericMovieId } from '@/utils/isNumericMovieId'

export const MovieDetails = () => {
  const { id } = useParams()
  const idIsValid = isNumericMovieId(id)
  const { data, isLoading, isError, error } = useMovieDetailsQuery(id)

  if (!idIsValid) {
    return <MovieDetailsError notFound />
  }

  if (isLoading) {
    return <MovieDetailsSkeleton />
  }

  const isNotFound =
    isError && axios.isAxiosError(error) && error.response?.status === 404

  if (isNotFound) {
    return <MovieDetailsError notFound />
  }

  if (isError || !data) {
    return <MovieDetailsError />
  }

  const description =
    data.overview?.trim() || `Details for ${data.title} on FlickPick.`

  return (
    <div className="min-h-svh bg-background pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-foreground sm:pb-0">
      <Seo title={`${data.title} · FlickPick`} description={description} />
      <MovieHero movie={data} />

      <div className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="flex min-w-0 flex-col gap-8">
            <MovieOverview overview={data.overview} />
            <div className="flex flex-wrap gap-3">
              <TrailerPlayer movie={data} />
              <AddToWatchlistButton movieId={data.id} />
            </div>
          </div>

          <MovieDetailsInfo movie={data} />
        </div>
      </div>

      <VideosRow movie={data} />
      <WatchProviders providers={data.streaming_providers} />
      <MoreTrendingRow excludeId={data.id} />
    </div>
  )
}

export default MovieDetails
