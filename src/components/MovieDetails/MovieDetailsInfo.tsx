import { PageSection } from '@/components/ui/page-section'
import { SectionLabel } from '@/components/ui/section-label'
import type { MovieDetails } from '@/types/movieDetails'
import {
  formatReleaseDate,
  formatRuntime,
  getPrimaryLanguage,
  getStudioNames,
} from '@/utils/formatMovie'

type DetailItemProps = {
  label: string
  value: string | null
}

const DetailItem = ({ label, value }: DetailItemProps) => {
  if (!value) return null

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-4">
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
  return (
    <PageSection className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-16">
      <SectionLabel className="mb-6">Details</SectionLabel>
      <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <DetailItem
          label="Release date"
          value={formatReleaseDate(movie.release_date)}
        />
        <DetailItem label="Runtime" value={formatRuntime(movie.runtime)} />
        <DetailItem label="Status" value={movie.status || null} />
        <DetailItem label="Language" value={getPrimaryLanguage(movie)} />
        <DetailItem label="Studios" value={getStudioNames(movie)} />
      </dl>
    </PageSection>
  )
}
