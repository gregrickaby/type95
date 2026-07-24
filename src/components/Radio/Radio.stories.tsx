import type {Meta, StoryObj} from '@storybook/react-vite'
import {Radio} from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  args: {
    name: 'story-group',
    label: 'Option A'
  }
}

export default meta

type Story = StoryObj<typeof Radio>

export const Default: Story = {}

export const Checked: Story = {
  args: {defaultChecked: true}
}

export const Disabled: Story = {
  args: {disabled: true}
}

export const Group: Story = {
  render: () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      <Radio name="group" label="Option A" defaultChecked />
      <Radio name="group" label="Option B" />
      <Radio name="group" label="Option C (disabled)" disabled />
    </div>
  )
}
