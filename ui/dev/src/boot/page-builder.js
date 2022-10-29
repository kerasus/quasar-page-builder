import { boot } from 'quasar/wrappers'
import { QPageBuilder, extractWidgets } from 'ui'
// import widgetList from 'src/components/Widgets/widget.json'
import widgetList from '../components/Widgets/widget1.json'

export const widgetExpanded = extractWidgets(widgetList)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component('q-page-builder', QPageBuilder)
})
