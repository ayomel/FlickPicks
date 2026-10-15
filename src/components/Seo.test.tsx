import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Seo } from './Seo'

afterEach(() => {
  cleanup()
})

describe('Seo', () => {
  it('sets the document title and description', async () => {
    render(
      <Seo
        title="The Matrix · FlickPick"
        description="A computer hacker joins rebels."
      />,
    )

    await waitFor(() => {
      expect(document.title).toBe('The Matrix · FlickPick')
    })
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'A computer hacker joins rebels.',
    )
  })
})
