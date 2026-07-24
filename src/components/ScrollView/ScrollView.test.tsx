import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it} from 'vitest'
import {render, screen} from '@/test-utils'
import {ScrollView} from './ScrollView'

describe('ScrollView', () => {
  it('renders children', () => {
    render(<ScrollView>Content</ScrollView>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('merges a consumer className with the component class', () => {
    render(<ScrollView className="extra">Content</ScrollView>)
    expect(screen.getByText('Content').className).toContain('extra')
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<ScrollView>Content</ScrollView>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying div element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ScrollView ref={ref}>Content</ScrollView>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
