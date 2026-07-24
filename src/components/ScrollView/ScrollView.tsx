import type {ComponentPropsWithoutRef} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import styles from './ScrollView.module.css'

interface ScrollViewFactoryPayload extends FactoryPayload {
  props: ScrollViewProps
  ref: HTMLDivElement
}

export type ScrollViewProps = ComponentPropsWithoutRef<'div'>

/**
 * A sunken, scrollable content box — the classic "cutout" preview pane
 * with a themed scrollbar, e.g. a file listing inside a `Window` body.
 * Reuses the same `--t95-panel-*` sunken tokens as `Panel`'s `sunken`
 * variant (98.css's own `.sunken-panel` is literally "Panel sunken +
 * `overflow: auto`") plus dedicated `--t95-scrollbar-*` tokens for the
 * `::-webkit-scrollbar` pseudo-elements. That scrollbar styling only
 * applies in Chromium/Safari — Firefox has no equivalent API and falls
 * back to its native scrollbar, a limitation of the underlying platform
 * feature, not this component.
 */
export const ScrollView = factory<ScrollViewFactoryPayload>(
  ({className, ...rest}, ref) => (
    <div
      ref={ref}
      className={[styles.scrollview, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
)

ScrollView.displayName = 'Type95/ScrollView'
