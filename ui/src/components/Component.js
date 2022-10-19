import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'QPageBuilder',

  setup () {
    return () => h(QBadge, {
      class: 'QPageBuilder',
      label: 'QPageBuilder'
    })
  }
}
