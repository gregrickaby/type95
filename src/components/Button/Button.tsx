import type {ButtonHTMLAttributes} from 'react'
import styles from './Button.module.css'

export type ButtonProps = Readonly<ButtonHTMLAttributes<HTMLButtonElement>>

/**
 * Classic raised 3D bevel button. Styling comes entirely from `--t95-*`
 * custom properties (see src/tokens), so the same markup renders correctly
 * under any `data-skin` ancestor without a JS branch on skin.
 */
export function Button({className, ...props}: ButtonProps) {
  const classes = [styles.button, className].filter(Boolean).join(' ')

  return <button type="button" className={classes} {...props} />
}
