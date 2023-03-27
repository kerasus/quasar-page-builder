<template>
  <div class="page-builder-col"
       :class="colClassName"
       :style="colOptions.style">
    <editor-box v-if="editable"
                :label="'column'"
                @callAction="callAction" />
    <template v-for="(widget, widgetIndex) in widgets"
              :key="widgetIndex">
      <q-intersection v-if="widget && widget.options && widget.options.intersection"
                      :transition="widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'">
        <page-builder-widget v-model:widget="computedWidget[widgetIndex]"
                             v-model:options="widget.options"
                             :editable="editable"
                             :draggable="editable"
                             @onOptionAction="onOptionAction($event, {widget, widgetIndex: widgetIndex, name: widget.name})"
                             @dragstart="onDragstart($event, widget, widgetIndex)"
                             @dragover="onDragOver"
                             @dragleave="onDragLeave"
                             @drop="onDrop($event, widgetIndex)" />
      </q-intersection>
      <page-builder-widget v-else
                           v-model:widget="computedWidget[widgetIndex]"
                           v-model:options="widget.options"
                           :editable="editable"
                           :draggable="editable"
                           @onOptionAction="onOptionAction($event, {widget, widgetIndex: widgetIndex, name: widget.name})"
                           @dragstart="onDragstart($event, widget, widgetIndex)"
                           @dragover="onDragOver"
                           @dragleave="onDragLeave"
                           @drop="onDrop($event, widgetIndex)" />
    </template>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import EditorBox from '../EditorBox.vue'
import mixinWidget from '../../mixin/Widgets'
import PageBuilderWidget from '../Widget/Widget.vue'

export default {
  name: 'PageBuilderCol',
  components: {
    EditorBox,
    PageBuilderWidget
  },
  mixins: [mixinWidget],
  props: {
    widgets: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onOptionAction', 'update:options'],
  setup(props, { emit }) {
    const $q = useQuasar()
    const computedWidget = computed({
      get: () => props.widgets,
      set: (value) => emit('update:widget', value)
    })
    const eventWidget = ref({})
    const localDragable = ref(null)
    const action = ref('')
    const elementFormDialog = ref(false)
    const form = ref({})
    const callAction = (event) => {
      const path = {
        node: 'cols'
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

      data.path.index = widgetItem.widgetIndex
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

    const onDragstart = (event, widget, widgetIndex) => {
      if (!props.editable) {
        return
      }
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('value', JSON.stringify({ widget, widgetIndex }))
      localDragable.value = event
      // console.log('onDragstart', event.dataTransfer.getData('value'))
    }

    const onDragOver = (event) => {
      if (!props.editable) {
        return
      }
      event.preventDefault()
      // console.log('onDragOver', event.dataTransfer.getData('value'))
    }

    const onDragLeave = (event) => {
      // if (!props.editable) {
      //
      // }
      // console.log('onDragLeave', event.dataTransfer.getData('value'))
    }

    const onDrop = (event, newIndex) => {
      if (!props.editable) {
        return
      }
      const valueStringfied = event.dataTransfer.getData('value')
      const value = valueStringfied ? JSON.parse(valueStringfied) : null
      const widget = value.widget
      const widgetOldIndex = value.widgetIndex
      const widgetNewIndex = newIndex
      if (localDragable.value) {
        updatePosition(computedWidget.value, widgetOldIndex, widgetNewIndex)
      } else {
        addToIndex(computedWidget.value, widget, widgetNewIndex)
      }

      localDragable.value = null
    }

    const updatePosition = (list, oldIndex, newIndex) => {
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
    }

    const addToIndex = (list, newItem, index) => {
      list.splice(index, 0, newItem)
    }

    return {
      onDrop,
      onDragOver,
      onDragLeave,
      onDragstart,

      action,
      form,
      computedWidget,
      elementFormDialog,
      callAction,
      onSubmitElement,
      onOptionAction
    }
  },
  data() {
    return {
      defaultOptions: {
        colNumber: 'col',
        style: {},
        className: ''
      }
    }
  },
  computed: {
    colClassName () {
      const colNumber = this.colNumber ? this.colNumber : ''

      return this.colOptions.className + ' ' + colNumber
    },
    optionsClassName () {
      return this.colOptions.className
    },
    colOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    },
    colNumber () {
      return this.colOptions.colNumber
    }
  },
  watch: {
    editable() {
      this.computeOptionsClassName()
    },
    optionsClassName() {
      this.computeOptionsClassName()
    }
  },
  methods: {
    computeOptionsClassName () {
      this.colOptions.className = this.getUpdateClassNamesWithKey(this.colOptions.className, 'editable', this.editable)
    }
  }
}
</script>

<style scoped lang="scss">
@import 'quasar/src/css/variables.sass';

.page-builder-col {
  position: relative;
  &.editable {
    border: dashed 2px $primary;
    padding-top: 40px;
  }
}
</style>
