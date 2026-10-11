import { Film } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SearchMovieResult } from '@/types/search'
import { getPosterThumbPath } from '@/utils/getPosterPath'
import { formatGenreLabels } from '@/utils/tmdbGenres'
import { formatReleaseYear } from '@/utils/formatMovie'

type SearchResultRowProps = {
  movie: SearchMovieResult
  optionId: string
  isActive: boolean
  onSelect: (id: number) => void
  onHover: () => void
}

export const SearchResultRow = ({
  movie,
  optionId,
  isActive,
  onSelect,
  onHover,
}: SearchResultRowProps) => {
  const year = formatReleaseYear(movie.release_date)
  const genres = formatGenreLabels(movie.genre_ids)
  const meta = [year, genres].filter(Boolean).join(' · ')

  return (
    <button
      type="button"
      id={optionId}
      role="option"
      aria-selected={isActive}
      onMouseEnter={onHover}
      onClick={() => onSelect(movie.id)}
      className={cn(
        'flex w-full items-center gap-3 border-b border-border/60 px-3 py-2.5 text-left transition-colors last:border-b-0',
        isActive ? 'bg-muted' : 'hover:bg-muted/70',
      )}
    >
      <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
        {movie.poster_path ? (
          <img
            src={getPosterThumbPath(movie.poster_path)}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <Film className="size-5 text-muted-foreground" aria-hidden />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-sm font-medium text-foreground">
          {movie.title}
        </p>
        {meta ? (
          <p className="m-0 truncate font-mono text-xs text-muted-foreground">
            {meta}
          </p>
        ) : null}
      </div>
    </button>
  )
}
