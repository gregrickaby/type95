import {axe} from 'jest-axe'
import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {render, screen, user} from '@/test-utils'
import {Radio} from './Radio'

describe('Radio', () => {
  it('renders with a label', () => {
    render(<Radio label="Option A" />)
    expect(screen.getByRole('radio', {name: 'Option A'})).toBeInTheDocument()
  })

  it('selects when the label is clicked', async () => {
    render(<Radio label="Option A" />)
    const radio = screen.getByRole('radio', {name: 'Option A'})

    expect(radio).not.toBeChecked()
    await user.click(screen.getByText('Option A'))
    expect(radio).toBeChecked()
  })

  it('calls onChange when selected', async () => {
    const onChange = vi.fn()
    render(<Radio label="Option A" onChange={onChange} />)

    await user.click(screen.getByRole('radio'))

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('only allows one radio in a group to be checked', async () => {
    render(
      <>
        <Radio name="group" label="Option A" />
        <Radio name="group" label="Option B" />
      </>
    )

    await user.click(screen.getByRole('radio', {name: 'Option A'}))
    await user.click(screen.getByRole('radio', {name: 'Option B'}))

    expect(screen.getByRole('radio', {name: 'Option A'})).not.toBeChecked()
    expect(screen.getByRole('radio', {name: 'Option B'})).toBeChecked()
  })

  it('does not select when disabled', async () => {
    render(<Radio label="Option A" disabled />)
    const radio = screen.getByRole('radio')

    await user.click(screen.getByText('Option A'))

    expect(radio).not.toBeChecked()
    expect(radio).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<Radio label="Option A" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('forwards a ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Radio label="Option A" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
