import { describe, expect, it } from 'vitest'
import {
  formatBudget,
  getCountryNames,
  getYoutubeEmbedUrl,
  getYoutubeThumbUrl,
  getYoutubeVideos,
} from './formatMovie'
import type { MovieDetails, MovieVideo } from '@/types/movieDetails'

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

  it('keeps every YouTube video and sorts official trailers, teasers, then the rest', () => {
    const video = (
      partial: Partial<MovieVideo> & Pick<MovieVideo, 'id' | 'key' | 'name'>,
    ): MovieVideo => ({
      iso_639_1: 'en',
      iso_3166_1: 'US',
      site: 'YouTube',
      size: 1080,
      type: 'Clip',
      official: false,
      published_at: '2020-01-01',
      ...partial,
    })

    const movie = {
      videos: {
        results: [
          video({
            id: 'clip-new',
            key: 'clip-new',
            name: 'Featurette',
            type: 'Featurette',
            published_at: '2024-06-01',
          }),
          video({
            id: 'teaser-old',
            key: 'teaser-old',
            name: 'Teaser A',
            type: 'Teaser',
            published_at: '2023-01-01',
          }),
          video({
            id: 'trailer-new',
            key: 'trailer-new',
            name: 'Official Trailer B',
            type: 'Trailer',
            official: true,
            published_at: '2024-02-01',
          }),
          video({
            id: 'trailer-old',
            key: 'trailer-old',
            name: 'Official Trailer A',
            type: 'Trailer',
            official: true,
            published_at: '2023-02-01',
          }),
          video({
            id: 'teaser-new',
            key: 'teaser-new',
            name: 'Teaser B',
            type: 'Teaser',
            published_at: '2024-01-01',
          }),
          video({
            id: 'unofficial-trailer',
            key: 'unofficial-trailer',
            name: 'Fan Trailer',
            type: 'Trailer',
            official: false,
            published_at: '2025-01-01',
          }),
          {
            ...video({
              id: 'vimeo',
              key: 'vimeo',
              name: 'Vimeo Clip',
            }),
            site: 'Vimeo',
          },
        ],
      },
    } as MovieDetails

    expect(getYoutubeVideos(movie).map((item) => item.id)).toEqual([
      'trailer-new',
      'trailer-old',
      'teaser-new',
      'teaser-old',
      'unofficial-trailer',
      'clip-new',
    ])
  })

  it('sorts safely when published_at is missing', () => {
    const movie = {
      videos: {
        results: [
          {
            id: 'a',
            key: 'a',
            name: 'A',
            site: 'YouTube',
            type: 'Clip',
            official: false,
            iso_639_1: 'en',
            iso_3166_1: 'US',
            size: 720,
            published_at: undefined as unknown as string,
          },
          {
            id: 'b',
            key: 'b',
            name: 'B',
            site: 'YouTube',
            type: 'Clip',
            official: false,
            iso_639_1: 'en',
            iso_3166_1: 'US',
            size: 720,
            published_at: '2024-01-01',
          },
        ],
      },
    } as MovieDetails

    expect(getYoutubeVideos(movie).map((item) => item.id)).toEqual(['b', 'a'])
  })
})
