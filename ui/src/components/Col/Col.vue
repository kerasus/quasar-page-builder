<template>
  <div class="page-builder-col"
       :class="colClassName"
       :style="colOptions.style"
       @dragover="onDragOver"
       @dragleave="onDragLeave"
       @drop="onDrop($event, 0, true)">
    <template v-if="editable">
      <div class="editable-wrapper">
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
                                 @dragstart="onDragStart($event, widget, widgetIndex)"
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
                               @dragstart="onDragStart($event, widget, widgetIndex)"
                               @dragover="onDragOver"
                               @dragleave="onDragLeave"
                               @drop="onDrop($event, widgetIndex)" />
        </template>
      </div>
    </template>
    <template v-else>
      <template v-for="(widget, widgetIndex) in widgets"
                :key="widgetIndex">
        <q-intersection v-if="widget && widget.options && widget.options.intersection"
                        :transition="widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'">
          <page-builder-widget v-model:widget="computedWidget[widgetIndex]"
                               v-model:options="widget.options"
                               :editable="editable"
                               :draggable="editable"
                               @onOptionAction="onOptionAction($event, {widget, widgetIndex: widgetIndex, name: widget.name})"
                               @dragstart="onDragStart($event, widget, widgetIndex)"
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
                             @dragstart="onDragStart($event, widget, widgetIndex)"
                             @dragover="onDragOver"
                             @dragleave="onDragLeave"
                             @drop="onDrop($event, widgetIndex)" />
      </template>
    </template>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import EditorBox from '../EditorBox.vue'
import mixinWidget from '../../mixin/Widgets'
import defaultOptions from './DefaultOptions.js'
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
    const localDraggable = ref(null)
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

    const onDragStart = (event, widget, widgetIndex) => {
      if (!props.editable) {
        return
      }
      emit('onDrag', 'DragStart')
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('value', JSON.stringify({ widget, widgetIndex }))
      localDraggable.value = event
      // console.log('onDragStart', event.dataTransfer.getData('value'))
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
      /*
      ev.target.style.marginTop = '2px'
      ev.target.style.marginBottom = '2px'
      */
      // console.log('onDragLeave', event.dataTransfer.getData('value'))
    }

    // dragEnter(ev) {
    //   /*
    //   if (ev.clientY > ev.target.height / 2) {
    //     ev.target.style.marginBottom = '10px'
    //   } else {
    //     ev.target.style.marginTop = '10px'
    //   }
    //   */
    // },

    const onDrop = (event, newIndex, parent) => {
      if (!props.editable) {
        return
      }
      const valueStringfied = event.dataTransfer.getData('value')
      const value = valueStringfied ? JSON.parse(valueStringfied) : null
      const widget = value.widget
      const widgetOldIndex = value.widgetIndex
      const widgetNewIndex = newIndex
      if (localDraggable.value) {
        updatePosition(computedWidget.value, widgetOldIndex, widgetNewIndex)
      } else {
        addToIndex(computedWidget.value, widget, widgetNewIndex)
      }

      localDraggable.value = null
      emit('onDrag', 'Drop')
      event.stopPropagation()
    }

    const updatePosition = (list, oldIndex, newIndex) => {
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
    }

    const addToIndex = (list, newItem, index) => {
      if (list.length > index) {
        list.splice(index, 0, newItem)
      } else {
        list.push(newItem)
      }
    }

    const removeFromIndex = (list, index) => {
      list.splice(index, 1)
    }

    return {
      onDrop,
      onDragOver,
      onDragLeave,
      onDragStart,
      removeFromIndex,
      localDraggable,

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
      defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
    }
  },
  computed: {
    responsiveShow () {
      let responsiveShow = ''
      Object.keys(this.colOptions.responsiveShow).forEach(key => {
        if (this.colOptions.responsiveShow[key] === false) {
          responsiveShow += key + '-hide '
        }
      })

      return ' ' + responsiveShow
    },
    shadows() {
      const shadows = []
      this.colOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    hoverShadows() {
      const shadows = []
      this.colOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    colClassName () {
      const colNumber = this.colNumber ? this.colNumber : ''

      return this.colOptions.className + ' ' + colNumber + this.responsiveShow
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
    editable: {
      handler() {
        this.computeOptionsClassName()
      },
      immediate: true
    },
    dragStatus(newValue) {
      if (newValue === 'Drop' && this.localDraggable) {
        const valueStringfied = event.dataTransfer.getData('value')
        const value = valueStringfied ? JSON.parse(valueStringfied) : null
        const widgetOldIndex = value.widgetIndex
        this.removeFromIndex(this.computedWidget, widgetOldIndex)
      }
      if (newValue === 'Drop') {
        this.localDraggable = null
      }
    },
    optionsClassName: {
      handler() {
        this.computeOptionsClassName()
      },
      immediate: true
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

$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
$border: v-bind('colOptions.borderStyle.borderCssString');
$borderRadius: v-bind('colOptions.borderStyle.borderRadiusCssString');
$hoverBorder: v-bind('colOptions.cssHoverEffects.borderStyle.borderCssString');
$hoverBorderRadius: v-bind('colOptions.cssHoverEffects.borderStyle.borderRadiusCssString');
$skewX: v-bind('colOptions.cssHoverEffects.borderStyle.borderCssString');
$skewX: v-bind('colOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('colOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('colOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('colOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('colOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('colOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('colOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('colOptions.cssHoverEffects.transition.time');

.page-builder-col {
  position: relative;
  box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  -moz-box-shadow: $shadows;
  border-radius: $borderRadius;
  -webkit-border-radius: $borderRadius;
  -moz-border-radius: $borderRadius;
  border: $border;
  &:hover {
    transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
    transition: all calc(#{$transitionTime} * 1s);
    @if not $hoverShadows {
    } @else {
      box-shadow: $hoverShadows;
      -webkit-box-shadow: $hoverShadows;
      -moz-box-shadow: $hoverShadows;
    }
    @if not $hoverBorderRadius {
    } @else {
      border-radius: $hoverBorderRadius;
      -webkit-border-radius: $hoverBorderRadius;
      -moz-border-radius: $hoverBorderRadius;
    }
    @if not $hoverBorder {
    } @else {
      border: $hoverBorder;
    }
  }
  &.editable {
    .editable-wrapper {
      @if not $border {
        border: $border;
      } @else {
        border: dashed 2px $primary;
      }
    }
  }
}
</style>
