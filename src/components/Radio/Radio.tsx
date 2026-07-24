import type {ComponentPropsWithoutRef, ReactNode} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import styles from './Radio.module.css'

interface RadioFactoryPayload extends FactoryPayload {
  props: RadioProps
  ref: HTMLInputElement
}

export interface RadioProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'type'
> {
  /** Visible label text, rendered next to the dot inside the same `<label>`. */
  label?: ReactNode
}

/**
 * Sunken-circle radio button with a dot glyph, wrapped in a `<label>` so
 * clicking the circle or the label text both select the native input — no
 * `id`/`htmlFor` wiring required. Group multiple `Radio`s the same way
 * you'd group native radio inputs: give each the same `name`. The native
 * `<input type="radio">` is visually hidden (not `display: none`) so it
 * stays in the accessibility tree and keyboard/focus behavior comes for
 * free; the visible circle is an `aria-hidden` sibling `<span>` styled
 * from its state via CSS sibling selectors (`:checked ~`, `:disabled ~`,
 * `:focus-visible ~`).
 */
export const Radio = factory<RadioFactoryPayload>(
  ({label, className, ...rest}, ref) => (
    <label className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <input ref={ref} type="radio" className={styles.input} {...rest} />
      <span className={styles.circle} aria-hidden="true" />
      {label !== undefined && <span className={styles.label}>{label}</span>}
    </label>
  )
)

Radio.displayName = 'Type95/Radio'
