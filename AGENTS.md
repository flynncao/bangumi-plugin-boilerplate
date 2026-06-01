# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Project Overview

This is a userscript (Tampermonkey/Greasemonkey) for Bangumi.tv that adds a floating UI to copy anime/manga titles in various formats (main title, Chinese name, Romaji).

## Build Commands

- `npm run dev` - Development build with watch mode, keeps `console.log` statements
- `npm run build` - Production build, strips `console.log` statements
- `npm run lint` - ESLint with auto-fix using @sxzz/eslint-config
- `npm run format` - Prettier formatting

The build outputs to `dist/index.user.js` which is the userscript file loaded by browser extensions.

## Architecture

### Build Pipeline

- **Entry**: `src/main.js`
- **Bundler**: Rollup with `rollup.config.js`
- **Plugins**:
  - `rollup-plugin-userscript-metadata` - Injects metadata from `src/metadata.json`
  - `rollup-plugin-import-css` - Embeds CSS as strings
  - `@rollup/plugin-strip` - Removes `console.log` in production builds

### Code Organization

- **`src/main.js`** - Entry point, validates page URL, initializes storage, injects styles, creates UI
- **`src/components/layouts/`** - UI components:
  - `button.js` - Creates copy button with icon/text
  - `select.js` - Creates language selector dropdown
  - `controller.js` - Creates draggable floating container with drag handle
- **`src/storage/index.js`** - localStorage wrapper with `STORAGE_NAMESPACE` prefix
- **`src/constants/index.js`** - URL regex patterns for page matching (BGM_SUBJECT_REGEX, etc.)
- **`src/static/`** - CSS, JS (butterup toast library), and SVG icons

### Key Implementation Details

- **Page Detection**: Uses regex patterns in `constants/index.js` to match subject, character, and person pages
- **Title Extraction**: jQuery-based DOM queries for `h1.nameSingle`, infobox tips ("中文名", "罗马名")
- **Storage**: Settings persist via localStorage with keys prefixed by `BangumiCopyTitle_`
- **Mobile Detection**: Checks user agent and viewport width for responsive toast positioning
- **Clipboard**: Uses `navigator.clipboard` API with fallback to `document.execCommand`

## Deployment

GitHub Actions workflow (`.github/workflows/node.js.yml`) builds and deploys to GitHub Pages on pushes to the `copy-title` branch. The `updateURL` and `downloadURL` in `src/metadata.json` point to the GitHub Pages URL for auto-updating.

## Code Style

- **ESLint**: @sxzz/eslint-config with Prettier integration
- **Prettier**: No semicolons, single quotes, trailing commas, 100 char width
- Environment expects jQuery (`$`) and `GM_*` userscript APIs available at runtime
