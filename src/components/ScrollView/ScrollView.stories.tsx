import type {Meta, StoryObj} from '@storybook/react-vite'
import {ScrollView} from './ScrollView'

const meta: Meta<typeof ScrollView> = {
  title: 'Components/ScrollView',
  component: ScrollView,
  args: {
    style: {width: 240, height: 150},
    children: (
      <div style={{padding: 8}}>
        {Array.from({length: 30}, (_, i) => (
          <div key={i}>Line {i + 1}</div>
        ))}
      </div>
    )
  }
}

export default meta

type Story = StoryObj<typeof ScrollView>

export const Default: Story = {}
