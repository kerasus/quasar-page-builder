<template>
  <div class="page-builder-col"
       :class="colClassName"
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
                             v-model:options="widget.options"
                             :get-data="getData"
                             :editable="editable"
                             @onOptionAction="onOptionAction($event, {widget, widgetIndex, name: widget.name})"
        />
      </q-intersection>
      <page-builder-widget v-else
                           v-model:widget="computedWidget[widgetIndex]"
                           v-model:options="widget.options"
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
  emits: ['onOptionAction', 'update:options'],
  components: {
    EditorBox,
    PageBuilderWidget,
  },
  computed: {
    colClassName () {
      const colNumber = this.colNumber ? this.colNumber : ''
      this.colOptions.className = this.getUpdateClassNamesWithKey(this.colOptions.className, 'editable', this.editable)

      return this.colOptions.className + ' ' + colNumber
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
}
</style>
