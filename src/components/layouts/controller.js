export const createMovableController = () => {
  // Create a dedicated drag handle/header
  const dragHandle = document.createElement('div')
  dragHandle.className = 'bangumi-copy-title-flow-header'

  // Create the main container
  const container = document.createElement('div')
  container.className = 'bangumi-copy-title-flow'

  // Add the drag handle to the container
  container.append(dragHandle)

  // Only attach drag events to the handle
  dragHandle.addEventListener('mousedown', (event) => {
    event.preventDefault()

    const parentContainer = container

    // Store initial positions
    const startX = event.clientX
    const startY = event.clientY
    const startLeft = Number.parseInt(window.getComputedStyle(parentContainer).left) || 0
    const startTop = Number.parseInt(window.getComputedStyle(parentContainer).top) || 0

    // When we start dragging, remove the centering transform
    if (parentContainer.style.transform.includes('translate')) {
      const rect = parentContainer.getBoundingClientRect()
      parentContainer.style.transform = 'none'
      parentContainer.style.left = `${rect.left}px`
      parentContainer.style.top = `${rect.top}px`
    }

    const handleMouseMove = (event) => {
      const deltaX = event.clientX - startX
      const deltaY = event.clientY - startY

      const newLeft = startLeft + deltaX
      const newTop = startTop + deltaY

      const containerWidth = parentContainer.offsetWidth
      const containerHeight = parentContainer.offsetHeight

      if (
        newLeft < containerWidth / 2 ||
        newTop < containerHeight / 2 ||
        newLeft + containerWidth / 2 > window.innerWidth ||
        newTop + containerHeight / 2 > window.innerHeight
      ) {
        return
      }

      parentContainer.style.left = `${newLeft}px`
      parentContainer.style.top = `${newTop}px`
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  })

  return container
}
