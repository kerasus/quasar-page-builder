import { boot } from 'quasar/wrappers'
// import VuePlugin from 'quasar-ui-q-page-builder'
import VuePlugin from 'ui'
// import QPageBuilder from '~quasar-ui-q-page-builder/src/components/QPageBuilder.vue'
import widgetList from '../components/Widgets/widget.json'

// const widgets = VuePlugin.extractWidgets(widgetList)

export default boot(async function ({ app }) {
  const widgetExpanded = VuePlugin.install(app, widgetList)

  async function registerWidgets (widgetsList) {
    const components = {}
    const optionPanels = {}
    const widgetsListLength = widgetsList.length
    for (let i = 0; i < widgetsListLength; i++) {
      const element = widgetsList[i]
      const widgetComponentName = element.name
      const widgetComponentPath = element.path + '/' + widgetComponentName
      const widgetOptionPanelPath = element.path + '/' + 'OptionPanel'
      const widgetComponentPathInArray = widgetComponentPath.split('/')

      if (widgetComponentPathInArray[widgetComponentPathInArray.length - 1] !== widgetComponentPathInArray[widgetComponentPathInArray.length - 2]) {
        continue
      }
      // :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :(
      // https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
      if (widgetComponentPathInArray.length === 1) {
        components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}.vue`)).default
      }
      if (widgetComponentPathInArray.length === 2) {
        components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}.vue`)).default
      }
      if (widgetComponentPathInArray.length === 3) {
        components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}.vue`)).default
      }
      if (widgetComponentPathInArray.length === 4) {
        components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}.vue`)).default
      }
      if (widgetComponentPathInArray.length === 5) {
        components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}/${widgetComponentPathInArray[4]}.vue`)).default
      }
      if (widgetComponentPathInArray.length === 6) {
        components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}/${widgetComponentPathInArray[4]}/${widgetComponentPathInArray[5]}.vue`)).default
      }
      // https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
      // :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :(

      if (element.optionPanel) {
        optionPanels[widgetComponentName] = {
          name: widgetComponentName,
          tagName: widgetComponentName[0].toLowerCase() + widgetComponentName.slice(1, widgetComponentName.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`),
          path: '../' + widgetOptionPanelPath + '.vue'
        }
      }
    }

    app.config.globalProperties.$q.$pageBuilderWidgetComponents = components
    app.config.globalProperties.$q.$pageBuilderWidgetOptionPanels = optionPanels
  }

  await registerWidgets(widgetExpanded)

  // app.config.globalProperties.$q.$QPageBuilderWidgetList = widgetExpanded
  // // app.component('q-page-builder', QPageBuilder)
  // async function registerWidgets (widgetsList) {
  //   const components = {}
  //   const optionPanels = {}
  //   const widgetsListLength = widgetsList.length
  //   for (let i = 0; i < widgetsListLength; i++) {
  //     const element = widgetsList[i]
  //     const widgetComponentName = element.name
  //     const widgetComponentPath = element.path + '/' + widgetComponentName
  //     const widgetOptionPanelPath = element.path + '/' + 'OptionPanel'
  //     const widgetComponentPathInArray = widgetComponentPath.split('/')
  //
  //     if (widgetComponentPathInArray[widgetComponentPathInArray.length - 1] !== widgetComponentPathInArray[widgetComponentPathInArray.length - 2]) {
  //       continue
  //     }
  //     // :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :(
  //     // https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
  //     if (widgetComponentPathInArray.length === 1) {
  //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}.vue`)).default
  //     }
  //     if (widgetComponentPathInArray.length === 2) {
  //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}.vue`)).default
  //     }
  //     if (widgetComponentPathInArray.length === 3) {
  //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}.vue`)).default
  //     }
  //     if (widgetComponentPathInArray.length === 4) {
  //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}.vue`)).default
  //     }
  //     if (widgetComponentPathInArray.length === 5) {
  //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}/${widgetComponentPathInArray[4]}.vue`)).default
  //     }
  //     if (widgetComponentPathInArray.length === 6) {
  //       components[widgetComponentName] = (await import(`../${widgetComponentPathInArray[0]}/${widgetComponentPathInArray[1]}/${widgetComponentPathInArray[2]}/${widgetComponentPathInArray[3]}/${widgetComponentPathInArray[4]}/${widgetComponentPathInArray[5]}.vue`)).default
  //     }
  //     // https://github.com/vitejs/vite/issues/4945#issuecomment-951770052
  //     // :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :(
  //
  //     if (element.optionPanel) {
  //       optionPanels[widgetComponentName] = {
  //         name: widgetComponentName,
  //         tagName: widgetComponentName[0].toLowerCase() + widgetComponentName.slice(1, widgetComponentName.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`),
  //         path: '../' + widgetOptionPanelPath + '.vue'
  //       }
  //     }
  //   }
  //
  //   app.config.globalProperties.$q.$pageBuilderWidgetComponents = components
  //   app.config.globalProperties.$q.$pageBuilderWidgetOptionPanels = optionPanels
  // }
  //
  // await registerWidgets(widgetExpanded)
})
