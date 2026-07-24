'use client'

import type {Skin} from './Type95Provider'

/**
 * Live skin switch without a React re-render: mutates the nearest
 * Type95Provider's `data-skin` attribute directly. Component styling is
 * driven entirely by CSS custom properties scoped to `[data-skin="..."]`,
 * so the subtree repaints from the browser's CSS engine alone. Falls back
 * to `document.documentElement` when no Type95Provider is mounted (e.g. a
 * consumer set `data-skin` on `<html>` directly).
 */
export function setSkin(skin: Skin): void {
  const root =
    document.querySelector('[data-t95-provider]') ?? document.documentElement
  root.setAttribute('data-skin', skin)
}

/** Reads the currently active skin, or null if none is set. */
export function getSkin(): Skin | null {
  const root =
    document.querySelector('[data-t95-provider]') ?? document.documentElement
  return root.getAttribute('data-skin') as Skin | null
}
