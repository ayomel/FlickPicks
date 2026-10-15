import { Play } from 'lucide-react'
import { LinkButton } from '@/components/ui/button'
import type { MovieDetails } from '@/types/movieDetails'
import { resolveTrailerUrl } from '@/utils/formatMovie'

type TrailerLinkProps = {
  movie: MovieDetails
}

export const TrailerLink = ({ movie }: TrailerLinkProps) => {
  const trailerUrl = resolveTrailerUrl(movie)
  if (!trailerUrl) return null

  return (
    <LinkButton
      href={trailerUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="default"
      className="w-fit"
    >
      <Play data-icon="inline-start" className="fill-current" />
      Play trailer
    </LinkButton>
  )
}
