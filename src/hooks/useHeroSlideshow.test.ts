import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { HERO_INTERVAL_MS, useHeroSlideshow } from './useHeroSlideshow'

describe('useHeroSlideshow', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('wraps next and prev around the slide count', () => {
    const { result } = renderHook(() => useHeroSlideshow(3))

    act(() => {
      result.current.prev()
    })
    expect(result.current.index).toBe(2)

    act(() => {
      result.current.next()
    })
    expect(result.current.index).toBe(0)
  })

  it('advances when the interval elapses', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useHeroSlideshow(3))

    act(() => {
      vi.advanceTimersByTime(HERO_INTERVAL_MS + 50)
    })

    expect(result.current.index).toBe(1)
  })
})
