import type {ReactNode} from 'react'

export type Skin = 'win95' | 'win98' | 'winxp' | 'win7' | 'win10'

export interface Type95ProviderProps {
  /** Active retro skin. */
  skin: Skin
  children: ReactNode
  className?: string
}

/**
 * Sets the active skin via a `data-skin` attribute that descendant
 * component CSS Modules key off (see src/tokens). No client JS required
 * for the static case, so this renders fine inside a Server Component.
 * For runtime switching (e.g. a right-click theme menu), use `setSkin()`
 * from `./setSkin` instead of re-rendering this component with a new prop.
 */
export function Type95Provider({
  skin,
  children,
  className
}: Readonly<Type95ProviderProps>) {
  return (
    <div data-t95-provider="" data-skin={skin} className={className}>
      {children}
    </div>
  )
}
