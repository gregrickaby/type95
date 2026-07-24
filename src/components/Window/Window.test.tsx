import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {render, screen, user} from '@/test-utils'
import {Window} from './Window'

describe('Window', () => {
  it('renders the title and body content', () => {
    render(<Window title="My Computer">Body content</Window>)
    expect(screen.getByText('My Computer')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('renders a close button when onClose is provided', async () => {
    const onClose = vi.fn()
    render(
      <Window title="My Computer" onClose={onClose}>
        Body content
      </Window>
    )

    await user.click(screen.getByRole('button', {name: 'Close'}))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('merges a consumer className with the component class', () => {
    render(
      <Window title="My Computer" className="extra">
        Body content
      </Window>
    )
    expect(
      screen.getByText('Body content').closest('div.extra')
    ).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const {container} = render(
      <Window title="My Computer" onClose={() => {}}>
        Body content
      </Window>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying div element', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Window title="My Computer" ref={ref}>
        Body content
      </Window>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
