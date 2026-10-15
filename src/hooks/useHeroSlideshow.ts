import { useEffect, useState } from 'react'

const INTERVAL_MS = 6000

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced
}

const wrapIndex = (value: number, length: number) =>
  length === 0 ? 0 : ((value % length) + length) % length

export const useHeroSlideshow = (length: number) => {
  const [rawIndex, setRawIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const index = wrapIndex(rawIndex, length)

  useEffect(() => {
    if (length <= 1 || paused || reducedMotion) return

    const timer = window.setInterval(() => {
      setRawIndex((current) => current + 1)
    }, INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [length, paused, reducedMotion])

  const goTo = (nextIndex: number) => {
    if (length === 0) return
    setRawIndex(nextIndex)
  }

  const next = () => {
    if (length === 0) return
    setRawIndex((current) => current + 1)
  }

  const prev = () => {
    if (length === 0) return
    setRawIndex((current) => current - 1)
  }

  return { index, next, prev, goTo, setPaused, reducedMotion }
}
