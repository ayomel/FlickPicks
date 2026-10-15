import { describe, expect, it } from 'vitest'
import {
  formatBudget,
  getCountryNames,
  getYoutubeEmbedUrl,
  getYoutubeThumbUrl,
} from './formatMovie'
import type { MovieDetails } from '@/types/movieDetails'

const baseMovie = {
  production_countries: [
    { iso_3166_1: 'US', name: 'United States of America' },
    { iso_3166_1: 'GB', name: 'United Kingdom' },
  ],
} as MovieDetails

describe('formatBudget', () => {
  it('formats millions without trailing decimals', () => {
    expect(formatBudget(82_000_000)).toBe('$82M')
  })

  it('hides zero and negative budgets', () => {
    expect(formatBudget(0)).toBeNull()
    expect(formatBudget(-1)).toBeNull()
  })

  it('keeps one decimal for fractional millions', () => {
    expect(formatBudget(12_500_000)).toBe('$12.5M')
  })
})

describe('getCountryNames', () => {
  it('joins production country names', () => {
    expect(getCountryNames(baseMovie)).toBe(
      'United States of America, United Kingdom',
    )
  })
})

describe('youtube helpers', () => {
  it('builds nocookie embed and thumbnail urls', () => {
    expect(getYoutubeEmbedUrl('abc')).toBe(
      'https://www.youtube-nocookie.com/embed/abc?autoplay=1&rel=0',
    )
    expect(getYoutubeThumbUrl('abc')).toBe(
      'https://i.ytimg.com/vi/abc/hqdefault.jpg',
    )
  })
})
