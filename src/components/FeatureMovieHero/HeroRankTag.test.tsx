import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroRankTag } from './HeroRankTag'

describe('HeroRankTag', () => {
  it('renders the weekly trending rank', () => {
    render(<HeroRankTag rank={1} />)
    expect(screen.getByText('#1 Trending this week')).toBeInTheDocument()
  })
})
