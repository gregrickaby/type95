import type {ComponentPropsWithoutRef, ReactNode} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import styles from './TitleBar.module.css'

interface TitleBarFactoryPayload extends FactoryPayload {
  props: TitleBarProps
  ref: HTMLDivElement
}

export interface TitleBarProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Whether this is the active (focused) window's title bar. Inactive
   * title bars swap to a dimmer gray background/text per every sourced
   * Windows era.
   * @default true
   */
  active?: boolean
  /** Extra controls (e.g. minimize/maximize) rendered before the close button. */
  controls?: ReactNode
  /** Renders a close ("×") button that calls this handler when clicked. */
  onClose?: () => void
}

/**
 * The title strip at the top of a `Window` — also usable standalone.
 * Styling comes entirely from `--t95-titlebar-*` custom properties (see
 * src/tokens), so the same markup renders correctly under any `data-skin`
 * ancestor without a JS branch on skin. `children` renders as the title
 * text; `onClose` is the only built-in control (a single close button)
 * since a full minimize/maximize/restore icon set would need per-skin
 * assets beyond what this library ships — pass additional buttons via
 * `controls` for anything else.
 */
export const TitleBar = factory<TitleBarFactoryPayload>(
  ({active = true, controls, onClose, className, children, ...rest}, ref) => (
    <div
      ref={ref}
      className={[styles.titlebar, !active && styles.inactive, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className={styles.text}>{children}</span>
      {(controls !== undefined || onClose !== undefined) && (
        <div className={styles.controls}>
          {controls}
          {onClose !== undefined && (
            <button
              type="button"
              aria-label="Close"
              className={styles.close}
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  )
)

TitleBar.displayName = 'Type95/TitleBar'
