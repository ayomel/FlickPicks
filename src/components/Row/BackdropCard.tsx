import { useState } from 'react'
import { Film } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { formatReleaseYear } from '@/utils/formatMovie'
import { getBackdropCardPath, getPosterCardPath } from '@/utils/getPosterPath'

export type BackdropCardMovie = {
  id: number
  title: string
  backdrop_path: string | null
  poster_path: string | null
  release_date?: string
}

type BackdropCardProps = {
  movie: BackdropCardMovie
  tabIndex?: number
}

export const BackdropCard = ({ movie, tabIndex }: BackdropCardProps) => {
  const [imageFailed, setImageFailed] = useState(false)
  const year = movie.release_date ? formatReleaseYear(movie.release_date) : null
  const imagePath = movie.backdrop_path ?? movie.poster_path
  const showImage = Boolean(imagePath) && !imageFailed
  const src = movie.backdrop_path
    ? getBackdropCardPath(movie.backdrop_path)
    : movie.poster_path
      ? getPosterCardPath(movie.poster_path)
      : null

  return (
    <Link
      to={`/movies/${movie.id}`}
      tabIndex={tabIndex}
      className={cn(
        'group/card block w-64 shrink-0 snap-start sm:w-80',
        'outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
    >
      <div
        className={cn(
          'aspect-video overflow-hidden rounded-md border border-border bg-card',
          'transition-[border-color] duration-200 group-hover/card:border-brand/35',
        )}
      >
        {showImage && src ? (
          <img
            src={src}
            alt=""
            onError={() => setImageFailed(true)}
            className={cn(
              'size-full object-cover transition-transform duration-200',
              '[@media(hover:hover)]:group-hover/card:scale-105',
            )}
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
