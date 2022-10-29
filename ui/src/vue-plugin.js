import QPageBuilder from './components/PageBuilder'
import mixinWidget from './mixin/Widgets'
import extractWidgets from './assets/extract.widgets'

const version = __UI_VERSION__

function install (app) {
  app.component(QPageBuilder.name, QPageBuilder)

}

export {
  version,
  QPageBuilder,
  mixinWidget,
  extractWidgets,

  install
}
