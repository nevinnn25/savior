import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'

const sourceDir = 'prototype/dist'
const targetDir = 'public/prototype/dist'

if (!existsSync(sourceDir)) {
  throw new Error('prototype/dist does not exist. Run prototype build first.')
}

rmSync(targetDir, { recursive: true, force: true })
mkdirSync('public/prototype', { recursive: true })
cpSync(sourceDir, targetDir, { recursive: true })

console.log('Synced prototype build into public/prototype/dist')
