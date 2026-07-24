#!/usr/bin/env node
// Generates llms.txt, llms-full.txt, and mcp-server/data/mcp-data.json from
// one source of truth: each component's exported JSDoc + Props type, plus
// the token list in src/tokens/base.css. Re-run via `npm run generate:llms`
// whenever a component's public API or JSDoc changes (see CLAUDE.md).
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import ts from 'typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const componentsDir = join(root, 'src/components')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

const STORYBOOK_BASE = 'https://gregrickaby.github.io/type95/'

const SKINS = [
  {name: 'win95', status: 'done — flat title bar'},
  {name: 'win98', status: 'done — gradient "web style" title bar'},
  {name: 'winxp', status: 'done — Luna blue, rounded corners'},
  {name: 'win7', status: 'placeholder tokens only — Aero glass not designed'},
  {name: 'win10', status: 'placeholder tokens only — Fluent flat not designed'}
]

function getLeadingJsDoc(fullText, node) {
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart())
  const jsdocRange = ranges?.find(
    (r) => r.kind === ts.SyntaxKind.MultiLineCommentTrivia
  )
  if (!jsdocRange) return ''
  return fullText
    .slice(jsdocRange.pos, jsdocRange.end)
    .replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, ''))
    .join('\n')
    .trim()
}

function isExported(node) {
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0
}

function parseComponent(name) {
  const file = join(componentsDir, name, `${name}.tsx`)
  const text = readFileSync(file, 'utf8')
  const source = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  )

  let description = ''
  let defaultElement = null
  let polymorphic = false
  let clientDirective = /^['"]use client['"]/.test(text.trim())

  for (const node of source.statements) {
    if (
      (ts.isVariableStatement(node) &&
        node.declarationList.declarations.some(
          (d) => d.name.getText() === name
        )) ||
      (ts.isFunctionDeclaration(node) && node.name?.getText() === name)
    ) {
      if (isExported(node)) {
        description = getLeadingJsDoc(text, node)
      }
    }

    if (
      ts.isTypeAliasDeclaration(node) &&
      node.name.getText() === `${name}Props`
    ) {
      const match = node.type
        .getText(source)
        .match(/Type95ComponentProps<'([^']+)'/)
      if (match) {
        polymorphic = true
        defaultElement = match[1]
      }
    }
  }

  return {
    name,
    description,
    polymorphic,
    defaultElement,
    clientDirective,
    importPath: `type95`,
    storyUrl: `${STORYBOOK_BASE}?path=/story/components-${name.toLowerCase()}--default`
  }
}

function getComponents() {
  return readdirSync(componentsDir, {withFileTypes: true})
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map(parseComponent)
}

function getTokens() {
  const css = readFileSync(join(root, 'src/tokens/base.css'), 'utf8')
  const matches = [...css.matchAll(/(--t95-[\w-]+):\s*([^;]+);/g)]
  return matches.map(([, name, value]) => ({name, value: value.trim()}))
}

function componentSummary(c) {
  const firstLine = c.description.split('\n')[0] || 'No description yet.'
  return `- **${c.name}** — ${firstLine} (${c.storyUrl})`
}

function componentFullDoc(c) {
  const lines = [
    `### ${c.name}`,
    '',
    c.description || 'No description yet.',
    ''
  ]
  lines.push(`- Import: \`import {${c.name}} from '${c.importPath}'\``)
  lines.push(
    `- Client component: ${c.clientDirective ? 'yes' : 'no (server-safe by default)'}`
  )
  if (c.polymorphic) {
    lines.push(
      `- Polymorphic: renders as \`<${c.defaultElement}>\` by default; pass \`component="..."\` to render as a different element, plus that element's own native props`
    )
  }
  lines.push(`- Storybook: ${c.storyUrl}`)
  return lines.join('\n')
}

function buildLlmsTxt(components, tokens) {
  return `# ${pkg.name}

> ${pkg.description}

## Install

\`\`\`bash
npm install type95
\`\`\`

Peer requirement: your bundler must support CSS Modules natively (Next.js,
Vite, webpack all do). This package ships \`.module.css\` files unprocessed.

## Quick start

\`\`\`tsx
import {Type95Provider, Button} from 'type95'

function App() {
  return (
    <Type95Provider skin="win98">
      <Button>OK</Button>
    </Type95Provider>
  )
}
\`\`\`

Switch skins live (no re-render) with \`setSkin('winxp')\` from \`type95\`.

## Skins

${SKINS.map((s) => `- **${s.name}** — ${s.status}`).join('\n')}

## Components

${components.map(componentSummary).join('\n')}

## Tokens

${tokens.length} \`--t95-*\` custom properties drive every component's
styling (see \`llms-full.txt\` or \`src/tokens/base.css\` for the full list
with values). Never hardcode a color/border/font in a consuming
component — read a token instead so it keeps working across skins.

## More

- Full docs: ${STORYBOOK_BASE}llms-full.txt
- Storybook: ${STORYBOOK_BASE}
- Repository: ${pkg.repository?.url ?? ''}
`
}

function buildLlmsFullTxt(components, tokens) {
  return `# ${pkg.name} — full reference

> ${pkg.description}

Generated from source (component JSDoc + src/tokens/base.css). Regenerate
via \`npm run generate:llms\` whenever a component's public API changes.

## Install

\`\`\`bash
npm install type95
\`\`\`

This package ships \`.module.css\` files unprocessed (\`bundle: false\` in
tsup) — your bundler must apply CSS Modules scoped hashing itself.
Next.js, Vite, and webpack all do this out of the box.

## Type95Provider

Server-safe: sets a static \`data-skin\` attribute at render time, no
client JS required.

\`\`\`tsx
import {Type95Provider} from 'type95'

<Type95Provider skin="win98">{children}</Type95Provider>
\`\`\`

For live runtime switching without a re-render, use \`setSkin(skin)\` /
\`getSkin()\` (\`'use client'\`) instead of changing the \`skin\` prop:

\`\`\`tsx
import {setSkin, getSkin} from 'type95'

setSkin('winxp')
getSkin() // 'winxp'
\`\`\`

## Skins

${SKINS.map((s) => `- **${s.name}** — ${s.status}`).join('\n')}

Switch by setting \`data-skin\` on an ancestor element (\`Type95Provider\`
does this for you). Every component's CSS Module reads only \`--t95-*\`
custom properties; each skin file in \`src/tokens/\` overrides them under
\`[data-skin="..."]\`.

## Component authoring pattern

Built-in components are created with \`factory()\` (ref-forwarding,
\`{props, ref}\` payload) or \`polymorphicFactory()\` (adds a \`component\`
prop for rendering as a different element, e.g. \`<Button component="a"
href="...">\`). Both are exported from \`type95\` for building your own
components that share the same ref-forwarding/polymorphism behavior as
built-ins. No Styles API (no \`classNames\`/\`styles\`/\`vars\` runtime
overrides) — styling is CSS Modules + \`--t95-*\` tokens only, merge a
consumer \`className\` the same way \`Button\` does.

## Components

${components.map(componentFullDoc).join('\n\n')}

## Tokens (\`src/tokens/base.css\` defaults)

${tokens.map((t) => `- \`${t.name}\`: ${t.value}`).join('\n')}

## Roadmap

Backlog (not started): Window, TitleBar, TextInput, Panel/Cutout,
ScrollView, MenuList, Tabs, Checkbox, Radio, Divider.
`
}

function buildMcpData(components) {
  return {
    generatedAt: new Date().toISOString(),
    package: pkg.name,
    components: components.map((c) => ({
      name: c.name,
      description: c.description,
      importPath: c.importPath,
      polymorphic: c.polymorphic,
      defaultElement: c.defaultElement,
      clientComponent: c.clientDirective,
      storyUrl: c.storyUrl
    }))
  }
}

function main() {
  const components = getComponents()
  const tokens = getTokens()

  writeFileSync(join(root, 'llms.txt'), buildLlmsTxt(components, tokens))
  writeFileSync(
    join(root, 'llms-full.txt'),
    buildLlmsFullTxt(components, tokens)
  )

  const mcpDataDir = join(root, 'mcp-server/data')
  if (!existsSync(mcpDataDir)) mkdirSync(mcpDataDir, {recursive: true})
  writeFileSync(
    join(mcpDataDir, 'mcp-data.json'),
    JSON.stringify(buildMcpData(components), null, 2) + '\n'
  )

  console.info(
    `Generated llms.txt, llms-full.txt, and mcp-server/data/mcp-data.json for ${components.length} component(s).`
  )
}

main()
