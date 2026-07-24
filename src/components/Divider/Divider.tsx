import type {ComponentPropsWithoutRef} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import styles from './Divider.module.css'

interface DividerFactoryPayload extends FactoryPayload {
  props: DividerProps
  ref: HTMLHRElement
}

export type DividerProps = ComponentPropsWithoutRef<'hr'>

/**
 * Horizontal groove line for separating sections of a dialog or menu.
 * Renders a native `<hr>` (implicit `role="separator"`), styled as the
 * classic two-tone engraved line — a dark line on top, a light line
 * directly under it — using the same `--t95-border-dark` /
 * `--t95-border-lightest` tokens every bevel in this library reads from,
 * rather than a dedicated `--t95-divider-*` token set.
 */
export const Divider = factory<DividerFactoryPayload>(
  ({className, ...rest}, ref) => (
    <hr
      ref={ref}
      className={[styles.divider, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
)

Divider.displayName = 'Type95/Divider'
