// A clickable text with custom color and link.
export function createTextLink(
  { id, className, text, href, target = '_self', onClick, disabled = false },
  userSettings = {},
) {
  // Create the anchor element
  const linkEl = document.createElement('a')
  linkEl.id = id
  linkEl.className = className
  linkEl.textContent = text
  linkEl.href = href || '#'
  linkEl.target = target

  // Add click event listener
  if (onClick) {
    linkEl.addEventListener('click', (e) => {
      if (href === '#' || !href) {
        e.preventDefault()
      }
      onClick(e)
    })
  }

  if (disabled) {
    linkEl.classList.add('disabled')
    linkEl.style.pointerEvents = 'none'
  }

  return linkEl
}
