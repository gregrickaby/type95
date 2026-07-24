import {render as rtlRender, type RenderOptions} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type {ReactElement} from 'react'
import {Type95Provider} from '@/src/Type95Provider/Type95Provider'
import type {Skin} from '@/src/Type95Provider/Type95Provider'

export * from '@testing-library/react'

export const user = userEvent.setup()

export interface CustomRenderOptions extends RenderOptions {
  skin?: Skin
}

/**
 * Wraps every render in Type95Provider so components can rely on the
 * ancestor `[data-skin]` attribute their CSS Modules key off. Defaults to
 * win98 since that's the most-covered skin during early development.
 */
export function render(
  ui: ReactElement,
  {skin = 'win98', ...options}: CustomRenderOptions = {}
) {
  return rtlRender(<Type95Provider skin={skin}>{ui}</Type95Provider>, options)
}
