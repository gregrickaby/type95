import {createRef} from 'react'
import {describe, expect, it} from 'vitest'
import {render, screen} from '@/test-utils'
import {factory} from './factory'
import {polymorphicFactory} from './polymorphic-factory'
import type {FactoryPayload} from './factory'
import type {PolymorphicFactoryPayload} from './polymorphic-factory'

interface LabelFactoryPayload extends FactoryPayload {
  props: {text: string}
  ref: HTMLSpanElement
}

const Label = factory<LabelFactoryPayload>(({text}, ref) => (
  <span ref={ref}>{text}</span>
))
Label.displayName = 'Label'

interface BoxFactoryPayload extends PolymorphicFactoryPayload {
  props: object
  defaultComponent: 'div'
  defaultRef: HTMLDivElement
}

const Box = polymorphicFactory<BoxFactoryPayload>(
  ({component, ...rest}, ref) => {
    const Element = component ?? 'div'
    return <Element ref={ref} {...rest} />
  }
)
Box.displayName = 'Box'

describe('factory', () => {
  it('forwards a ref to the underlying element', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Label ref={ref} text="hi" />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('sets displayName', () => {
    expect(Label.displayName).toBe('Label')
  })
})

describe('polymorphicFactory', () => {
  it('renders the default component', () => {
    render(<Box data-testid="box">content</Box>)
    expect(screen.getByTestId('box').tagName).toBe('DIV')
  })

  it('renders as the given component', () => {
    render(
      <Box component="a" href="/x" data-testid="box">
        content
      </Box>
    )
    const el = screen.getByTestId('box')
    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', '/x')
  })

  it('forwards a ref to the rendered element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Box ref={ref}>content</Box>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('sets displayName', () => {
    expect(Box.displayName).toBe('Box')
  })
})
