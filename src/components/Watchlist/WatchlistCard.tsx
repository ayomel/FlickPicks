import { Film } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { MovieDetails } from '@/types/movieDetails'
import { formatReleaseYear } from '@/utils/formatMovie'
import { getPosterCardPath } from '@/utils/getPosterPath'

type WatchlistCardProps = {
  movie: MovieDetails
}

export const WatchlistCard = ({ movie }: WatchlistCardProps) => {
  const year = formatReleaseYear(movie.release_date)

  return (
    <Link
      to={`/movies/${movie.id}`}
      className={cn(
        'group/card block w-36 shrink-0 snap-start sm:w-40',
        'outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
    >
      <div
        className={cn(
          'aspect-[2/3] overflow-hidden rounded-md border border-border bg-card',
          'transition-[border-color,transform] duration-200 group-hover/card:border-brand/35 group-hover/card:-translate-y-0.5',
        )}
      >
        {movie.poster_path ? (
          <img
            src={getPosterCardPath(movie.poster_path)}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted">
            <Film className="size-8 text-muted-foreground" aria-hidden />
          </div>
        )}
      </div>
      <p className="m-0 mt-2 truncate text-sm font-medium text-foreground">
        {movie.title}
      </p>
      {year ? (
        <p className="m-0 font-mono text-xs text-muted-foreground">{year}</p>
      ) : null}
    </Link>
  )
}
