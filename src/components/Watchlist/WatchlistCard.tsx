import { PosterCard, type PosterCardMovie } from '@/components/Row/PosterCard'

type WatchlistCardProps = {
  movie: PosterCardMovie
}

export const WatchlistCard = ({ movie }: WatchlistCardProps) => {
  return <PosterCard movie={movie} />
}
