import {forwardRef} from 'react'
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  ReactElement
} from 'react'

/** Adds a `component` prop for rendering as a different element or component. */
export interface Type95AsProp<C extends ElementType> {
  /** Element or component to render as instead of the default. */
  component?: C
}

type OwnPropsKeys<C extends ElementType, Props> = keyof (Type95AsProp<C> &
  Props)

/**
 * `Props` plus every prop the chosen `component` accepts, minus whatever
 * `Props` already defines. Use this to type a polymorphic component's
 * public props, e.g. `Type95ComponentProps<'button', {variant?: string}>`.
 */
export type Type95ComponentProps<
  C extends ElementType,
  Props extends object = object
> = Props &
  Type95AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, OwnPropsKeys<C, Props>>

export interface PolymorphicFactoryPayload {
  props: object
  defaultComponent: ElementType
  defaultRef: unknown
}

export type Type95PolymorphicFactory<
  Payload extends PolymorphicFactoryPayload
> = (<C extends ElementType = Payload['defaultComponent']>(
  props: Type95ComponentProps<C, Payload['props']> & {
    ref?: ForwardedRef<Payload['defaultRef']>
  }
) => ReactElement | null) & {displayName?: string}

/**
 * Like `factory`, but the returned component also accepts a `component`
 * prop so it can render as a different element (e.g. `<Button
 * component="a" href="...">`). Ref typing is approximated to the default
 * component's ref — when rendering as something else, cast the ref at the
 * call site if you need a precise element type.
 */
export function polymorphicFactory<Payload extends PolymorphicFactoryPayload>(
  ui: (
    props: Payload['props'] &
      Type95AsProp<ElementType> &
      ComponentPropsWithoutRef<Payload['defaultComponent']>,
    ref: ForwardedRef<Payload['defaultRef']>
  ) => ReactElement | null
): Type95PolymorphicFactory<Payload> {
  const Component = forwardRef(ui as never)
  return Component as unknown as Type95PolymorphicFactory<Payload>
}
