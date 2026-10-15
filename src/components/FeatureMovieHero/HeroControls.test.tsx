import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { HeroControls } from './HeroControls'

afterEach(() => {
  cleanup()
})

const baseProps = {
  progress: 0.4,
  playing: false,
  onPrev: vi.fn(),
  onNext: vi.fn(),
  onGoTo: vi.fn(),
}

describe('HeroControls', () => {
  it('shows a padded counter and a single focusable segment group', () => {
    render(<HeroControls index={0} count={20} {...baseProps} />)

    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText(/\/\s*20/)).toBeInTheDocument()
    expect(
      screen.getByRole('group', { name: 'Featured movies' }),
    ).toHaveAttribute('tabindex', '0')
    expect(screen.getAllByRole('button', { name: /Show movie/ })).toHaveLength(
      20,
    )
  })

  it('wires pager arrows, segment clicks, and arrow keys', async () => {
    const user = userEvent.setup()
    const onPrev = vi.fn()
    const onNext = vi.fn()
    const onGoTo = vi.fn()

    const { container } = render(
      <HeroControls
        index={2}
        count={5}
        progress={0}
        playing={false}
        onPrev={onPrev}
        onNext={onNext}
        onGoTo={onGoTo}
      />,
    )
    const view = within(container)

    await user.click(view.getByRole('button', { name: 'Previous movie' }))
    await user.click(view.getByRole('button', { name: 'Next movie' }))
    await user.click(view.getByRole('button', { name: 'Show movie 4' }))

    const track = view.getByRole('group', { name: 'Featured movies' })
    track.focus()
    await user.keyboard('{ArrowRight}')

    expect(onPrev).toHaveBeenCalledOnce()
    expect(onNext).toHaveBeenCalledTimes(2)
    expect(onGoTo).toHaveBeenCalledWith(3)
  })

  it('announces only after a user-driven change', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <HeroControls
        index={0}
        count={5}
        progress={0}
        playing
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onGoTo={vi.fn()}
      />,
    )

    expect(
      screen.getByText('', { selector: '[aria-live="polite"]' }),
    ).toHaveTextContent('')

    await user.click(screen.getByRole('button', { name: 'Next movie' }))
    rerender(
      <HeroControls
        index={1}
        count={5}
        progress={0}
        playing
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onGoTo={vi.fn()}
      />,
    )

    expect(
      screen.getByText('02 / 05', { selector: '[aria-live="polite"]' }),
    ).toBeInTheDocument()

    rerender(
      <HeroControls
        index={2}
        count={5}
        progress={0}
        playing
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onGoTo={vi.fn()}
      />,
    )

    expect(
      screen.getByText('', { selector: '[aria-live="polite"]' }),
    ).toHaveTextContent('')
  })

  it('hides when there is only one slide', () => {
    const { container } = render(
      <HeroControls index={0} count={1} {...baseProps} />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
