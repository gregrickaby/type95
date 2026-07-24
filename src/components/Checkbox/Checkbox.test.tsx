import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {render, screen, user} from '@/test-utils'
import {Checkbox} from './Checkbox'

describe('Checkbox', () => {
  it('renders with a label', () => {
    render(<Checkbox label="Enable sound" />)
    expect(
      screen.getByRole('checkbox', {name: 'Enable sound'})
    ).toBeInTheDocument()
  })

  it('toggles when the label is clicked', async () => {
    render(<Checkbox label="Enable sound" />)
    const checkbox = screen.getByRole('checkbox', {name: 'Enable sound'})

    expect(checkbox).not.toBeChecked()
    await user.click(screen.getByText('Enable sound'))
    expect(checkbox).toBeChecked()
  })

  it('calls onChange when toggled', async () => {
    const onChange = vi.fn()
    render(<Checkbox label="Enable sound" onChange={onChange} />)

    await user.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('respects defaultChecked', () => {
    render(<Checkbox label="Enable sound" defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('does not toggle when disabled', async () => {
    render(<Checkbox label="Enable sound" disabled />)
    const checkbox = screen.getByRole('checkbox')

    await user.click(screen.getByText('Enable sound'))

    expect(checkbox).not.toBeChecked()
    expect(checkbox).toBeDisabled()
  })

  it('merges a consumer className with the wrapper class', () => {
    render(<Checkbox label="Enable sound" className="extra" />)
    expect(screen.getByRole('checkbox').closest('label')?.className).toContain(
      'extra'
    )
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<Checkbox label="Enable sound" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Checkbox label="Enable sound" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
