import type {ComponentPropsWithoutRef} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import styles from './Panel.module.css'

interface PanelFactoryPayload extends FactoryPayload {
  props: PanelProps
  ref: HTMLDivElement
}

export interface PanelProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Bevel direction. `raised` reads as a status-bar-style segment,
   * `sunken` as a recessed preview/cutout pane, `flat` as a plain
   * groove-bordered box (closest to a classic win95 GroupBox).
   * @default 'sunken'
   */
  variant?: 'raised' | 'sunken' | 'flat'
}

/**
 * Generic bordered container (GroupBox/"Cutout" style) with no opinion on
 * content — a building block for status bars, preview panes, or a
 * `Window` body. Styling comes entirely from `--t95-panel-*` custom
 * properties, so the same markup renders correctly under any `data-skin`
 * ancestor without a JS branch on skin.
 */
export const Panel = factory<PanelFactoryPayload>(
  ({variant = 'sunken', className, ...rest}, ref) => (
    <div
      ref={ref}
      className={[styles.panel, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
)

Panel.displayName = 'Type95/Panel'
