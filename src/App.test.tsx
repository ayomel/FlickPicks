import { useEffect } from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ScrollToTop } from './App'

afterEach(() => {
  cleanup()
})

const NavigateOnMount = ({ to }: { to: string }) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to)
  }, [navigate, to])

  return null
}

describe('ScrollToTop', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('scrolls to the top when the pathname changes', async () => {
    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/movies/:id"
            element={<NavigateOnMount to="/movies/2" />}
          />
          <Route path="*" element={null} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
    expect(window.scrollTo).toHaveBeenCalledTimes(2)
  })
})
