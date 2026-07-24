import type {StorybookConfig} from '@storybook/react-vite'
import {mergeConfig} from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(viteConfig) {
    // Relative asset paths so the static build works from a GitHub Pages
    // project subpath (gregrickaby.github.io/type95/) without hardcoding
    // the repo name here.
    return mergeConfig(viteConfig, {base: './'})
  }
}

export default config
