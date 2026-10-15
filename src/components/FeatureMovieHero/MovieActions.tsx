import { Info } from 'lucide-react'
import { AddToWatchlistButton } from '@/components/MovieDetails/AddToWatchlistButton'
import { Button } from '@/components/ui/button'
import type { FeaturedMovie } from '@/types/trending'
import { Link } from 'react-router-dom'

type MovieActionsProps = {
  movie: FeaturedMovie
}

export const MovieActions = ({ movie }: MovieActionsProps) => {
  return (
    <div className="flex flex-wrap gap-3 pt-1">
      <Link to={`/movies/${movie.id}`}>
        <Button>
          <Info data-icon="inline-start" />
          More info
        </Button>
      </Link>
      <AddToWatchlistButton movieId={movie.id} addLabel="Watchlist" />
    </div>
  )
}
