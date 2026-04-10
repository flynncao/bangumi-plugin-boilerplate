export function createSelect(
  { id, className, options, value, onChange, disabled = false },
  userSettings = {},
) {
  // Create the select element
  const selectEl = document.createElement('select')
  selectEl.id = id
  selectEl.className = className
  selectEl.disabled = disabled

  // Create option elements
  options.forEach((option) => {
    const optionEl = document.createElement('option')
    optionEl.value = option.value
    optionEl.textContent = option.label
    if (option.value === value) {
      optionEl.selected = true
    }
    selectEl.append(optionEl)
  })

  // Add change event listener
  if (onChange) {
    selectEl.addEventListener('change', onChange)
  }

  return selectEl
}
