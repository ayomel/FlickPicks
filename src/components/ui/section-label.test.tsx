import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionLabel } from './section-label'

describe('SectionLabel', () => {
  it('shows the section name to readers', () => {
    render(<SectionLabel>Trending now</SectionLabel>)
    expect(screen.getByText('Trending now')).toBeVisible()
  })
})
