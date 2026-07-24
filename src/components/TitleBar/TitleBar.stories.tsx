import type {Meta, StoryObj} from '@storybook/react-vite'
import {TitleBar} from './TitleBar'

const meta: Meta<typeof TitleBar> = {
  title: 'Components/TitleBar',
  component: TitleBar,
  args: {
    children: 'My Computer'
  }
}

export default meta

type Story = StoryObj<typeof TitleBar>

export const Active: Story = {
  args: {active: true}
}

export const Inactive: Story = {
  args: {active: false}
}

export const WithClose: Story = {
  args: {onClose: () => console.info('close clicked')}
}
