import { boot } from 'quasar/wrappers'
import { QPageBuilder, extractWidgets } from 'ui'
import widgetList from 'src/components/Widgets/widget.json'

export const widgets = extractWidgets(widgetList)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component('q-page-builder', QPageBuilder)
})
