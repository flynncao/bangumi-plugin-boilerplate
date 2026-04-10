import { createButton } from './components/layouts/button'
import { createCheckbox } from './components/layouts/checkbox'
import { createTextLink } from './components/layouts/textLink'
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
    copyFormat: 'chinese', // 'chinese' | 'japanese' | 'romaji'
    copyMode: 'simple', // 'simple' | 'concatenation'
    selectedFields: ['title', 'year'], // array of selected fields
  })

  const userSettings = {
    copyJapaneseTitle: Storage.get('copyJapaneseTitle') || false,
    showText: Storage.get('showText') || true,
    copyFormat: Storage.get('copyFormat') || 'chinese',
    copyMode: Storage.get('copyMode') || 'simple',
    selectedFields: Storage.get('selectedFields') || ['title', 'year'],
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

  const container = document.createElement('div')
  $('h1.nameSingle').append(container)
  container.style.display = 'inline-flex'
  container.style.alignItems = 'center'
  container.style.gap = '8px'

  container.append(
    createButton(
      {
        id: 'bct-copy-title',
        text: '复制',
        icon: Icons.copy,
        className: 'bct-button transform-y-4',
        onClick: () => {
          const title = userSettings.copyJapaneseTitle
            ? $('h1.nameSingle').find('a').text().trim()
            : $('h1.nameSingle').find('a').attr('title')
          navigator.clipboard.writeText(title)

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

  container.append(
    createCheckbox(
      {
        id: 'bct-hide-plain-comments',
        label: '日文名',
        className: 'bct-checkbox transform-y-4',
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

  container.append(
    createTextLink(
      {
        id: 'bct-help-link',
        className: 'bct-text-link transform-y-4',
        text: '反馈',
        href: 'https://github.com/flynncao/bangumi-plugin-boilerplate/issues',
        onClick: () => {
          console.log('Help link clicked')
        },
      },
      userSettings,
    ),
  )
})()
