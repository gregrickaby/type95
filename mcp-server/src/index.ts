#!/usr/bin/env node
import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {z} from 'zod'
import {
  getComponentDoc,
  listComponents,
  loadMcpData,
  searchDocs
} from './data.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const data = loadMcpData()
const llmsFullText = readFileSync(
  join(__dirname, '../../llms-full.txt'),
  'utf8'
)

const server = new McpServer({
  name: 'type95-mcp-server',
  version: '0.1.0'
})

server.tool(
  'list_components',
  'List every Type95 component with a one-line description each.',
  {},
  async () => ({
    content: [
      {type: 'text', text: JSON.stringify(listComponents(data), null, 2)}
    ]
  })
)

server.tool(
  'get_component_doc',
  'Get the full documentation (description, props behavior, import path, Storybook link) for one Type95 component by name.',
  {name: z.string().describe('Component name, e.g. "Button"')},
  async ({name}) => {
    const doc = getComponentDoc(data, name)
    if (!doc) {
      return {
        content: [{type: 'text', text: `No component named "${name}".`}],
        isError: true
      }
    }
    return {content: [{type: 'text', text: JSON.stringify(doc, null, 2)}]}
  }
)

server.tool(
  'search_docs',
  'Keyword search across Type95 component docs and the full llms-full.txt reference (tokens, skins, provider usage, component authoring pattern).',
  {query: z.string().describe('Search term, e.g. "polymorphic" or "skin"')},
  async ({query}) => {
    const results = searchDocs(data, llmsFullText, query)
    return {
      content: [
        {
          type: 'text',
          text: results.length
            ? results
                .map((r) => `## ${r.component}\n${r.snippet}`)
                .join('\n\n---\n\n')
            : `No matches for "${query}".`
        }
      ]
    }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
