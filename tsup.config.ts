import {cp} from 'node:fs/promises'
import {defineConfig} from 'tsup'

export default defineConfig({
  entry: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/types/**'
  ],
  bundle: false,
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  async onSuccess() {
    // bundle: false leaves `import styles from './Button.module.css'`
    // untouched in the compiled output, and mirrors src/'s directory
    // structure 1:1 in dist/. Copy the source .css files to the same
    // relative paths so those imports resolve — the consumer's own
    // bundler (Next.js/Vite/webpack) applies CSS Modules' scoped hashing,
    // this package never processes CSS itself.
    await cp('src', 'dist', {
      recursive: true,
      filter: (src) => !src.endsWith('.ts') && !src.endsWith('.tsx')
    })
  }
})
