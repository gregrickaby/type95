import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it} from 'vitest'
import {render, screen} from '@/test-utils'
import {Divider} from './Divider'

describe('Divider', () => {
  it('renders a separator', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('merges a consumer className with the component class', () => {
    render(<Divider className="extra" />)
    expect(screen.getByRole('separator').className).toContain('extra')
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<Divider />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying hr element', () => {
    const ref = createRef<HTMLHRElement>()
    render(<Divider ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLHRElement)
  })
})
