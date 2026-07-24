import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it} from 'vitest'
import {render, screen} from '@/test-utils'
import {Panel} from './Panel'

describe('Panel', () => {
  it('renders children', () => {
    render(<Panel>Content</Panel>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('defaults to the sunken variant', () => {
    render(<Panel>Content</Panel>)
    expect(screen.getByText('Content').className).toContain('sunken')
  })

  it('applies the raised variant', () => {
    render(<Panel variant="raised">Content</Panel>)
    expect(screen.getByText('Content').className).toContain('raised')
  })

  it('applies the flat variant', () => {
    render(<Panel variant="flat">Content</Panel>)
    expect(screen.getByText('Content').className).toContain('flat')
  })

  it('merges a consumer className with the component class', () => {
    render(<Panel className="extra">Content</Panel>)
    expect(screen.getByText('Content').className).toContain('extra')
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<Panel>Content</Panel>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying div element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Panel ref={ref}>Content</Panel>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
