// Copia a página inicial do hub de jogos (fora do build do Vite, que só
// gera o subcaminho /sudoku-pokemon/) para a raiz de public-deploy/.
import { copyFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const outDir = path.join(root, 'public-deploy')

mkdirSync(outDir, { recursive: true })
copyFileSync(path.join(root, 'hub', 'index.html'), path.join(outDir, 'index.html'))
copyFileSync(path.join(root, 'public', 'favicon.svg'), path.join(outDir, 'favicon.svg'))

console.log('hub: index.html e favicon.svg copiados para public-deploy/')
