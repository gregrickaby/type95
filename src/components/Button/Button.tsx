import type {ElementType} from 'react'
import {polymorphicFactory} from '../../core/polymorphic-factory'
import type {
  PolymorphicFactoryPayload,
  Type95ComponentProps
} from '../../core/polymorphic-factory'
import styles from './Button.module.css'

interface ButtonFactoryPayload extends PolymorphicFactoryPayload {
  props: object
  defaultComponent: 'button'
  defaultRef: HTMLButtonElement
}

export type ButtonProps = Type95ComponentProps<'button'>

/**
 * Classic raised 3D bevel button. Styling comes entirely from `--t95-*`
 * custom properties (see src/tokens), so the same markup renders correctly
 * under any `data-skin` ancestor without a JS branch on skin.
 *
 * Renders a `<button>` by default; pass `component="a"` (with `href`) to
 * render a link styled as a button. `type="button"` is only defaulted for
 * the native `<button>` case — other elements don't get a `type` attribute.
 */
export const Button = polymorphicFactory<ButtonFactoryPayload>(
  ({component, className, type, ...rest}, ref) => {
    const Element = (component ?? 'button') as ElementType
    const classes = [styles.button, className].filter(Boolean).join(' ')

    return (
      <Element
        ref={ref}
        type={component === undefined ? (type ?? 'button') : type}
        className={classes}
        {...rest}
      />
    )
  }
)

Button.displayName = 'Type95/Button'
