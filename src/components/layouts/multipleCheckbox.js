export function createMultipleCheckbox(
  { id, className, options, values = [], onChange, disabled = false },
  userSettings = {},
) {
  // Create the container
  const containerEl = document.createElement('div')
  containerEl.id = id
  containerEl.className = className

  // Track selected values
  const selectedValues = new Set(values)

  // Create checkbox options
  options.forEach((option) => {
    const labelEl = document.createElement('label')
    labelEl.className = 'bct-multiple-checkbox-label'

    const inputEl = document.createElement('input')
    inputEl.type = 'checkbox'
    inputEl.value = option.value
    inputEl.checked = selectedValues.has(option.value)
    inputEl.disabled = disabled

    const checkmarkEl = document.createElement('span')
    checkmarkEl.className = 'bct-multiple-checkmark'

    const textSpan = document.createElement('span')
    textSpan.textContent = option.label

    labelEl.append(inputEl)
    labelEl.append(checkmarkEl)
    labelEl.append(textSpan)

    // Add change event listener
    inputEl.addEventListener('change', (e) => {
      if (e.target.checked) {
        selectedValues.add(option.value)
      } else {
        selectedValues.delete(option.value)
      }

      if (onChange) {
        onChange(Array.from(selectedValues), e)
      }
    })

    containerEl.append(labelEl)
  })

  return containerEl
}
