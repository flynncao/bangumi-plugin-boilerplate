import { createButton } from './components/layouts/button'
import { createMovableController } from './components/layouts/controller'
import { createSelect } from './components/layouts/select'
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
    titleCode: 'main',
    showText: true,
  })

  const userSettings = {
    titleCode: Storage.get('titleCode') || false,
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

  const controller = createMovableController()

  controller.append(
    createButton(
      {
        id: 'bct-copy-title',
        text: '复制',
        icon: Icons.copy,
        className: 'bct-button bct-control',
        onClick: () => {
          const titleMapping = {
            main: {
              label: '主标题',
              method: () => {
                return $('h1.nameSingle').find('a').text().trim()
              },
            },
            zh: {
              label: '中文名',
              method: () => {
                const wrapper = $('#bangumiInfo .infobox_container #infobox li').eq(0)
                return $(wrapper.contents()[1]).text()
              },
            },
            romaji: {
              label: '罗马音',
              method: () => {
                const wrapper = $('#bangumiInfo .infobox_container #infobox li').eq(1)
                return $(wrapper.contents()[1]).text()
              },
            },
          }

          const title = titleMapping[userSettings.titleCode]
            ? titleMapping[userSettings.titleCode].method()
            : titleMapping.main.method()

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
            title: `已复制${userSettings.titleCode ? titleMapping[userSettings.titleCode].label : '主标题'}到剪切板！`,
            location: 'top-center',
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

  controller.append(
    createSelect({
      id: 'bct-title-language',
      options: [
        { value: 'main', label: '主标题' },
        { value: 'zh', label: '中文名' },
        { value: 'romaji', label: '罗马音' },
      ],
      className: 'bct-select bct-control',
      onChange: (e) => {
        const selectedValue = e.target.value
        userSettings.titleCode = selectedValue
        Storage.set('titleCode', userSettings.titleCode)
      },
      selectedValue: userSettings.titleCode || 'main',
    }),
  )

  $('body').append(controller)
})()
