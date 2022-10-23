import QPageBuilder from './components/PageBuilder'
import mixinWidget from './mixin/Widgets'

const version = __UI_VERSION__

function install (app) {
  app.component(QPageBuilder.name, QPageBuilder)

}

export {
  version,
  QPageBuilder,
  mixinWidget,

  install
}
