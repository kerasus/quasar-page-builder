import pkg from '../package.json'
import mixinWidget from './mixin/Widgets.js'
import mixinOptionPanel from './mixin/OptionPanel.js'
import QPageBuilder from './components/QPageBuilder.vue'
import extractWidgets from './assets/extract.widgets.js'
import OptionPanelTabs from './components/OptionPanelComponents/OptionPanelTabs.vue'
import widgetList from "../dev/src/components/Widgets/widget.json";

const { version } = pkg

const install = (app, widgetList) => {
  const widgets = []
  function extractWidgets (json) {
    json.children.forEach(element => {
      if (element.type === 'widget') {
        widgets.push(element)
      } else {
        // eslint-disable-next-line no-prototype-builtins
        if (element.hasOwnProperty('children')) {
          extractWidgets(element)
        }
      }
    })
  }
  extractWidgets(widgetList)
  const widgetExpanded = widgets

  app.component(QPageBuilder.name, QPageBuilder)
  app.config.globalProperties.$q.$QPageBuilderWidgetList = widgetExpanded

  return widgetExpanded
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
}

export {
  install,
  version,
  mixinWidget,
  QPageBuilder,
  extractWidgets,
  OptionPanelTabs,
  mixinOptionPanel
}
