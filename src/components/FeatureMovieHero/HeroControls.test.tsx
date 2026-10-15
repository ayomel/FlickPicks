import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { HeroControls } from './HeroControls'

afterEach(() => {
  cleanup()
})

describe('HeroControls', () => {
  it('shows a padded counter and segmented progress tabs', () => {
    render(
      <HeroControls
        index={0}
        count={20}
        progress={0.4}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onGoTo={vi.fn()}
      />,
    )

    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText(/\/\s*20/)).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(20)
    expect(screen.getByRole('tab', { name: 'Show movie 1' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('wires pager arrows and segment clicks', async () => {
    const user = userEvent.setup()
    const onPrev = vi.fn()
    const onNext = vi.fn()
    const onGoTo = vi.fn()

    const { container } = render(
      <HeroControls
        index={2}
        count={5}
        progress={0}
        onPrev={onPrev}
        onNext={onNext}
        onGoTo={onGoTo}
      />,
    )
    const view = within(container)

    await user.click(view.getByRole('button', { name: 'Previous movie' }))
    await user.click(view.getByRole('button', { name: 'Next movie' }))
    await user.click(view.getByRole('tab', { name: 'Show movie 4' }))

    expect(onPrev).toHaveBeenCalledOnce()
    expect(onNext).toHaveBeenCalledOnce()
    expect(onGoTo).toHaveBeenCalledWith(3)
  })

  it('hides when there is only one slide', () => {
    const { container } = render(
      <HeroControls
        index={0}
        count={1}
        progress={0}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onGoTo={vi.fn()}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
