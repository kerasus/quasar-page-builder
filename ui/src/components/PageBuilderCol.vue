<template>
  <ComponentWrapper :editable="editable"
                    @callAction="callAction($event)">
    <template v-slot:body>
      <div class="page-builder-col"
           :class="classes"
           :style="style">
        <template
          v-for="(widget, widgetIndex) in widgets"
          :key="widgetIndex"
        >
          <page-builder-section
            v-if="widget.type === 'base'"
            v-model:options="widget.options"
            :containerFullHeight="height"
            :get-data="getData"
            :editable="editable"
            v-model:data="computedWidget[widgetIndex].data"
            @yieldSelf="setWidget($event, {widget, widgetIndex})" />
          <q-intersection
            v-else-if="widget.options && widget.options.intersection"
            :transition="widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'"
          >
            <page-builder-widget
              v-model:widget="computedWidget[widgetIndex]"
              :containerFullHeight="containerFullHeight"
              :get-data="getData"
              :editable="editable"
              @yieldSelf="setWidget($event, {widget, widgetIndex})"
            >
            </page-builder-widget>
          </q-intersection>
          <page-builder-widget
            v-else
            v-model:widget="computedWidget[widgetIndex]"
            :containerFullHeight="containerFullHeight"
            :get-data="getData"
            :editable="editable"
            @yieldSelf="setWidget($event, {widget, widgetIndex})"
          >
          </page-builder-widget>
        </template>
      </div>
    </template>
  </ComponentWrapper>
  <PageBuilderDialog :dialog="elementFormDialog"
                     :formData="form"
                     :action="action"
                     :type="'widget'"
                     @closeDialog="elementFormDialog = false"
                     @submit="onSubmitElement" />
</template>

<script>
import { computed, ref, defineAsyncComponent } from 'vue'
import { useQuasar } from 'quasar'
import PageBuilderWidget from './PageBuilderWidget.vue'
import mixinWidget from '../mixin/Widgets'
import ComponentWrapper from './PageBuilderEditor.vue'
import PageBuilderDialog from './PageBuilderDialog'

export default {
  name: 'PageBuilderCol',
  // components,
  mixins: [mixinWidget],
  emits: ['update:modelValue', 'yieldSelf'],
  components: {
    PageBuilderWidget,
    ComponentWrapper,
    PageBuilderDialog,
    PageBuilderSection: defineAsyncComponent(() => import('./PageBuilderSection.vue'))
  },
  props: {
    widgets: {
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
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const computedWidget = computed({
      get: () => props.widgets,
      set: (value) => emit('update:widget', value)
    })
    const eventWidget = ref({})
    const action = ref('')
    const elementFormDialog = ref(false)
    const form = ref({})
    const classes = computed(() => (props.options?.colNumber?.value === undefined ? 'col' : props.options?.colNumber?.value) + ' ' + props.options?.className?.value)
    const callAction = (event) => {
      emit('yieldSelf', event)
    }
    const onSubmitElement = (widget) => {
      const widgetData = widget.item.type === 'widget' ? widget.item : widget.item.info
      if (widget.item.info !== undefined) {
        widgetData.options = widget.options
      }
      if (action.value === 'add') {
        if (widget.item.type === 'widget') {
          $q.notify({
            message: 'المانی به این المان نمی توانید اضافه کنید',
            color: 'red'
          })
        } else {
          computedWidget.value[eventWidget.value.widgetIndex].data.rows.push(widgetData)
        }
      } else if (action.value === 'edit') {
        computedWidget[eventWidget.value.widgetIndex] = widgetData
      }
      elementFormDialog.value = false
    }

    const setWidget = (event, widgetItem) => {
      action.value = event
      eventWidget.value = {
        widgetIndex: widgetItem.widgetIndex,
        widget: widgetItem.widget
      }
      if (event === 'add') {
        elementFormDialog.value = true
      } else if (event === 'edit') {
        form.value = eventWidget.value.widget.options
        if (eventWidget.value.widget.optionPanel !== undefined) {
          form.optionPanel = eventWidget.value.widget.optionPanel
        }
        elementFormDialog.value = true
      } else if (event === 'delete') {
        computedWidget.value.splice(eventWidget.value.widgetIndex, 1)
      } else if (event === 'duplicate') {
        computedWidget.value.push(eventWidget.value.widget)
      }
    }
    return {
      computedWidget,
      elementFormDialog,
      classes,
      callAction,
      onSubmitElement,
      setWidget
    }
  }
}
</script>

<style scoped>

</style>
