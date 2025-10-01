export function createButton(
  { id, text, icon, className, onClick, disabled = false },
  userSettings = {},
) {
  // Create button with base class
  const button = $('<strong></strong>').html(icon).addClass(className)[0]

  button.id = id

  if (
    Object.prototype.hasOwnProperty.call(userSettings, 'showText') &&
    userSettings.showText === true
  ) {
    const span = document.createElement('span')
    if (text) {
      const textNode = document.createTextNode(text)
      span.append(textNode)
    }
    button.append(span)
  }

  button.addEventListener('click', onClick)
  button.disabled = disabled

  return button
}
