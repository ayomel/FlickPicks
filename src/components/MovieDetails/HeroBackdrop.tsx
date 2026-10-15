import { useState } from 'react'

type HeroBackdropProps = {
  backdropUrl: string | null
}

export const HeroBackdrop = ({ backdropUrl }: HeroBackdropProps) => {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(backdropUrl) && !imageFailed

  if (!showImage || !backdropUrl) {
    return <div className="absolute inset-0 bg-card" aria-hidden />
  }

  return (
    <img
      src={backdropUrl}
      alt=""
      onError={() => setImageFailed(true)}
      className="absolute inset-0 size-full object-cover opacity-90"
    />
  )
}
