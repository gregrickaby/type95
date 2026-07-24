import type {ComponentPropsWithoutRef, ReactNode} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import styles from './Checkbox.module.css'

interface CheckboxFactoryPayload extends FactoryPayload {
  props: CheckboxProps
  ref: HTMLInputElement
}

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'type'
> {
  /** Visible label text, rendered next to the box inside the same `<label>`. */
  label?: ReactNode
}

/**
 * Sunken-box checkbox with a checkmark glyph, wrapped in a `<label>` so
 * clicking the box or the label text both toggle the native input — no
 * `id`/`htmlFor` wiring required. The native `<input type="checkbox">` is
 * visually hidden (not `display: none`) so it stays in the accessibility
 * tree and keyboard/focus behavior comes for free; the visible box is a
 * `aria-hidden` sibling `<span>` styled from its state via CSS sibling
 * selectors (`:checked ~`, `:disabled ~`, `:focus-visible ~`).
 */
export const Checkbox = factory<CheckboxFactoryPayload>(
  ({label, className, ...rest}, ref) => (
    <label className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <input ref={ref} type="checkbox" className={styles.input} {...rest} />
      <span className={styles.box} aria-hidden="true" />
      {label !== undefined && <span className={styles.label}>{label}</span>}
    </label>
  )
)

Checkbox.displayName = 'Type95/Checkbox'
