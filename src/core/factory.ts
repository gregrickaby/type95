import {forwardRef} from 'react'
import type {ForwardedRef, ReactElement} from 'react'

export interface FactoryPayload {
  props: object
  ref: unknown
}

export type Type95Factory<Payload extends FactoryPayload> = ((
  props: Payload['props'] & {ref?: ForwardedRef<Payload['ref']>}
) => ReactElement | null) & {
  displayName?: string
}

/**
 * Wraps `forwardRef` with a consistent `{props, ref}` payload shape that
 * every non-polymorphic Type95 component is built from — gives ref
 * forwarding for free and a stable place to hang static properties (e.g. a
 * future `Button.Group`) after creation, without each component
 * re-deriving its own forwardRef generics. See `polymorphicFactory` for
 * components that also need a `component` prop.
 */
export function factory<Payload extends FactoryPayload>(
  ui: (
    props: Payload['props'],
    ref: ForwardedRef<Payload['ref']>
  ) => ReactElement | null
): Type95Factory<Payload> {
  const Component = forwardRef(ui as never)
  return Component as unknown as Type95Factory<Payload>
}
