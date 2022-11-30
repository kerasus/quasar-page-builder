import { boot } from 'quasar/wrappers'
import { QPageBuilder, extractWidgets } from 'ui'
import widgetList from '../components/Widgets/widget.json'
export const widgetExpanded = extractWidgets(widgetList)
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // app.$QPageBuilderWidgetList = widgetList
  app.config.globalProperties.$q.$QPageBuilderWidgetList = widgetExpanded
  app.component('q-page-builder', QPageBuilder)
})
