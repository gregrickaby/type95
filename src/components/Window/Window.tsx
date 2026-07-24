import type {ComponentPropsWithoutRef, ReactNode} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import {TitleBar} from '../TitleBar/TitleBar'
import styles from './Window.module.css'

interface WindowFactoryPayload extends FactoryPayload {
  props: WindowProps
  ref: HTMLDivElement
}

export interface WindowProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Title text rendered in the window's title bar. */
  title?: ReactNode
  /**
   * Whether the window is active (focused). Forwarded to the title bar.
   * @default true
   */
  active?: boolean
  /** Extra title bar controls, forwarded to `TitleBar`. */
  controls?: ReactNode
  /** Renders a close button in the title bar, forwarded to `TitleBar`. */
  onClose?: () => void
}

/**
 * A framed window: a `TitleBar` on top and a body area below. Styling
 * comes entirely from `--t95-window-*` / `--t95-titlebar-*` custom
 * properties (see src/tokens), so the same markup renders correctly
 * under any `data-skin` ancestor without a JS branch on skin. `children`
 * renders inside the body — pass a `ScrollView` as the body's own child
 * for a scrollable window content area.
 */
export const Window = factory<WindowFactoryPayload>(
  (
    {title, active = true, controls, onClose, className, children, ...rest},
    ref
  ) => (
    <div
      ref={ref}
      className={[styles.window, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <TitleBar active={active} controls={controls} onClose={onClose}>
        {title}
      </TitleBar>
      <div className={styles.body}>{children}</div>
    </div>
  )
)

Window.displayName = 'Type95/Window'
