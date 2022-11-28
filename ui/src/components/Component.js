import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'QPageBuilder1',

  setup () {
    return () => h(QBadge, {
      class: 'QPageBuilder1',
      label: 'QPageBuilder1'
    })
  }
}
