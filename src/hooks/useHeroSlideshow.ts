import { useEffect, useState } from 'react'

export const HERO_INTERVAL_MS = 6000

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
  const [progress, setProgress] = useState(0)
  const [progressRawIndex, setProgressRawIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const index = wrapIndex(rawIndex, length)

  if (progressRawIndex !== rawIndex) {
    setProgressRawIndex(rawIndex)
    setProgress(0)
  }

  useEffect(() => {
    if (length <= 1 || paused || reducedMotion) {
      return
    }

    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const nextProgress = Math.min(1, (now - start) / HERO_INTERVAL_MS)
      setProgress(nextProgress)

      if (nextProgress >= 1) {
        setRawIndex((current) => current + 1)
        return
      }

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [length, paused, reducedMotion, rawIndex])

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

  return { index, progress, next, prev, goTo, setPaused, reducedMotion }
}
