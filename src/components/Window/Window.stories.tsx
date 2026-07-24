import type {Meta, StoryObj} from '@storybook/react-vite'
import {Button} from '../Button/Button'
import {Window} from './Window'

const meta: Meta<typeof Window> = {
  title: 'Components/Window',
  component: Window,
  args: {
    title: 'My Computer',
    children: 'Window body content goes here.',
    style: {width: 320}
  }
}

export default meta

type Story = StoryObj<typeof Window>

export const Default: Story = {}

export const Inactive: Story = {
  args: {active: false}
}

export const WithClose: Story = {
  args: {onClose: () => console.info('close clicked')}
}

export const WithFooterButtons: Story = {
  args: {
    onClose: () => console.info('close clicked'),
    children: (
      <>
        <p style={{marginTop: 0}}>Are you sure you want to continue?</p>
        <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
          <Button>OK</Button>
          <Button>Cancel</Button>
        </div>
      </>
    )
  }
}
