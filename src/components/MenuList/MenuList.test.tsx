import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {render, screen, user} from '@/test-utils'
import {MenuList} from './MenuList'

describe('MenuList', () => {
  it('renders each item', () => {
    render(
      <MenuList
        items={[
          {key: 'a', label: 'New'},
          {key: 'b', label: 'Open'}
        ]}
      />
    )
    expect(screen.getByRole('menuitem', {name: 'New'})).toBeInTheDocument()
    expect(screen.getByRole('menuitem', {name: 'Open'})).toBeInTheDocument()
  })

  it('renders dividers between items', () => {
    const {container} = render(
      <MenuList
        items={[{key: 'a', label: 'New'}, 'divider', {key: 'b', label: 'Open'}]}
      />
    )
    expect(container.querySelectorAll('hr')).toHaveLength(1)
  })

  it('calls onSelect when an item is clicked', async () => {
    const onSelect = vi.fn()
    render(<MenuList items={[{key: 'a', label: 'New', onSelect}]} />)

    await user.click(screen.getByRole('menuitem', {name: 'New'}))

    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('does not call onSelect for a disabled item', async () => {
    const onSelect = vi.fn()
    render(
      <MenuList items={[{key: 'a', label: 'New', onSelect, disabled: true}]} />
    )

    await user.click(screen.getByRole('menuitem', {name: 'New'}))

    expect(onSelect).not.toHaveBeenCalled()
  })

  it('merges a consumer className with the component class', () => {
    render(<MenuList items={[{key: 'a', label: 'New'}]} className="extra" />)
    expect(screen.getByRole('menu').className).toContain('extra')
  })

  it('has no accessibility violations', async () => {
    const {container} = render(
      <MenuList
        items={[
          {key: 'a', label: 'New'},
          'divider',
          {key: 'b', label: 'Open', disabled: true}
        ]}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying ul element', () => {
    const ref = createRef<HTMLUListElement>()
    render(<MenuList items={[{key: 'a', label: 'New'}]} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLUListElement)
  })
})
