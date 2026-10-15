import { describe, expect, it } from 'vitest'
import {
  getBackdropCardPath,
  getBackdropPath,
  getBackdropSrcSet,
  getPosterCardPath,
  getPosterPath,
  getPosterSrcSet,
  getPosterThumbPath,
} from './getPosterPath'

describe('getPosterPath helpers', () => {
  it('builds poster defaults and srcset without original', () => {
    expect(getPosterCardPath('/p.jpg')).toBe(
      'https://image.tmdb.org/t/p/w342/p.jpg',
    )
    expect(getPosterSrcSet('/p.jpg')).toBe(
      'https://image.tmdb.org/t/p/w185/p.jpg 185w, https://image.tmdb.org/t/p/w342/p.jpg 342w',
    )
    expect(getPosterThumbPath('/p.jpg')).toBe(
      'https://image.tmdb.org/t/p/w92/p.jpg',
    )
    expect(getPosterPath('/p.jpg')).toBe(
      'https://image.tmdb.org/t/p/w780/p.jpg',
    )
    expect(getPosterPath('/p.jpg')).not.toContain('/original/')
  })

  it('builds backdrop defaults and srcset with w780 default', () => {
    expect(getBackdropCardPath('/b.jpg')).toBe(
      'https://image.tmdb.org/t/p/w780/b.jpg',
    )
    expect(getBackdropPath('/b.jpg')).toBe(
      'https://image.tmdb.org/t/p/w780/b.jpg',
    )
    expect(getBackdropSrcSet('/b.jpg')).toBe(
      'https://image.tmdb.org/t/p/w780/b.jpg 780w, https://image.tmdb.org/t/p/w1280/b.jpg 1280w',
    )
  })
})
