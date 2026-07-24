import type {Meta, StoryObj} from '@storybook/react-vite'
import {Panel} from './Panel'

const meta: Meta<typeof Panel> = {
  title: 'Components/Panel',
  component: Panel,
  args: {
    children: 'Panel content'
  }
}

export default meta

type Story = StoryObj<typeof Panel>

export const Sunken: Story = {
  args: {variant: 'sunken'}
}

export const Raised: Story = {
  args: {variant: 'raised'}
}

export const Flat: Story = {
  args: {variant: 'flat'}
}
