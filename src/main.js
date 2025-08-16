import { createButton } from './components/layouts/button'
import { createCheckbox } from './components/layouts/checkbox'
import { BGM_SUBJECT_REGEX } from './constants/index'
import butterupStyles from './static/css/butterup.css'
import styles from './static/css/styles.css'
import butterup from './static/js/butterup'
import Icons from './static/svg/index'
import Storage from './storage/index'
;(async function () {
  // Validate if the current page is a Bangumi subject page
  if (!BGM_SUBJECT_REGEX.test(location.href)) {
    return
  }

  // Storage
  Storage.init({
    copyJapaneseTitle: false,
    showText: true,
  })

  const userSettings = {
    copyJapaneseTitle: Storage.get('copyJapaneseTitle') || false,
    showText: Storage.get('showText') || true,
  }

  // Layout and Events
  const injectStyles = () => {
    const styleEl = document.createElement('style')
    styleEl.textContent = styles
    document.head.append(styleEl)
    const butterupStyleEl = document.createElement('style')
    butterupStyleEl.textContent = butterupStyles
    document.head.append(butterupStyleEl)
  }
  injectStyles()
  // Render a toast notification in the top-right corner of the screen
  console.log('butterup', butterup)

  $('h1.nameSingle').append(
    createButton(
      {
        id: 'bct-copy-title',
        text: '复制',
        icon: Icons.copy,
        className: 'bct-button',
        onClick: () => {
          const title = userSettings.copyJapaneseTitle
            ? $('h1.nameSingle').find('a').text().trim()
            : $('h1.nameSingle').find('a').attr('title')

          try {
            navigator.clipboard.writeText(title)
          } catch (error) {
            console.error('Failed to copy text:', error)
            // Fallback for browsers that do not support the Clipboard API
            const textArea = document.createElement('textarea')
            textArea.value = title
            textArea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
            document.body.append(textArea)
            textArea.focus()
            textArea.select()
            document.execCommand('copy')
            textArea.remove()
          }

          butterup.toast({
            title: `已复制${userSettings.copyJapaneseTitle ? '日文名' : '中文名'}到剪切板！`,
            location: 'top-right',
            dismissable: false,
            type: 'success',
            duration: 2500,
            icon: true,
          })
        },
      },
      userSettings,
    ),
  )

  $('h1.nameSingle').append(
    createCheckbox(
      {
        id: 'bct-hide-plain-comments',
        label: '日文名',
        className: 'bct-checkbox',
        onChange: (e) => {
          userSettings.copyJapaneseTitle = e.target.checked
          Storage.set('copyJapaneseTitle', userSettings.copyJapaneseTitle)
        },
        checked: userSettings.copyJapaneseTitle,
        disabled: false,
      },
      userSettings,
    ),
  )
})()
