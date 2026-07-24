import type {ComponentPropsWithoutRef} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import styles from './TextInput.module.css'

interface TextInputFactoryPayload extends FactoryPayload {
  props: TextInputProps
  ref: HTMLInputElement
}

export type TextInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>

/**
 * Sunken-bevel single-line text field. Renders a native `<input>` (no
 * `type` prop — always text entry; use a plain `<input type="checkbox">`
 * or the `Checkbox`/`Radio` components for those variants). Styling comes
 * entirely from `--t95-textinput-*` custom properties, so the same markup
 * renders correctly under any `data-skin` ancestor without a JS branch on
 * skin.
 */
export const TextInput = factory<TextInputFactoryPayload>(
  ({className, ...rest}, ref) => (
    <input
      ref={ref}
      type="text"
      className={[styles.input, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
)

TextInput.displayName = 'Type95/TextInput'
