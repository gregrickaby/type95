import type {Meta, StoryObj} from '@storybook/react-vite'
import {Tabs} from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    style: {width: 320},
    items: [
      {key: 'general', label: 'General', content: 'General settings go here.'},
      {key: 'display', label: 'Display', content: 'Display settings go here.'},
      {
        key: 'advanced',
        label: 'Advanced',
        content: 'Advanced settings go here.',
        disabled: true
      }
    ]
  }
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {}
