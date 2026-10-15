import { describe, expect, it } from 'vitest'
import {
  MIN_GENRE_ROW_COUNT,
  moviesForGenreRow,
  TRENDING_GENRE_ROWS,
} from './tmdbGenres'
import type { TrendingMovie } from '@/types/trending'

const movie = (id: number, genre_ids: number[]): TrendingMovie => ({
  adult: false,
  backdrop_path: null,
  id,
  title: `Movie ${id}`,
  original_title: `Movie ${id}`,
  overview: '',
  poster_path: '/p.jpg',
  media_type: 'movie',
  original_language: 'en',
  genre_ids,
  popularity: 1,
  release_date: '2024-01-01',
  softcore: false,
  video: false,
  vote_average: 7,
  vote_count: 1,
})

describe('moviesForGenreRow', () => {
  it('keeps titles that match any configured genre id', () => {
    const movies = [
      movie(1, [27]),
      movie(2, [28, 12]),
      movie(3, [18]),
      movie(4, [53]),
    ]
    const horror = moviesForGenreRow(movies, TRENDING_GENRE_ROWS[0].genreIds)
    expect(horror.map((item) => item.id)).toEqual([1, 4])
  })

  it('documents the minimum row size used by Home', () => {
    expect(MIN_GENRE_ROW_COUNT).toBe(4)
  })
})
