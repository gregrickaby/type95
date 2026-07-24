import {axe} from 'jest-axe'
import {describe, expect, it, vi} from 'vitest'
import {render, screen, user} from '@/test-utils'
import {Button} from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>OK</Button>)
    expect(screen.getByRole('button', {name: 'OK'})).toBeInTheDocument()
  })

  it('defaults to type="button"', () => {
    render(<Button>OK</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('respects an explicit type override', () => {
    render(<Button type="submit">Save</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('merges a consumer className with the component class', () => {
    render(<Button className="extra">OK</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('extra')
  })

  it('calls onClick handler when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>OK</Button>)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        OK
      </Button>
    )

    await user.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<Button>OK</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
