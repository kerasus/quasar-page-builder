<template>
  <div :class="{'editable': editable && widget.name !== 'page-builder-section'}"
       class="page-builder-widget">
    <editor-box v-if="editable && widget.name !== 'page-builder-section' && widget.name !== 'NestedSection'"
                :label="widget.name"
                :show-add="false"
                :show-edit="hasOptionPanel"
                @callAction="callAction" />
    <component :is="widget.name"
               :data="widget.data"
               :options="widget.options"
               :editable="editable"
               @onOptionAction="onOptionAction" />
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import EditorBox from '../EditorBox.vue'
import mixinWidget from '../../mixin/Widgets.js'
import { defineAsyncComponent, computed } from 'vue'
// import { computed } from 'vue'

const components = {
  EditorBox
  // NestedSection
}

export default {
  name: 'PageBuilderWidget',
  components,
  mixins: [mixinWidget],
  props: {
    widget: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onOptionAction'],
  setup(props, { emit }) {
    const $q = useQuasar()
    components.NestedSection = defineAsyncComponent(() => import('../Section/Section.vue'))
    // components.NestedSection = defineAsyncComponent(() => import('../Section/Section.vue'))
    // components.NestedSection = NestedSection
    if ($q.$pageBuilderWidgetComponents) {
      Object.assign(components, $q.$pageBuilderWidgetComponents)
    }

    const hasOptionPanel = computed(() => {
      // return !!Object.keys($q.$pageBuilderWidgetOptionPanels).find(key => $q.$pageBuilderWidgetOptionPanels[key].name === props.widget.name)
      return !!Object.keys($q.$pageBuilderWidgetOptionPanels).find(key => key === props.widget.name + 'OptionPanel')
    })

    const callAction = (event) => {
      const path = {
        node: 'widgets'
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
      onOptionAction,
      hasOptionPanel,
      callAction
    }
  }
}
</script>

<style scoped lang="scss">
@import 'quasar/src/css/variables.sass';

.page-builder-widget {
  position: relative;
  &.editable {
    border: dashed 2px $primary;
  }
}
</style>
