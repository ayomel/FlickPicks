import { useState } from 'react'
import { Film } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SectionLabel } from '@/components/ui/section-label'
import type { MovieDetails } from '@/types/movieDetails'
import {
  formatBudget,
  getCountryNames,
  getStudioNames,
  resolvePosterUrl,
} from '@/utils/formatMovie'

type DetailItemProps = {
  label: string
  value: string | null
}

const DetailItem = ({ label, value }: DetailItemProps) => {
  if (!value) return null

  return (
    <div className="flex flex-col gap-1">
      <dt className="font-mono text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="m-0 text-sm text-foreground">{value}</dd>
    </div>
  )
}

type MovieDetailsInfoProps = {
  movie: MovieDetails
}

export const MovieDetailsInfo = ({ movie }: MovieDetailsInfoProps) => {
  const [posterFailed, setPosterFailed] = useState(false)
  const posterUrl = resolvePosterUrl(movie)
  const showPoster = Boolean(posterUrl) && !posterFailed
  const countries = getCountryNames(movie)
  const studios = getStudioNames(movie)
  const budget = formatBudget(movie.budget)
  const hasGenres = movie.genres.length > 0

  return (
    <aside className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-md border border-border bg-card">
        {showPoster && posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            width={342}
            height={513}
            loading="lazy"
            decoding="async"
            onError={() => setPosterFailed(true)}
            className="aspect-[2/3] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center bg-muted">
            <Film className="size-10 text-muted-foreground" aria-hidden />
          </div>
        )}
      </div>

      {hasGenres ? (
        <div>
          <SectionLabel className="mb-3">Genres</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="secondary"
                className="border border-border"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

      <dl className="m-0 flex flex-col gap-4">
        <DetailItem label="Countries" value={countries} />
        <DetailItem label="Studios" value={studios} />
        <DetailItem label="Budget" value={budget} />
      </dl>
    </aside>
  )
}
