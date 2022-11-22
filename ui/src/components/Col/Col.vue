<template>
  <div class="page-builder-col"
       :class="classes"
       :style="options?.style"
  >
    <editor-box v-if="editable"
                :label="'column'"
                @callAction="callAction"
    />
    <template v-for="(widget, widgetIndex) in widgets"
              :key="widgetIndex"
    >
      <q-intersection v-if="widget && widget.options && widget.options.intersection"
                      :transition="widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'"
      >
        <page-builder-widget v-model:widget="computedWidget[widgetIndex]"
                             :get-data="getData"
                             :editable="editable"
                             @onOptionAction="onOptionAction($event, {widget, widgetIndex, name: widget.name})"
        />
      </q-intersection>
      <page-builder-widget v-else
                           v-model:widget="computedWidget[widgetIndex]"
                           :get-data="getData"
                           :editable="editable"
                           @onOptionAction="onOptionAction($event, {widget, widgetIndex, name: widget.name})"
      />
    </template>
  </div>
</template>

<script>
import {useQuasar} from 'quasar'
import {computed, ref} from 'vue'
import EditorBox from '../EditorBox.vue'
import mixinWidget from '../../mixin/Widgets'
import PageBuilderWidget from '../Widget/Widget.vue'

export default {
  name: 'PageBuilderCol',
  mixins: [mixinWidget],
  emits: ['onOptionAction'],
  components: {
    EditorBox,
    PageBuilderWidget,
  },
  computed: {
    classes () {
      const classes = [this.colNumber]
      if (this.options?.className) {
        classes.push(this.options.className)
      }
      if (this.editable) {
        classes.push('editable')
      }

      return classes.join(' ')
    },
    colNumber () {
      return this.options?.colNumber === undefined ? 'col' : this.options?.colNumber
    }
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
      default: () => {
      }
    },
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props, {emit}) {
    const $q = useQuasar()
    const computedWidget = computed({
      get: () => props.widgets,
      set: (value) => emit('update:widget', value)
    })
    const eventWidget = ref({})
    const action = ref('')
    const elementFormDialog = ref(false)
    const form = ref({})
    const callAction = (event) => {
      const path = {
        node: 'cols',
      }
      const data = {
        event,
        path,
        name: 'col'
      }
      emit('onOptionAction', data)
    }

    const onOptionAction = (data, widgetItem) => {
      const event = data.event

      data.path.index = data.widgetIndex ? data.widgetIndex : widgetItem.widgetIndex
      const path = {
        node: 'cols',
        child: data.path
      }
      const emitData = {
        event,
        path,
        name: data.name,
        nodeName: data.nodeName,
        widget: data.widget ? data.widget : widgetItem.widget,
        widgetIndex: data.widgetIndex ? data.widgetIndex : widgetItem.widgetIndex
      }
      emit('onOptionAction', emitData)
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


    const setWidget1 = (event, widgetItem) => {
      const widgetExpanded = $q.$QPageBuilderWidgetList
      action.value = event
      const targetWidget = widgetExpanded.find(x => x.name === _snake2Pascal(widgetItem.widget.name))
      eventWidget.value = {
        widgetIndex: widgetItem.widgetIndex,
        widget: widgetItem.widget,
        optionPanel: targetWidget?.optionPanel,
        optionPanelName: targetWidget?.optionPanelName
      }
      if (event === 'add') {
        elementFormDialog.value = true
      } else if (event === 'edit') {
        if (eventWidget.value.widget.options !== undefined) {
          form.value = eventWidget.value.widget.options
        }
        form.value.type = 'widget'
        if (eventWidget.value.optionPanel !== undefined) {
          form.value.optionPanel = eventWidget.value.optionPanel
          form.value.optionPanelName = eventWidget.value.optionPanelName
        }
        elementFormDialog.value = true
      } else if (event === 'delete') {
        computedWidget.value.splice(eventWidget.value.widgetIndex, 1)
      } else if (event === 'duplicate') {
        computedWidget.value.push(eventWidget.value.widget)
      }
    }

    function _snake2Pascal(str) {
      str += '';
      str = str.split('-');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].slice(0, 1).toUpperCase() + str[i].slice(1, str[i].length);
      }
      return str.join('');
    }

    return {
      action,
      form,
      computedWidget,
      elementFormDialog,
      callAction,
      onSubmitElement,
      onOptionAction
    }
  }
}
</script>

<style scoped lang="scss">
.page-builder-col {
  position: relative;
  &.editable {
    border: dashed 2px $primary;
    padding-top: 40px;
  }
  //:deep(.widget-editor-box) {
  //  display: none;
  //}
  //&:hover {
  //  :deep(.widget-editor-box) {
  //    display: block;
  //  }
  //}
}
</style>
