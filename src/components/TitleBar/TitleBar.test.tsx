import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {render, screen, user} from '@/test-utils'
import {TitleBar} from './TitleBar'

describe('TitleBar', () => {
  it('renders the title text', () => {
    render(<TitleBar>My Computer</TitleBar>)
    expect(screen.getByText('My Computer')).toBeInTheDocument()
  })

  it('is active by default', () => {
    render(<TitleBar>My Computer</TitleBar>)
    expect(
      screen.getByText('My Computer').closest('div')?.className
    ).not.toContain('inactive')
  })

  it('applies the inactive class when active is false', () => {
    render(<TitleBar active={false}>My Computer</TitleBar>)
    expect(screen.getByText('My Computer').closest('div')?.className).toContain(
      'inactive'
    )
  })

  it('does not render a close button by default', () => {
    render(<TitleBar>My Computer</TitleBar>)
    expect(
      screen.queryByRole('button', {name: 'Close'})
    ).not.toBeInTheDocument()
  })

  it('renders a close button when onClose is provided', async () => {
    const onClose = vi.fn()
    render(<TitleBar onClose={onClose}>My Computer</TitleBar>)

    await user.click(screen.getByRole('button', {name: 'Close'}))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders extra controls', () => {
    render(
      <TitleBar controls={<button type="button">?</button>}>
        My Computer
      </TitleBar>
    )
    expect(screen.getByRole('button', {name: '?'})).toBeInTheDocument()
  })

  it('merges a consumer className with the component class', () => {
    render(<TitleBar className="extra">My Computer</TitleBar>)
    expect(screen.getByText('My Computer').closest('div')?.className).toContain(
      'extra'
    )
  })

  it('has no accessibility violations', async () => {
    const {container} = render(
      <TitleBar onClose={() => {}}>My Computer</TitleBar>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying div element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<TitleBar ref={ref}>My Computer</TitleBar>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
