// import { boot } from 'quasar/wrappers'
import { QPageBuilder } from 'ui'

const requireContext = require.context('components/Widgets/', true, /\.vue$/i, 'lazy')
export const componentsData = requireContext.keys().map((file) => {
  let path = file
  const crush = file.split('/')
  // first element is always a dot so remove it.
  crush.shift()
  // removing the dot and name of component, so remain will be the path of component.
  // used for registering dynamically.
  path = path.replace('.', '')
  path = path.replace(crush[crush.length - 1], '')
  // removing vue from the name of component.
  crush[crush.length - 1] = crush[crush.length - 1].replace(/(^.\/)|(\.vue$)/g, '')
  return { name: crush[crush.length - 1], path, depth: crush.length - 1, lastFolderName: crush[crush.length - 2] }
}).filter(c => {
  // due to standard of making widgets, only files with same name to folder will rendered.
  // others assume to dependencies which main file will handle.
  if (c.name == c.lastFolderName) {
    return c
  }
})

export const setHeight = (h) => {
  QPageBuilder.methods.calculateHeight(h)
}
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async ({ app }) => {
//   app.component('q-page-builder', QPageBuilder)
// })
