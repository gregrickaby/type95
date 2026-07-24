import type {Meta, StoryObj} from '@storybook/react-vite'
import {MenuList} from './MenuList'

const meta: Meta<typeof MenuList> = {
  title: 'Components/MenuList',
  component: MenuList,
  args: {
    style: {width: 180},
    items: [
      {key: 'new', label: 'New', onSelect: () => console.info('New')},
      {key: 'open', label: 'Open...', onSelect: () => console.info('Open')},
      'divider',
      {key: 'save', label: 'Save', onSelect: () => console.info('Save')},
      {key: 'save-as', label: 'Save As...', disabled: true},
      'divider',
      {key: 'exit', label: 'Exit', onSelect: () => console.info('Exit')}
    ]
  }
}

export default meta

type Story = StoryObj<typeof MenuList>

export const Default: Story = {}
