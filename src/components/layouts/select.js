export function createSelect(
  { id, options, className, onChange, selectedValue, disabled = false },
  userSettings = {},
) {
  // Create the select element
  const selectEl = document.createElement('select')
  selectEl.id = id
  selectEl.className = className

  // Populate the select with options
  options.forEach((option) => {
    const optionEl = document.createElement('option')
    optionEl.value = option.value
    optionEl.textContent = option.label
    if (option.value === selectedValue) {
      optionEl.selected = true
    }
    selectEl.append(optionEl)
  })

  // Add event listener for change
  selectEl.addEventListener('change', onChange)
  selectEl.disabled = disabled

  // If userSettings has showText, append a text node
  if (
    Object.prototype.hasOwnProperty.call(userSettings, 'showText') &&
    userSettings.showText === true
  ) {
    const textNode = document.createTextNode(' 选择')
    const span = document.createElement('span')
    span.append(textNode)
    selectEl.append(span)
  }

  return selectEl
}
