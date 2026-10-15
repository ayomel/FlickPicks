import { useState } from 'react'
import {
  BACKDROP_SIZES_HERO,
  getBackdropPath,
  getBackdropSrcSet,
} from '@/utils/getPosterPath'

type HeroBackdropProps = {
  backdropPath?: string | null
  absoluteUrl?: string | null
}

const BACKDROP_WIDTH = 1280
const BACKDROP_HEIGHT = 720

export const HeroBackdrop = ({
  backdropPath,
  absoluteUrl,
}: HeroBackdropProps) => {
  const [imageFailed, setImageFailed] = useState(false)
  const tmdbSrc = backdropPath ? getBackdropPath(backdropPath) : null
  const src = tmdbSrc ?? absoluteUrl
  const showImage = Boolean(src) && !imageFailed

  if (!showImage || !src) {
    return <div className="absolute inset-0 bg-card" aria-hidden />
  }

  return (
    <div className="absolute inset-0">
      <img
        src={src}
        srcSet={backdropPath ? getBackdropSrcSet(backdropPath) : undefined}
        sizes={backdropPath ? BACKDROP_SIZES_HERO : undefined}
        alt=""
        width={BACKDROP_WIDTH}
        height={BACKDROP_HEIGHT}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={() => setImageFailed(true)}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-y-0 left-0 w-[min(100%,calc(42rem+2.5rem))] bg-linear-to-r from-background via-background/90 via-80% to-background/90"
        aria-hidden
      />
    </div>
  )
}
