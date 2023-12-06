/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

// import { generateWidgetList } from 'quasar-ui-q-page-builder'
// const { generateWidgetList } = require('./src/widgetListGetter/index')
// const { generateWidgetList } = require('quasar-ui-q-page-builder')

function extendConf (conf) {
  // https://quasar.dev/app-extensions/development-guide/index-api#registering-boot-and-css-files
  // register our boot file
  // conf.boot.push('~quasar-app-extension-q-page-builder/src/boot/register.js')

  if (!conf.build.transpileDependencies) {
    conf.build.transpileDependencies = []
  }
  
  // make sure app extension files & ui package gets transpiled
  conf.build.transpileDependencies.push(/quasar-app-extension-q-page-builder[\\/]src/)

  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~quasar-ui-q-page-builder/src/index.sass')

  // conf.build.beforeDev = function () {
  //   generateWidgetList('./src/components/Widgets')
  // }
  // conf.build.beforeBuild = function () {
  //   generateWidgetList('./src/components/Widgets')
  // }
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app-*" CLI
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite) {
    api.compatibleWith('@quasar/app-vite', '^1.0.0')
  }
  else if (api.hasWebpack) {
    api.compatibleWith('@quasar/app-webpack', '^3.4.0')
  }


  // Uncomment the line below if you provide a JSON API for your component
  // api.registerDescribeApi('QPageBuilder', '~quasar-ui-q-page-builder/src/components/QPageBuilder.json')


  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)
}
