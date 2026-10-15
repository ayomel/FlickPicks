import { useEffect, useRef, useState } from 'react'

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
  const [contentHovered, setContentHovered] = useState(false)
  const [controlsHovered, setControlsHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressRawIndex, setProgressRawIndex] = useState(0)
  const animStartedAtRef = useRef<number | null>(null)
  const wasPausedRef = useRef(false)
  const reducedMotion = usePrefersReducedMotion()
  const index = wrapIndex(rawIndex, length)
  const paused = contentHovered || controlsHovered || focused
  const playing = length > 1 && !paused && !reducedMotion

  if (progressRawIndex !== rawIndex) {
    setProgressRawIndex(rawIndex)
    setProgress(0)
  }

  useEffect(() => {
    if (paused && !wasPausedRef.current && animStartedAtRef.current != null) {
      const elapsed = performance.now() - animStartedAtRef.current
      setProgress(Math.min(1, Math.max(0, elapsed / HERO_INTERVAL_MS)))
    }
    wasPausedRef.current = paused
  }, [paused])

  useEffect(() => {
    if (!playing) {
      animStartedAtRef.current = null
      return
    }

    // Resume from the frozen progress instead of restarting the slide.
    const start = performance.now() - progress * HERO_INTERVAL_MS
    animStartedAtRef.current = start
    const remaining = Math.max(0, HERO_INTERVAL_MS * (1 - progress))

    const timer = window.setTimeout(() => {
      setRawIndex((current) => current + 1)
    }, remaining)

    return () => {
      window.clearTimeout(timer)
    }
    // Omit `progress` on purpose: include it and every resume would restart the
    // timeout from a new closure while the CSS animation keeps the frozen offset.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- freeze/resume samples progress once
  }, [playing, rawIndex, length])

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

  return {
    index,
    progress,
    playing,
    next,
    prev,
    goTo,
    setContentHovered,
    setControlsHovered,
    setFocused,
    reducedMotion,
  }
}
