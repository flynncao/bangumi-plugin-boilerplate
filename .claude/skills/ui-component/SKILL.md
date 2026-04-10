---
name: ui-component
description: Create a UI component in `src/components/layouts`. Use when the user types "/ui-component" or asks to create a new UI component for the Bangumi userscript. Generates component files following the established patterns with proper structure, props, and styling guidelines.
---

# UI Component Generator

## Overview

This skill creates new UI components for the Bangumi userscript following the established codebase patterns.

## Workflow

When the user invokes `/ui-component` or asks to create a component:

### Step 1: Gather Information

Ask the user for:

1. **Component name** (e.g., "radio", "textLink", "toggle") - will be converted to PascalCase for the function name
2. **Brief description** of what the component does

### Step 2: Generate Component File

Create the component at `src/components/layouts/{componentName}.js` with the following structure:

```javascript
// {description}
export function create{PascalCaseName}(
  { id, className, onClick, disabled = false, ...componentSpecificProps },
  userSettings = {},
) {
  // Create the root element using native browser APIs
  const element = document.createElement('div')
  element.id = id
  element.className = className

  // Add event listeners
  if (onClick) {
    element.addEventListener('click', onClick)
  }

  if (disabled) {
    element.disabled = true
  }

  return element
}
```

### Step 3: Provide Guidelines

After creating the component, remind the user of these guidelines:

#### Element Creation

- **Use native browser APIs** (`document.createElement`, `element.addEventListener`) over jQuery for element creation
- Only use jQuery (`$`) for DOM insertion/appending in `main.js`, not inside component files

#### Props Pattern

- First parameter: component options object with `id`, `className`, event handlers, and component-specific props
- Second parameter: `userSettings = {}` for accessing user preferences (e.g., `showText`)

#### Styling

- **Always add styles to `src/static/css/styles.css`** instead of inline styles in JS
- Use the `bct-` prefix for all CSS classes (e.g., `bct-button`, `bct-checkbox`)
- Support dark mode with `[data-theme="dark"]` selector

#### Icons

- If the component needs icons, import from `src/static/svg/index.js`
- Icons are SVG strings; use `$(element).html(icon)` to set them

#### Usage in main.js

Components are instantiated in `src/main.js` and appended to the DOM:

```javascript
import { create{PascalCaseName} } from './components/layouts/{componentName}'

$('h1.nameSingle').append(
  create{PascalCaseName}(
    {
      id: 'bct-{kebab-case-name}',
      className: 'bct-{kebab-case-name}',
      onClick: () => { /* ... */ },
      // ... other props
    },
    userSettings,
  ),
)
```

### Step 4: CSS Reminder

Remind the user to add corresponding CSS to `src/static/css/styles.css`:

```css
.bct-{component} {
  /* Base styles */
}

[data-theme="dark"] .bct-{component} {
  /* Dark mode styles */
}

.bct-{component}:hover {
  /* Hover states */
}
```

## Reference Examples

- **Button**: `src/components/layouts/button.js` - icon + optional text, click handler
- **Checkbox**: `src/components/layouts/checkbox.js` - input element with label, change handler
- **Select**: `src/components/layouts/select.js` - dropdown with options
- **Styling**: `src/static/css/styles.css` - all component styles with dark mode support
- **Integration**: `src/main.js` - how components are imported, configured, and appended
