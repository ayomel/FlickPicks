import { useState } from 'react'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MovieDetails } from '@/types/movieDetails'
import { resolveTrailerVideoId } from '@/utils/formatMovie'
import { VideoModal } from './VideoModal'

type TrailerPlayerProps = {
  movie: MovieDetails
}

export const TrailerPlayer = ({ movie }: TrailerPlayerProps) => {
  const videoId = resolveTrailerVideoId(movie)
  const [open, setOpen] = useState(false)

  if (!videoId) return null

  return (
    <>
      <Button variant="default" className="w-fit" onPress={() => setOpen(true)}>
        <Play data-icon="inline-start" className="fill-current" />
        Play trailer
      </Button>
      <VideoModal
        videoId={videoId}
        title={`${movie.title} trailer`}
        isOpen={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
