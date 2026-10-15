import {
  BACKDROP_SIZES_HERO,
  getBackdropPath,
  getBackdropSrcSet,
} from '@/utils/getPosterPath'
import { cn } from '@/lib/utils'

type HeroBackgroundProps = {
  backdropPath: string
  reducedMotion: boolean
}

const BACKDROP_WIDTH = 1280
const BACKDROP_HEIGHT = 720

export const HeroBackground = ({
  backdropPath,
  reducedMotion,
}: HeroBackgroundProps) => {
  return (
    <img
      key={backdropPath}
      src={getBackdropPath(backdropPath)}
      srcSet={getBackdropSrcSet(backdropPath)}
      sizes={BACKDROP_SIZES_HERO}
      alt=""
      width={BACKDROP_WIDTH}
      height={BACKDROP_HEIGHT}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      className={cn(
        'absolute inset-0 size-full object-cover',
        !reducedMotion && 'animate-in fade-in duration-700',
      )}
    />
  )
}
