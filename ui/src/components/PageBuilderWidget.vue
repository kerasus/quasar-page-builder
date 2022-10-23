<template>
  <ComponentWrapper :editable="editable"
                    @callAction="callAction($event)">
    <template v-slot:body>
      <component
        :is="widget.name"
        v-model:data="computedWidget"
        v-model:options="computedWidget"
        :containerFullHeight="containerFullHeight"
        :get-data="getData"
      />
    </template>
  </ComponentWrapper>
</template>

<script>
import { defineAsyncComponent, computed } from 'vue'
import mixinWidget from '../mixin/Widgets'
import { widgets } from 'src/boot/page-builder'
import ComponentWrapper from './PageBuilderEditor.vue'

// generating define async imports
const components = {
  ComponentWrapper
}

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
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  mixins: [mixinWidget],
  created() {},
  setup(props, { emit }) {
    widgets.forEach((component) => {
      components[component.name] = defineAsyncComponent(() => {
        return import('src/' + component.path + '/' + component.name + '.vue')
      })
    })

    const computedWidget = computed(() => {
      return props.widget
    })

    const callAction = (event) => {
      emit('yieldSelf', event)
    }

    return {
      computedWidget,
      callAction
    }
  }
}
</script>

<style scoped></style>
