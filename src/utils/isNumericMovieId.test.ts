import { describe, expect, it } from 'vitest'
import { isNumericMovieId } from './isNumericMovieId'

describe('isNumericMovieId', () => {
  it('accepts digit-only ids', () => {
    expect(isNumericMovieId('550')).toBe(true)
    expect(isNumericMovieId('0')).toBe(true)
  })

  it('rejects missing or non-numeric values', () => {
    expect(isNumericMovieId(undefined)).toBe(false)
    expect(isNumericMovieId('')).toBe(false)
    expect(isNumericMovieId('abc')).toBe(false)
    expect(isNumericMovieId('55a')).toBe(false)
    expect(isNumericMovieId('55.0')).toBe(false)
    expect(isNumericMovieId('-12')).toBe(false)
  })
})
