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
               :editable="editable"
               @onOptionAction="onOptionAction"
    />
  </div>
</template>

<script>
import {useQuasar} from 'quasar'
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
    editable: {
      type: Boolean,
      default: false
    }
  },
  mixins: [mixinWidget],
  setup(props, {emit}) {
    const $q = useQuasar()
    if ($q.$pageBuilderWidgetComponents) {
      Object.assign(components, $q.$pageBuilderWidgetComponents)
    }

    const hasOptionPanel = computed(() => {
      return !!Object.keys($q.$pageBuilderWidgetOptionPanels).find(key=>$q.$pageBuilderWidgetOptionPanels[key].name===props.widget.name)
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
    padding-top: 40px;
  }
}
</style>
