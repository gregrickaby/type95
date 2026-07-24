import type {Meta, StoryObj} from '@storybook/react-vite'
import {TextInput} from './TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  args: {
    defaultValue: 'Hello, Type95'
  }
}

export default meta

type Story = StoryObj<typeof TextInput>

export const Default: Story = {}

export const Placeholder: Story = {
  args: {defaultValue: undefined, placeholder: 'Enter your name'}
}

export const Disabled: Story = {
  args: {disabled: true}
}
