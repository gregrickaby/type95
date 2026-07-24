import {describe, expect, it} from 'vitest'
import {
  getComponentDoc,
  listComponents,
  loadMcpData,
  searchDocs
} from './data.js'
import type {McpData, SearchResult} from './data.js'

describe('loadMcpData', () => {
  it('loads the generated data file', () => {
    const data = loadMcpData()
    expect(data.package).toBe('type95')
    expect(data.components.length).toBeGreaterThan(0)
  })
})

const fixture: McpData = {
  generatedAt: '2026-01-01T00:00:00.000Z',
  package: 'type95',
  components: [
    {
      name: 'Button',
      description: 'Classic raised 3D bevel button.\nMore detail here.',
      importPath: 'type95',
      polymorphic: true,
      defaultElement: 'button',
      clientComponent: false,
      storyUrl: 'https://example.com/button'
    }
  ]
}

describe('listComponents', () => {
  it('returns a one-line summary per component', () => {
    expect(listComponents(fixture)).toEqual([
      {name: 'Button', description: 'Classic raised 3D bevel button.'}
    ])
  })
})

describe('getComponentDoc', () => {
  it('finds a component case-insensitively', () => {
    expect(getComponentDoc(fixture, 'button')?.name).toBe('Button')
  })

  it('returns null for an unknown component', () => {
    expect(getComponentDoc(fixture, 'Window')).toBeNull()
  })
})

describe('searchDocs', () => {
  const llmsFull =
    '# type95\n\nintro\n\n## Tokens\n\n--t95-face is the background color\n\n## Skins\n\nwin95, win98'

  it('matches a component by description', () => {
    const results = searchDocs(fixture, llmsFull, 'bevel')
    expect(results).toEqual([
      {component: 'Button', snippet: fixture.components[0]!.description}
    ])
  })

  it('matches a llms-full.txt section by heading content', () => {
    const results = searchDocs(fixture, llmsFull, 'background color')
    expect(results.some((r: SearchResult) => r.component === 'Tokens')).toBe(
      true
    )
  })

  it('returns nothing for an empty query', () => {
    expect(searchDocs(fixture, llmsFull, '  ')).toEqual([])
  })

  it('returns nothing when there is no match', () => {
    expect(searchDocs(fixture, llmsFull, 'nonexistent-xyz')).toEqual([])
  })
})
