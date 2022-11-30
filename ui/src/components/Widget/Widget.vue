<template>
  <div :class="{'editable': editable && widget.name !== 'page-builder-section'}" class="page-builder-widget">
    <editor-box v-if="editable && widget.name !== 'page-builder-section'"
                :label="widget.name"
                :show-add="false"
                :show-edit="hasOptionPanel"
                @callAction="callAction"
    />
    <component :is="widget.name"
               :data="widget.data"
               :options="widget.options"
               :get-data="getData"
               :editable="editable"
               @onOptionAction="onOptionAction"
    />
  </div>
</template>

<script>
import EditorBox from '../EditorBox.vue'
import mixinWidget from '../../mixin/Widgets'
import {defineAsyncComponent, computed} from 'vue'

const components = {
  EditorBox
}

components.PageBuilderSection = defineAsyncComponent(() => import('../Section/Section.vue'))

export default {
  name: 'PageBuilderWidget',
  components,
  emits: ['onOptionAction'],
  props: {
    widget: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getData: {
      type: Function,
      default: () => {
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  mixins: [mixinWidget],
  setup(props, {emit}) {
    if (window.$pageBuilderWidgetComponents) {
      Object.keys(window.$pageBuilderWidgetComponents).forEach(key => {
        components[key] = window.$pageBuilderWidgetComponents[key]
      })
    }
    const computedWidget = computed(() => {
      return props.widget
    })
    const hasOptionPanel = computed(() => {
      return !!Object.keys(window.$pageBuilderWidgetOptionPanels).find(key=>window.$pageBuilderWidgetOptionPanels[key].tagName===props.widget.name)
    })

    const callAction = (event) => {
      const path = {
        node: 'widgets',
      }
      const data = {
        event,
        path,
        node: 'widgets'
      }
      emit('onOptionAction', data)
    }

    const onOptionAction = (data) => {
      emit('onOptionAction', data)
    }


    return {
      computedWidget,
      onOptionAction,
      hasOptionPanel,
      callAction
    }
  }
}
</script>

<style scoped lang="scss">
.page-builder-widget {
  position: relative;
  &.editable {
    border: dashed 2px $primary;
    padding-top: 40px;
  }
}
</style>
