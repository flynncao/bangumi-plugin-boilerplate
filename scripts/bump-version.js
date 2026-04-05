#!/usr/bin/env node

/**
 * Bump version script
 * Usage: node scripts/bump-version.js [--dry-run]
 *
 * This script:
 * 1. Increments the patch version in package.json and src/metadata.json
 * 2. Creates a git commit with the version bump
 * 3. Creates a git tag
 * 4. Pushes the commit and tag to origin
 *
 * Use --dry-run to preview changes without applying them.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import simpleGit from 'simple-git'

const dryRun = process.argv.includes('--dry-run')

if (dryRun) {
  console.log('[DRY RUN] No changes will be made')
}

const git = simpleGit()

// Read current version from package.json
const packageJsonPath = resolve(process.cwd(), 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
const currentVersion = packageJson.version

// Increment patch version
const versionParts = currentVersion.split('.').map(Number)
versionParts[2] += 1
const newVersion = versionParts.join('.')

console.log(`Bumping version: ${currentVersion} -> ${newVersion}`)

if (!dryRun) {
  // Update package.json
  packageJson.version = newVersion
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)

  // Update metadata.json
  const metadataJsonPath = resolve(process.cwd(), 'src/metadata.json')
  const metadataJson = JSON.parse(readFileSync(metadataJsonPath, 'utf-8'))
  metadataJson.version = newVersion
  writeFileSync(metadataJsonPath, `${JSON.stringify(metadataJson, null, 2)}\n`)

  // Stage files
  await git.add(['package.json', 'src/metadata.json'])

  // Commit
  await git.commit(`chore(release): bump version to ${newVersion}`)

  // Create tag
  await git.addTag(`v${newVersion}`)

  // Push commit and tag
  await git.push('origin', 'main')
  await git.pushTags('origin')

  console.log(`Version ${newVersion} released successfully!`)
} else {
  console.log('[DRY RUN] Would update:')
  console.log(`  - package.json: ${currentVersion} -> ${newVersion}`)
  console.log(`  - src/metadata.json: ${currentVersion} -> ${newVersion}`)
  console.log(`  - Create commit: "chore(release): bump version to ${newVersion}"`)
  console.log(`  - Create tag: v${newVersion}`)
  console.log('  - Push commit and tag to origin')
}
