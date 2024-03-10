<template>
  <div class="page-builder-col"
       :class="colClassName"
       :style="optionsStyle"
       @dragover="onDragOver"
       @dragleave="onDragLeave"
       @drop="onDrop($event, 0, true)">
    <template v-if="editable">
      <div class="editable-wrapper">
        <editor-box v-if="editable"
                    :label="'column'"
                    @callAction="callAction" />
        <template v-for="(widget, widgetIndex) in computedWidgets"
                  :key="widgetIndex">
          <q-intersection v-if="widget && widget.options && widget.options.intersection"
                          :transition="widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'">
            <page-builder-widget v-model:widget="computedWidgets[widgetIndex]"
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
                               v-model:widget="computedWidgets[widgetIndex]"
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
      <template v-for="(widget, widgetIndex) in computedWidgets"
                :key="widgetIndex">
        <q-intersection v-if="widget && widget.options && widget.options.intersection"
                        :transition="widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'">
          <page-builder-widget v-model:widget="computedWidgets[widgetIndex]"
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
                             v-model:widget="computedWidgets[widgetIndex]"
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
  emits: ['onOptionAction', 'update:options', 'onDrag'],
  setup(props, { emit }) {
    const $q = useQuasar()
    const computedWidgets = computed({
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
          computedWidgets.value[eventWidget.value.widgetIndex].data.rows.push(widgetData)
        }
      } else if (action.value === 'edit') {
        computedWidgets[eventWidget.value.widgetIndex] = widgetData
      }
      elementFormDialog.value = false
    }

    const onDragStart = (event, widget, widgetIndex) => {
      if (!props.editable) {
        return
      }
      event.stopPropagation()
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
      const valueStringField = event.dataTransfer.getData('value')
      const value = valueStringField ? JSON.parse(valueStringField) : null
      const widget = value.widget
      const widgetOldIndex = value.widgetIndex
      const widgetNewIndex = newIndex
      const dragedObjectIsWidget = !!widget.name
      if (!dragedObjectIsWidget) {
        event.stopPropagation()
        return
      }
      if (localDraggable.value) {
        updatePosition(computedWidgets.value, widgetOldIndex, widgetNewIndex)
      } else {
        addToIndex(computedWidgets.value, widget, widgetNewIndex)
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
      computedWidgets,
      elementFormDialog,
      callAction,
      onSubmitElement,
      onOptionAction
    }
  },
  data() {
    return {
      mounted: false,
      defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
    }
  },
  computed: {
    optionsStyle () {
      if (!this.mounted) {
        return {}
      }

      return this.colOptions.style
    },
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
        this.removeFromIndex(this.computedWidgets, widgetOldIndex)
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
  mounted() {
    this.mounted = true
  },
  methods: {
    computeOptionsClassName () {
      this.colOptions.className = this.getUpdateClassNamesWithKey(this.colOptions.className, 'editable', this.editable)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../Component.scss";
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
$backgrounds: (
    xs: (
        size: v-bind('defaultOptions.backgrounds.xs.size'),
        color: v-bind('defaultOptions.backgrounds.xs.color'),
        image: v-bind('defaultOptions.backgrounds.xs.image'),
        repeat: v-bind('defaultOptions.backgrounds.xs.repeat'),
        position: v-bind('defaultOptions.backgrounds.xs.position'),
        attachment: v-bind('defaultOptions.backgrounds.xs.attachment')
    ),
    sm: (
        size: v-bind('defaultOptions.backgrounds.sm.size'),
        color: v-bind('defaultOptions.backgrounds.sm.color'),
        image: v-bind('defaultOptions.backgrounds.sm.image'),
        repeat: v-bind('defaultOptions.backgrounds.sm.repeat'),
        position: v-bind('defaultOptions.backgrounds.sm.position'),
        attachment: v-bind('defaultOptions.backgrounds.sm.attachment')
    ),
    md: (
        size: v-bind('defaultOptions.backgrounds.md.size'),
        color: v-bind('defaultOptions.backgrounds.md.color'),
        image: v-bind('defaultOptions.backgrounds.md.image'),
        repeat: v-bind('defaultOptions.backgrounds.md.repeat'),
        position: v-bind('defaultOptions.backgrounds.md.position'),
        attachment: v-bind('defaultOptions.backgrounds.md.attachment')
    ),
    lg: (
        size: v-bind('defaultOptions.backgrounds.lg.size'),
        color: v-bind('defaultOptions.backgrounds.lg.color'),
        image: v-bind('defaultOptions.backgrounds.lg.image'),
        repeat: v-bind('defaultOptions.backgrounds.lg.repeat'),
        position: v-bind('defaultOptions.backgrounds.lg.position'),
        attachment: v-bind('defaultOptions.backgrounds.lg.attachment')
    ),
    xl: (
        size: v-bind('defaultOptions.backgrounds.xl.size'),
        color: v-bind('defaultOptions.backgrounds.xl.color'),
        image: v-bind('defaultOptions.backgrounds.xl.image'),
        repeat: v-bind('defaultOptions.backgrounds.xl.repeat'),
        position: v-bind('defaultOptions.backgrounds.xl.position'),
        attachment: v-bind('defaultOptions.backgrounds.xl.attachment')
    )
);
$responsiveOrder: (
    xs: v-bind('defaultOptions.responsiveOrder.xs'),
    sm: v-bind('defaultOptions.responsiveOrder.sm'),
    md: v-bind('defaultOptions.responsiveOrder.md'),
    lg: v-bind('defaultOptions.responsiveOrder.lg'),
    xl: v-bind('defaultOptions.responsiveOrder.xl')
);

@mixin media-query-order($min-width, $order) {
  @media (min-width: $min-width) {
    & {
      order: $order;
    }
  }
}
@mixin media-query-orders($orders, $sizes) {
  @each $name, $min-width in $sizes {
    $order: map_get($orders, $name);
    @include media-query-order($min-width, $order);
  }
}

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
    @if variable-exists($rotate) or variable-exists($translateX) or variable-exists($translateY) or variable-exists($scaleX) or variable-exists($scaleY) or variable-exists($skewX) or variable-exists($skewY) {
      transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
    }

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

  @include media-query-backgrounds($backgrounds, $sizes);
  @include media-query-orders($responsiveOrder, $sizes);
}
</style>
