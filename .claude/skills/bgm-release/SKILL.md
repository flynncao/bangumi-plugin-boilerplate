---
name: release-bgm
description: Release workflow for Bangumi userscripts using the bangumi-plugin-boilerplate design. Use when the user types "/release-bgm" or asks to release a new version of a Bangumi userscript. Runs build, lint, version bump (pnpm cm), and commit in sequence. Applies to any userscript with pnpm cm command for bumping metadata version, linter/formatter with Git hooks.
---

# Bgm Release

## Overview

This skill executes the complete release workflow for Bangumi userscripts that follow the bangumi-plugin-boilerplate design pattern.

## Prerequisites

This skill is designed for userscripts with:

- `pnpm cm` command for version bumping (updates both package.json and userscript metadata)
- `pnpm run build` for production builds
- `pnpm run lint` for linting
- Git hooks for pre-commit linting/formatting
- Conventional commits and semantic versioning

## Workflow

When the user invokes `/release-bgm`, execute these steps in order:

### Step 1: Build and Lint

Run the build and lint commands to ensure code quality:

```bash
pnpm run build
pnpm run lint
```

If either command fails, stop and report the errors to the user. Do not proceed until issues are fixed.

### Step 2: Version Bump

Run the version bump command which increments the patch version, commits, tags, and pushes:

```bash
pnpm cm
```

This command will:

- Increment the patch version in package.json
- Update the version in userscript metadata (e.g., `src/metadata.json`)
- Commit the version change
- Create a git tag
- Push to the remote repository

### Step 3: Create Commits (if needed)

If `pnpm cm` did not create a commit (or if there are additional uncommitted changes), do NOT use the `/commit` skill. Instead, manually split changes and create commits locally:

1. Run `git status` to see uncommitted changes
2. Group related changes into meaningful commits (e.g., feature changes, fixes, refactoring, docs)
3. Stage files selectively: `git add <files-for-one-logical-group>`
4. Create semantic commits following conventional commit format:
   - `feat: description` for new features
   - `fix: description` for bug fixes
   - `refactor: description` for code restructuring
   - `docs: description` for documentation updates
   - `chore: description` for maintenance tasks
   - `style: description` for formatting changes

**Important:** Commit locally only. Do NOT push to remote.

## Important Notes

- Always use `pnpm` (never `npm` or `yarn`)
- Ensure the build passes before bumping version
- The `pnpm cm` command handles version bumping in both package.json and userscript metadata, plus tagging and pushing
- This workflow assumes Git hooks are configured for pre-commit linting/formatting
