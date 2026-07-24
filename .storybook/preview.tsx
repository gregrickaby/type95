import type {Decorator, Preview} from '@storybook/react-vite'
import '../src/tokens/index.css'

const skins = [
  {value: 'win95', title: 'Windows 95'},
  {value: 'win98', title: 'Windows 98'},
  {value: 'winxp', title: 'Windows XP'},
  {value: 'win7', title: 'Windows 7 (WIP)'},
  {value: 'win10', title: 'Windows 10 (WIP)'}
]

const withSkin: Decorator = (Story, context) => {
  const skin = (context.globals.skin as string) ?? 'win98'
  return (
    <div data-t95-provider="" data-skin={skin} style={{padding: '2rem'}}>
      <Story />
    </div>
  )
}

const preview: Preview = {
  globalTypes: {
    skin: {
      name: 'Skin',
      description: 'Retro OS skin',
      defaultValue: 'win98',
      toolbar: {
        icon: 'paintbrush',
        items: skins,
        dynamicTitle: true
      }
    }
  },
  decorators: [withSkin],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
