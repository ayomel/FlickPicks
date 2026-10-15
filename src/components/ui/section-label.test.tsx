import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionLabel } from './section-label'

describe('SectionLabel', () => {
  it('uses at least 12px text sizing', () => {
    render(<SectionLabel>Trending now</SectionLabel>)
    expect(screen.getByText('Trending now').className).toContain('text-xs')
  })
})
