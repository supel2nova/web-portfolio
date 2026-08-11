import { readFileSync, writeFileSync, rmSync } from 'node:fs'

const { render } = await import('../dist-ssr/entry-server.js')
const appHtml = render()

const file = 'dist/index.html'
const html = readFileSync(file, 'utf8')
const marker = '<div id="root"></div>'

if (!html.includes(marker)) {
  throw new Error(`prerender: "${marker}" not found in ${file}`)
}

writeFileSync(file, html.replace(marker, `<div id="root">${appHtml}</div>`))
rmSync('dist-ssr', { recursive: true, force: true })

console.log(`prerendered ${appHtml.length.toLocaleString()} chars into ${file}`)
