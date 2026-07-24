import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {render, screen, user} from '@/test-utils'
import {Tabs} from './Tabs'

const items = [
  {key: 'general', label: 'General', content: 'General panel'},
  {key: 'display', label: 'Display', content: 'Display panel'},
  {
    key: 'advanced',
    label: 'Advanced',
    content: 'Advanced panel',
    disabled: true
  }
]

describe('Tabs', () => {
  it('renders the first non-disabled tab as active by default', () => {
    render(<Tabs items={items} />)
    expect(screen.getByRole('tab', {name: 'General'})).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('General panel')
  })

  it('switches the active panel when a tab is clicked', async () => {
    render(<Tabs items={items} />)

    await user.click(screen.getByRole('tab', {name: 'Display'}))

    expect(screen.getByRole('tab', {name: 'Display'})).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Display panel')
  })

  it('does not select a disabled tab', async () => {
    render(<Tabs items={items} />)

    await user.click(screen.getByRole('tab', {name: 'Advanced'}))

    expect(screen.getByRole('tab', {name: 'Advanced'})).toBeDisabled()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('General panel')
  })

  it('respects defaultActiveKey', () => {
    render(<Tabs items={items} defaultActiveKey="display" />)
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Display panel')
  })

  it('supports controlled activeKey/onChange', async () => {
    const onChange = vi.fn()
    render(<Tabs items={items} activeKey="general" onChange={onChange} />)

    await user.click(screen.getByRole('tab', {name: 'Display'}))

    expect(onChange).toHaveBeenCalledWith('display')
    // Controlled: stays on "general" since activeKey didn't change.
    expect(screen.getByRole('tabpanel')).toHaveTextContent('General panel')
  })

  it('merges a consumer className with the component class', () => {
    render(<Tabs items={items} className="extra" />)
    expect(screen.getByRole('tablist').parentElement?.className).toContain(
      'extra'
    )
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<Tabs items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying div element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Tabs items={items} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
