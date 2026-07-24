import type {ComponentPropsWithoutRef, ReactNode} from 'react'
import {factory} from '../../core/factory'
import type {FactoryPayload} from '../../core/factory'
import {Divider} from '../Divider/Divider'
import styles from './MenuList.module.css'

interface MenuListFactoryPayload extends FactoryPayload {
  props: MenuListProps
  ref: HTMLUListElement
}

export interface MenuListItemData {
  /** Unique key for the item. */
  key: string
  /** Visible label. */
  label: ReactNode
  /** Dims the item and blocks selection. */
  disabled?: boolean
  /** Called when the item is clicked or activated via keyboard. */
  onSelect?: () => void
}

/** An entry in a `MenuList`'s `items` array — an item, or `'divider'` for a separator line. */
export type MenuListEntry = MenuListItemData | 'divider'

export interface MenuListProps extends Omit<
  ComponentPropsWithoutRef<'ul'>,
  'children'
> {
  /** The menu's items, in order. Use `'divider'` for a separator line. */
  items: MenuListEntry[]
}

/**
 * A vertical list of selectable items (a dropdown menu, a Start-menu-style
 * list, a right-click context menu) — each item is a real `<button>` so
 * keyboard/focus/disabled behavior comes for free, wrapped in an `<li
 * role="none">` per the ARIA menu pattern. Hover/focus inverts to
 * `--t95-menu-item-background-hover`/`-color-hover`, which win95/98/XP map
 * to the same system highlight color already used for text selection (no
 * dedicated menu recipe exists in those source libraries — this is the
 * real OS convention, not an approximation); win7/10 use their own sourced
 * accent blue instead. Styling comes entirely from `--t95-menu-*` custom
 * properties (see src/tokens), so the same markup renders correctly under
 * any `data-skin` ancestor without a JS branch on skin.
 */
export const MenuList = factory<MenuListFactoryPayload>(
  ({items, className, ...rest}, ref) => (
    <ul
      ref={ref}
      role="menu"
      className={[styles.menu, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {items.map((item, index) =>
        item === 'divider' ? (
          <li key={`divider-${index}`} role="none">
            <Divider className={styles.divider} />
          </li>
        ) : (
          <li key={item.key} role="none">
            <button
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={item.onSelect}
              className={styles.item}
            >
              {item.label}
            </button>
          </li>
        )
      )}
    </ul>
  )
)

MenuList.displayName = 'Type95/MenuList'
