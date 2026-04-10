export function createRadio(
  { id, className, name, options, value, onChange, disabled = false },
  userSettings = {},
) {
  // Create the radio group container
  const containerEl = document.createElement('div')
  containerEl.id = id
  containerEl.className = className

  // Create radio options
  options.forEach((option) => {
    const labelEl = document.createElement('label')
    labelEl.className = 'bct-radio-label'

    const inputEl = document.createElement('input')
    inputEl.type = 'radio'
    inputEl.name = name
    inputEl.value = option.value
    inputEl.checked = option.value === value
    inputEl.disabled = disabled

    const checkmarkEl = document.createElement('span')
    checkmarkEl.className = 'bct-radio-checkmark'

    const textSpan = document.createElement('span')
    textSpan.textContent = option.label

    labelEl.append(inputEl)
    labelEl.append(checkmarkEl)
    labelEl.append(textSpan)

    // Add change event listener
    if (onChange) {
      inputEl.addEventListener('change', onChange)
    }

    containerEl.append(labelEl)
  })

  return containerEl
}
