import QPageBuilder from './components/QPageBuilder.vue'
import mixinWidget from './mixin/Widgets'
import mixinOptionPanel from './mixin/OptionPanel'
import OptionPanelTabs from './components/OptionPanelComponents/OptionPanelTabs.vue'
import extractWidgets from './assets/extract.widgets'

const version = __UI_VERSION__

function install (app) {
  app.component(QPageBuilder.name, QPageBuilder)

}

export {
  version,
  QPageBuilder,
  mixinWidget,
  mixinOptionPanel,
  OptionPanelTabs,
  extractWidgets,
  install
}
