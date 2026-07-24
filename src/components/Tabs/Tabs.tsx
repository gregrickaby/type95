'use client'

import {useId, useState} from 'react'
import type {ComponentPropsWithoutRef, ReactNode} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import styles from './Tabs.module.css'

interface TabsFactoryPayload extends FactoryPayload {
  props: TabsProps
  ref: HTMLDivElement
}

export interface TabItem {
  /** Unique key identifying this tab. */
  key: string
  /** Visible tab label. */
  label: ReactNode
  /** Content rendered in the panel when this tab is active. */
  content: ReactNode
  /** Dims the tab and blocks selection. */
  disabled?: boolean
}

export interface TabsProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange'
> {
  /** The tabs, in order. */
  items: TabItem[]
  /** Initial active tab key, for uncontrolled use. Defaults to the first non-disabled item. */
  defaultActiveKey?: string
  /** Active tab key, for controlled use — pair with `onChange`. */
  activeKey?: string
  /** Called with the newly selected key when a tab is clicked. */
  onChange?: (key: string) => void
}

/**
 * A tab strip and its associated panel — sourced from the identical
 * `menu[role=tablist]` / `[role=tabpanel]` markup all three pixel-measured
 * Windows-era CSS libraries share (see docs/visual-reference.md): the
 * selected tab's negative margin makes it visually overlap the panel
 * below, hiding the border between them. Styling comes entirely from
 * `--t95-tabs-*` custom properties (see src/tokens), so the same markup
 * renders correctly under any `data-skin` ancestor without a JS branch on
 * skin. Uncontrolled by default (tracks its own active tab); pass
 * `activeKey`/`onChange` to control it. Ships `'use client'` since it
 * holds interactive selection state.
 */
export const Tabs = factory<TabsFactoryPayload>(
  (
    {
      items,
      defaultActiveKey,
      activeKey: controlledKey,
      onChange,
      className,
      ...rest
    },
    ref
  ) => {
    const uid = useId()
    const [uncontrolledKey, setUncontrolledKey] = useState(
      () =>
        defaultActiveKey ??
        items.find((item) => !item.disabled)?.key ??
        items[0]?.key
    )
    const activeKey = controlledKey ?? uncontrolledKey
    const activeItem = items.find((item) => item.key === activeKey)

    const handleSelect = (key: string) => {
      if (controlledKey === undefined) {
        setUncontrolledKey(key)
      }
      onChange?.(key)
    }

    return (
      <div
        ref={ref}
        className={[styles.wrapper, className].filter(Boolean).join(' ')}
        {...rest}
      >
        <div role="tablist" className={styles.tablist}>
          {items.map((item) => (
            <div
              key={item.key}
              role="presentation"
              className={[
                styles.tabItem,
                item.key === activeKey && styles.selected
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <button
                type="button"
                role="tab"
                id={`${uid}-tab-${item.key}`}
                aria-selected={item.key === activeKey}
                aria-controls={`${uid}-tabpanel-${item.key}`}
                disabled={item.disabled}
                onClick={() => handleSelect(item.key)}
                className={styles.tabButton}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
        {activeItem !== undefined && (
          <div
            role="tabpanel"
            id={`${uid}-tabpanel-${activeItem.key}`}
            aria-labelledby={`${uid}-tab-${activeItem.key}`}
            className={styles.panel}
          >
            {activeItem.content}
          </div>
        )}
      </div>
    )
  }
)

Tabs.displayName = 'Type95/Tabs'
