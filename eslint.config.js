// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  // TypeScript and Vue are autodetected, you can also explicitly enable them:
  typescript: true,
  vue: true,
  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
}, {
  rules: {
    'node/prefer-global/process': 'off',
  },
})
