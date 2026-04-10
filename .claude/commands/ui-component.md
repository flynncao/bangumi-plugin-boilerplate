---
description: Create a UI component in `src/components/layouts`
argument-hint: Component name | Component description
---

## Task

Create a new UI component for the Bangumi userscript following the established patterns in the codebase.

## Context

Parse $ARGUMENTS to get the following values:

- [name]: Component name from $ARGUMENTS, converted to PascalCase
- [description]: Component description from $ARGUMENTS.

## Component Structure

Create the component file at `src/components/layouts/{componentName}.js`, insert one line of comment at the beginning of the js file with [description]:

```javascript
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

## Guidelines

### Element Creation

- **Use native browser APIs** (`document.createElement`, `element.addEventListener`) over jQuery for element creation
- Only use jQuery (`$`) for DOM insertion/appending in `main.js`, not inside component files

### Props Pattern (follow `button.js` and `checkbox.js`)

- First parameter: component options object with `id`, `className`, event handlers, and component-specific props
- Second parameter: `userSettings = {}` for accessing user preferences (e.g., `showText`)

### Styling

- **Always add styles to `src/static/css/styles.css`** instead of inline styles in JS
- Use the `bct-` prefix for all CSS classes (e.g., `bct-button`, `bct-checkbox`)
- Support dark mode with `[data-theme="dark"]` selector

### Icons

- If the component needs icons, import from `src/static/svg/index.js`
- Icons are SVG strings; use `$(element).html(icon)` to set them

### Usage in main.js

Components are instantiated in `src/main.js` and appended to the DOM:

```javascript
import { createMyComponent } from './components/layouts/myComponent'

$('h1.nameSingle').append(
  createMyComponent(
    {
      id: 'bct-my-component',
      className: 'bct-my-component',
      onClick: () => {
        /* ... */
      },
      // ... other props
    },
    userSettings,
  ),
)
```

## CSS Pattern in styles.css

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
- **Styling**: `src/static/css/styles.css` - all component styles with dark mode support
- **Integration**: `src/main.js` - how components are imported, configured, and appended
