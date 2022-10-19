<template>
  <component
    :is="widget.name"
    :data="widget.data"
    :options="widget.options"
    :containerFullHeight="containerFullHeight"
    :get-data="getData"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import mixinWidget from '../mixin/Widgets'
import { componentsData } from 'src/boot/page-builder'

// generating define async imports
const components = {}

components.PageBuilderSection = defineAsyncComponent(() =>
  import('./PageBuilderSection.vue')
)
export default {
  name: 'PageBuilderWidget',

  components,

  props: {
    widget: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getData: {
      type: Function,
      default: () => {}
    }
  },
  mixins: [mixinWidget],
  created() {},
  setup() {
    componentsData.forEach((component) => {
      components[component.name] = defineAsyncComponent(() => {
        return import(
          'components/Widgets' + component.path + component.name + '.vue'
        )
      })
    })
    return {}
  }
}
</script>

<style scoped></style>
