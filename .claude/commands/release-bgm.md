---
description: Release a new version of the Bangumi userscript
---

## Task

Execute the complete release workflow for the Bangumi userscript.

## Steps

1. **Build and Lint**

   ```bash
   pnpm run build
   pnpm run lint
   ```

   If either fails, stop and report errors.

2. **Version Bump**

   ```bash
   pnpm cm
   ```

   This increments the patch version, updates userscript metadata, commits, tags, and pushes.

3. **Additional Commits (if needed)**
   If there are uncommitted changes after `pnpm cm`, create commits locally (do not push):
   - `feat: description` for new features
   - `fix: description` for bug fixes
   - `refactor: description` for code restructuring
   - `docs: description` for documentation
   - `chore: description` for maintenance
   - `style: description` for formatting

## Notes

- Always use `pnpm`
- Ensure build passes before version bump
- `pnpm cm` handles version bumping in both package.json and userscript metadata
