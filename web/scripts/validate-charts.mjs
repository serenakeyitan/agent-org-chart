// Validate every charts/*/chart.json against schemas/org-chart.schema.json.
// Usage: npm run validate [-- path/to/chart.json ...]
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const schema = JSON.parse(readFileSync(resolve(root, 'schemas/org-chart.schema.json'), 'utf8'))

const ajv = new Ajv2020({ strict: false, allErrors: true })
addFormats(ajv)
const validate = ajv.compile(schema)

let files = process.argv.slice(2).map((f) => resolve(f))
if (files.length === 0) {
  const chartsDir = resolve(root, 'charts')
  files = readdirSync(chartsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => resolve(chartsDir, d.name, 'chart.json'))
    .filter((f) => existsSync(f))
}

let failed = 0
for (const file of files) {
  const name = relative(root, file)
  let data
  try {
    data = JSON.parse(readFileSync(file, 'utf8'))
  } catch (err) {
    failed++
    console.error(`✗ ${name}: ${err.message}`)
    continue
  }
  if (validate(data)) {
    console.log(`✓ ${name}`)
  } else {
    failed++
    console.error(`✗ ${name}`)
    for (const e of validate.errors) {
      const extra = e.keyword === 'additionalProperties' ? ` (${e.params.additionalProperty})` : ''
      console.error(`    ${e.instancePath || '/'} ${e.message}${extra}`)
    }
  }
}

console.log(`\n${files.length - failed}/${files.length} charts valid`)
process.exit(failed ? 1 : 0)
