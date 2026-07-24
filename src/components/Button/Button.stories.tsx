import type {Meta, StoryObj} from '@storybook/react-vite'
import {Button} from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'OK'
  }
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Cancel: Story = {
  args: {children: 'Cancel'}
}

export const Disabled: Story = {
  args: {disabled: true}
}
