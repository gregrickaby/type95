import type {Meta, StoryObj} from '@storybook/react-vite'
import {Divider} from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider
}

export default meta

type Story = StoryObj<typeof Divider>

export const Default: Story = {}

export const BetweenContent: Story = {
  render: (args) => (
    <div>
      <p>Section one</p>
      <Divider {...args} />
      <p>Section two</p>
    </div>
  )
}
