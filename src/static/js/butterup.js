// Forked from https://github.com/dgtlss/butterup
const butterup = {
  options: {
    maxToasts: 5, // Max number of toasts that can be on the screen at once
    toastLife: 5000, // How long a toast will stay on the screen before fading away
    currentToasts: 0, // Current number of toasts on the screen
  },
  toast({
    title,
    message,
    type,
    location,
    icon,
    theme,
    customIcon,
    dismissable,
    onClick,
    onRender,
    onTimeout,
    customHTML,
    primaryButton,
    secondaryButton,
    maxToasts,
    duration,
  }) {
    /* Check if the toaster exists. If it doesn't, create it. If it does, check if there are too many toasts on the screen.
			If there are too many, delete the oldest one and create a new one. If there aren't too many, create a new one. */
    if (document.querySelector('#toaster') == null) {
      // toaster doesn't exist, create it
      const toaster = document.createElement('div')
      toaster.id = 'toaster'
      if (location == null) {
        toaster.className = 'toaster top-right'
      } else {
        toaster.className = `toaster ${location}`
      }

      // Create the toasting rack inside of the toaster
      document.body.append(toaster)

      // Create the toasting rack inside of the toaster
      if (document.querySelector('#butterupRack') == null) {
        const rack = document.createElement('ol')
        rack.id = 'butterupRack'
        rack.className = 'rack'
        toaster.append(rack)
      }
    } else {
      const toaster = document.querySelector('#toaster')
      // check what location the toaster is in
      toaster.classList.forEach(function (item) {
        // remove any location classes from the toaster
        if (
          item.includes('top-right') ||
          item.includes('top-center') ||
          item.includes('top-left') ||
          item.includes('bottom-right') ||
          item.includes('bottom-center') ||
          item.includes('bottom-left')
        ) {
          toaster.classList.remove(item)
        }
      })
      if (location == null) {
        toaster.className = 'toaster top-right'
      } else {
        toaster.className = `toaster ${location}`
      }
      const rack = document.querySelector('#butterupRack')
    }
    // Load Custom Options
    if (maxToasts != null) {
      butterup.options.maxToasts = maxToasts
    }
    if (duration != null) {
      butterup.options.toastLife = duration
    }
    // Check if there are too many toasts on the screen
    if (butterup.options.currentToasts >= butterup.options.maxToasts) {
      // there are too many toasts on the screen, delete the oldest one
      var oldestToast = document.querySelector('#butterupRack').firstChild
      document.querySelector('#butterupRack').removeChild(oldestToast)
      butterup.options.currentToasts--
    }

    // Create the toast
    const toast = document.createElement('li')
    butterup.options.currentToasts++
    toast.className = 'butteruptoast'
    // Add entrance animation class
    toast.className += ' toast-enter'
    // if the toast class contains a top or bottom location, add the appropriate class to the toast
    if (
      toaster.className.includes('top-right') ||
      toaster.className.includes('top-center') ||
      toaster.className.includes('top-left')
    ) {
      toast.className += ' toastDown'
    }
    if (
      toaster.className.includes('bottom-right') ||
      toaster.className.includes('bottom-center') ||
      toaster.className.includes('bottom-left')
    ) {
      toast.className += ' toastUp'
    }
    toast.id = `butterupToast-${butterup.options.currentToasts}`
    if (type != null) {
      toast.className += ` ${type}`
    }

    if (theme != null) {
      toast.className += ` ${theme}`
    }

    // Add the toast to the rack
    document.querySelector('#butterupRack').append(toast)

    // check if the user wants an icon
    if (icon != null && icon == true) {
      // add a div inside the toast with a class of icon
      const toastIcon = document.createElement('div')
      toastIcon.className = 'icon'
      toast.append(toastIcon)
      // check if the user has added a custom icon
      if (customIcon) {
        toastIcon.innerHTML = customIcon
      }
      if (type != null && customIcon == null) {
        // add the type class to the toast
        toast.className += ` ${type}`
        if (type == 'success') {
          toastIcon.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' +
            '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />' +
            '</svg>'
        }
        if (type == 'error') {
          toastIcon.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' +
            '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />' +
            '</svg>'
        }
        if (type == 'warning') {
          toastIcon.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' +
            '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />' +
            '</svg>'
        }
        if (type == 'info') {
          toastIcon.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' +
            '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />' +
            '</svg>'
        }
      }
    }

    // add a div inside the toast with a class of notif
    const toastNotif = document.createElement('div')
    toastNotif.className = 'notif'
    toast.append(toastNotif)

    // add a div inside of notif with a class of desc
    const toastDesc = document.createElement('div')
    toastDesc.className = 'desc'
    toastNotif.append(toastDesc)

    // check if the user added a title
    if (title != null) {
      const toastTitle = document.createElement('div')
      toastTitle.className = 'title'
      toastTitle.innerHTML = title
      toastDesc.append(toastTitle)
    }

    if (customHTML != null) {
      const toastHTML = document.createElement('div')
      toastHTML.className = 'message'
      toastHTML.innerHTML = customHTML
      toastDesc.append(toastHTML)
    }

    // check if the user added a message
    if (message != null) {
      const toastMessage = document.createElement('div')
      toastMessage.className = 'message'
      toastMessage.innerHTML = message
      toastDesc.append(toastMessage)
    }

    // Add buttons if specified
    if (primaryButton || secondaryButton) {
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'toast-buttons'
      toastNotif.append(buttonContainer)

      if (primaryButton) {
        const primaryBtn = document.createElement('button')
        primaryBtn.className = 'toast-button primary'
        primaryBtn.textContent = primaryButton.text
        primaryBtn.addEventListener('click', function (event) {
          event.stopPropagation()
          primaryButton.onClick(event)
        })
        buttonContainer.append(primaryBtn)
      }

      if (secondaryButton) {
        const secondaryBtn = document.createElement('button')
        secondaryBtn.className = 'toast-button secondary'
        secondaryBtn.textContent = secondaryButton.text
        secondaryBtn.addEventListener('click', function (event) {
          event.stopPropagation()
          secondaryButton.onClick(event)
        })
        buttonContainer.append(secondaryBtn)
      }
    }

    // Check if the user has mapped any custom click functions
    if (onClick && typeof onClick === 'function') {
      toast.addEventListener('click', function (event) {
        // Prevent the click event from triggering dismissal if the toast is dismissable
        event.stopPropagation()
        onClick(event)
      })
    }

    // Call onRender callback if provided
    if (onRender && typeof onRender === 'function') {
      onRender(toast)
    }

    if (dismissable != null && dismissable == true) {
      // Add a class to the toast to make it dismissable
      toast.className += ' dismissable'
      // when the item is clicked on, remove it from the DOM
      toast.addEventListener('click', function () {
        butterup.despawnToast(toast.id)
      })
    }

    // Remove the entrance animation class after the animation has finished
    setTimeout(function () {
      toast.classList.remove('toast-enter')
    }, 300) // Adjust timing as needed

    // despawn the toast after the specified time
    setTimeout(function () {
      if (onTimeout && typeof onTimeout === 'function') {
        onTimeout(toast)
      }
      butterup.despawnToast(toast.id)
    }, butterup.options.toastLife)
  },
  despawnToast(toastId, onClosed) {
    var toast = document.getElementById(toastId)
    if (toast != null) {
      toast.classList.add('toast-exit')
      setTimeout(function () {
        try {
          toast.remove()
          butterup.options.currentToasts--
          if (onClosed && typeof onClosed === 'function') {
            onClosed(toast)
          }
        } catch {
          // do nothing
        }
        // if this was the last toast on the screen, remove the toaster
        if (butterup.options.currentToasts == 0) {
          var toaster = document.querySelector('#toaster')
          toaster.remove()
        }
      }, 300) // Adjust timing to match your CSS animation duration
    }
  },
  promise({ promise, loadingMessage, successMessage, errorMessage, location, theme }) {
    const toastId = `butterupToast-${butterup.options.currentToasts + 1}`

    // Create initial loading toast
    this.toast({
      message: loadingMessage || 'Loading...',
      location,
      theme,
      icon: true,
      customIcon:
        '<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>',
      dismissable: false,
    })

    // Update toast based on promise outcome
    return promise.then(
      (result) => {
        this.updatePromiseToast(toastId, {
          type: 'success',
          message: successMessage || 'Operation successful',
          icon: true,
        })
        return result
      },
      (error) => {
        this.updatePromiseToast(toastId, {
          type: 'error',
          message: errorMessage || 'An error occurred',
          icon: true,
        })
        throw error
      },
    )
  },
  updatePromiseToast(toastId, { type, message, icon }) {
    const toast = document.getElementById(toastId)
    if (toast) {
      toast.className = toast.className.replaceAll(/success|error|warning|info/g, '')
      toast.classList.add(type)

      const messageEl = toast.querySelector('.message')
      if (messageEl) {
        messageEl.textContent = message
      }

      const iconEl = toast.querySelector('.icon')
      if (iconEl && icon) {
        iconEl.innerHTML = this.getIconForType(type)
      }

      // Reset the toast lifetime
      clearTimeout(toast.timeoutId)
      toast.timeoutId = setTimeout(() => {
        this.despawnToast(toastId)
      }, this.options.toastLife)
    }
  },
  getIconForType(type) {
    switch (type) {
      case 'success':
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>'
      case 'error':
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg>'
      case 'warning':
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>'
      case 'info':
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" /></svg>'
      default:
        return ''
    }
  },
}

export default butterup
