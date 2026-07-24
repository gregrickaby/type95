import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {render, screen, user} from '@/test-utils'
import {TextInput} from './TextInput'

describe('TextInput', () => {
  it('renders a text input', () => {
    render(<TextInput aria-label="Name" />)
    expect(screen.getByRole('textbox', {name: 'Name'})).toBeInTheDocument()
  })

  it('defaults to type="text"', () => {
    render(<TextInput aria-label="Name" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
  })

  it('accepts typed input', async () => {
    render(<TextInput aria-label="Name" />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'Clippy')

    expect(input).toHaveValue('Clippy')
  })

  it('calls onChange when typed into', async () => {
    const onChange = vi.fn()
    render(<TextInput aria-label="Name" onChange={onChange} />)

    await user.type(screen.getByRole('textbox'), 'a')

    expect(onChange).toHaveBeenCalled()
  })

  it('does not accept input when disabled', async () => {
    render(<TextInput aria-label="Name" disabled />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'Clippy')

    expect(input).toHaveValue('')
    expect(input).toBeDisabled()
  })

  it('merges a consumer className with the component class', () => {
    render(<TextInput aria-label="Name" className="extra" />)
    expect(screen.getByRole('textbox').className).toContain('extra')
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<TextInput aria-label="Name" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextInput aria-label="Name" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
