import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-q-page-builder'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
