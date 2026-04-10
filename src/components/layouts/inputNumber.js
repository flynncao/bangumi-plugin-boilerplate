// Number input with increment/decrement buttons
export function createInputNumber(
  { id, className, value = 0, min, max, step = 1, onChange, disabled = false },
  userSettings = {},
) {
  // Create container
  const container = document.createElement('div')
  container.className = 'bct-input-number'
  if (className) {
    container.classList.add(className)
  }

  // Create decrement button
  const decBtn = document.createElement('button')
  decBtn.type = 'button'
  decBtn.className = 'bct-input-number-btn bct-input-number-dec'
  decBtn.textContent = '−'
  decBtn.disabled = disabled

  // Create input element
  const input = document.createElement('input')
  input.type = 'number'
  input.id = id
  input.className = 'bct-input-number-field'
  input.value = value
  if (min !== undefined) input.min = min
  if (max !== undefined) input.max = max
  input.step = step
  input.disabled = disabled

  // Create increment button
  const incBtn = document.createElement('button')
  incBtn.type = 'button'
  incBtn.className = 'bct-input-number-btn bct-input-number-inc'
  incBtn.textContent = '+'
  incBtn.disabled = disabled

  // Helper to get numeric value
  const getNumericValue = () => {
    const val = Number.parseFloat(input.value)
    return Number.isNaN(val) ? 0 : val
  }

  // Helper to clamp value
  const clampValue = (val) => {
    if (min !== undefined && val < min) return min
    if (max !== undefined && val > max) return max
    return val
  }

  // Helper to update value
  const updateValue = (newVal) => {
    const clamped = clampValue(newVal)
    input.value = clamped
    if (onChange) {
      onChange(clamped)
    }
  }

  // Decrement handler
  decBtn.addEventListener('click', () => {
    updateValue(getNumericValue() - step)
  })

  // Increment handler
  incBtn.addEventListener('click', () => {
    updateValue(getNumericValue() + step)
  })

  // Input change handler
  input.addEventListener('change', () => {
    updateValue(getNumericValue())
  })

  // Assemble
  container.append(decBtn, input, incBtn)

  return container
}
