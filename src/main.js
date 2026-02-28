import { createButton } from './components/layouts/button'
import { createMovableController } from './components/layouts/controller'
import { createSelect } from './components/layouts/select'
import { BGM_CHARACTER_REGEX, BGM_PERSON_REGEX, BGM_SUBJECT_REGEX } from './constants/index'
import butterupStyles from './static/css/butterup.css'
import styles from './static/css/styles.css'
import butterup from './static/js/butterup'
import Icons from './static/svg/index'
import Storage from './storage/index'
;(async function () {
  // Validate if the current page is a Bangumi subject page
  const isValidPage =
    BGM_SUBJECT_REGEX.test(location.href) ||
    BGM_CHARACTER_REGEX.test(location.href) ||
    BGM_PERSON_REGEX.test(location.href)
  if (!isValidPage) {
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

  console.log('navigator.userAgent', navigator.userAgent)
  const IS_MOBILE = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768

  // Hooks
  let controllerOffsetLeft = 0
  const CONTROLLER_ELEMENTS_GAP = 10
  const onDOMReady = () => {
    const title = document.querySelector('h1.nameSingle>a')
    if (title) {
      // get the width of the title element
      const elements = document.querySelectorAll('h1.nameSingle > *')
      let totalWidth = 0
      elements.forEach((el) => {
        totalWidth += el.getBoundingClientRect().width
      })
      controllerOffsetLeft = totalWidth
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDOMReady)
  } else {
    onDOMReady()
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
                const wrapper = $('#bangumiInfo .infobox_container #infobox li').has(
                  '.tip:contains("中文名")',
                )
                return $(wrapper.contents()[1]).text().trim()
              },
            },
            romaji: {
              label: '罗马音',
              method: () => {
                const wrapper = $('#bangumiInfo .infobox_container #infobox li').has(
                  '.tip:contains("罗马名"), .tip:contains("罗马字")',
                )
                return $(wrapper.contents()[1]).text().trim()
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

          // if text is empty or only contains whitespace, show error toast
          if (!title || /^\s*$/.test(title)) {
            butterup.toast({
              title: '未找到可复制的标题！',
              message: '请确保页面上有标题信息，或已安装对应的插件。',
              location: IS_MOBILE ? 'top-center' : 'top-right',
              dismissable: false,
              type: 'error',
              duration: 2500,
              icon: true,
            })
          } else {
            butterup.toast({
              title: `已复制${userSettings.titleCode ? titleMapping[userSettings.titleCode].label : '主标题'}到剪切板！`,
              location: IS_MOBILE ? 'top-center' : 'top-right',
              dismissable: false,
              type: 'success',
              duration: 2500,
              icon: true,
            })
          }
        },
      },
      userSettings,
    ),
  )

  let controllerOriginLeft = 0,
    controllerOriginTop = 0
  if ($('div#headerNeue2').length > 0) {
    controllerOriginTop += $('div#headerNeue2').outerHeight(true) || 53
  }
  $('h1.nameSingle').each(function () {
    const style = getComputedStyle(this)
    controllerOriginLeft += Number.parseFloat(style.paddingLeft) || 0
    controllerOriginLeft += Number.parseFloat(style.marginLeft) || 0
    controllerOriginTop += (Number.parseFloat(style.marginTop) || 0) / 2
  })
  if (controllerOffsetLeft > 0) {
    controllerOriginLeft = controllerOriginLeft + controllerOffsetLeft + CONTROLLER_ELEMENTS_GAP
  }

  if (window.innerWidth <= 768) {
    controller.style.right = `${CONTROLLER_ELEMENTS_GAP}px`
    const val = `${($('div#headerNeue2').outerHeight(true) || 50) + ($('h1.nameSingle').outerHeight(true) || 46) + ($('div.subjectNav').outerHeight(true) || 39) + 5}px`
    controller.style.top = val
  } else {
    controller.style.left = `${controllerOriginLeft}px`
    controller.style.top = `${controllerOriginTop}px`
  }

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
