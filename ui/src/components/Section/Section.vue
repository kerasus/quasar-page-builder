<template>
  <div :id="sectionOptions.id"
       class="page-builder-section"
       :class="sectionClassName"
       :style="optionsStyle"
       @dragover="onDragOver"
       @dragleave="onDragLeave"
       @drop="onDrop($event, 0, true)">
    <editor-box v-if="editable"
                :label="'section'"
                @callAction="callAction" />
    <q-resize-observer @resize="Resize" />
    <page-builder-row v-for="(row, rowIndex) in computedRows"
                      :key="rowIndex"
                      v-model:cols="row.cols"
                      v-model:options="row.options"
                      :editable="editable"
                      :drag-status="dragStatus"
                      :draggable="editable"
                      @onOptionAction="onOptionAction($event, {widget: row, widgetIndex: rowIndex, name: 'row'})"
                      @onDrag="onDrag"
                      @dragstart="onDragStart($event, row, rowIndex)"
                      @dragover="onDragOver"
                      @dragleave="onDragLeave"
                      @drop="onDrop($event, rowIndex)" />
  </div>
</template>

<script>
import EditorBox from '../EditorBox.vue'
import PageBuilderRow from '../Row/Row.vue'
import defaultOptions from './DefaultOptions.js'
import mixinWidget from '../../mixin/Widgets.js'

export default {
  name: 'PageBuilderSection',
  components: {
    EditorBox,
    PageBuilderRow
  },
  mixins: [mixinWidget],
  emits: ['onOptionAction', 'update:options', 'onDrag'],
  data() {
    return {
      mounted: false,
      localDraggable: null,
      defaultBackground: null,
      eventRow: {},
      action: '',
      form: {},
      backgrounds: {
        xs: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        sm: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        md: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        lg: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        }
      },
      elementFormDialog: false,
      windowSize: {
        x: 0,
        y: 0
      },
      defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
    }
  },
  computed: {
    optionsStyle () {
      if (!this.mounted) {
        return {}
      }

      return this.sectionOptions.style
    },
    responsiveShow () {
      let responsiveShow = ''
      Object.keys(this.sectionOptions.responsiveShow).forEach(key => {
        if (this.sectionOptions.responsiveShow[key] === false) {
          responsiveShow += key + '-hide '
        }
      })

      return ' ' + responsiveShow
    },
    shadows() {
      const shadows = []
      this.sectionOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    hoverShadows() {
      const shadows = []
      this.sectionOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    sectionOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    },
    sectionClassName () {
      return this.optionsClassName + this.responsiveShow
    },
    optionsClassName () {
      return this.sectionOptions.className
    },
    optionsFullHeight () {
      return this.sectionOptions.fullHeight
    },
    optionsVerticalAlign () {
      return this.sectionOptions.verticalAlign
    },
    containerFullHeight: {
      get() {
        // if (!this.sectionOptions?.fullHeight) {
        if (!this.sectionOptions || !this.sectionOptions.fullHeight) {
          return false
        }
        if (this.sectionOptions.fullHeight === true) {
          return '100vh'
        }

        return this.sectionOptions.fullHeight
      },
      set(newValue) {
        this.sectionOptions.fullHeight = newValue
      }
    },
    windowWidth() {
      return this.windowSize.x
    },
    windowHeight() {
      return this.windowSize.y
    },
    computedRows () {
      if (!this.data?.rows) {
        return []
      }
      return this.data.rows
    }
  },
  watch: {
    editable: {
      handler() {
        this.computeOptionsClassName()
      },
      immediate: true
    },
    optionsClassName: {
      handler() {
        this.computeOptionsClassName()
      },
      immediate: true
    },
    optionsFullHeight: {
      handler() {
        this.computeOptionsClassName()
      },
      immediate: true
    },
    optionsVerticalAlign: {
      handler() {
        this.computeOptionsClassName()
      },
      immediate: true
    },
    windowWidth() {
      this.setFullHeight()
    },
    windowHeight() {
      this.setFullHeight()
    },
    containerFullHeight() {
      this.setFullHeight()
    }
  },
  mounted() {
    this.mounted = true
  },
  created() {
    this.setFullHeight()
  },
  methods: {
    computeOptionsClassName () {
      this.$nextTick(() => {
        this.sectionOptions.className = this.getUpdateClassNamesWithKey(this.sectionOptions.className, 'editable', this.editable)
        this.sectionOptions.className = this.getUpdateClassNamesWithKey(
          this.sectionOptions.className, 'vertical-align-center',
          !!this.sectionOptions.fullHeight && this.sectionOptions.verticalAlign === 'center'
        )
        this.sectionOptions.className = this.getUpdateClassNamesWithKey(
          this.sectionOptions.className, 'vertical-align-start',
          !!this.sectionOptions.fullHeight && this.sectionOptions.verticalAlign === 'start'
        )
        this.sectionOptions.className = this.getUpdateClassNamesWithKey(
          this.sectionOptions.className, 'vertical-align-end',
          !!this.sectionOptions.fullHeight && this.sectionOptions.verticalAlign === 'end'
        )
      })
    },
    Resize(newVal) {
      this.windowSize.x = newVal.width
      this.windowSize.y = newVal.height
    },
    setFullHeight() {
      if (this.containerFullHeight === true) {
        this.sectionOptions.style.minHeight = '100vh'
      } else if (this.containerFullHeight !== false) {
        this.sectionOptions.style.minHeight = this.containerFullHeight
      } else {
        this.sectionOptions.style.minHeight = 'auto'
      }
    },
    callAction(event) {
      const path = {
        node: 'widgets'
      }
      const data = {
        event,
        name: 'section',
        path
      }

      this.$emit('onOptionAction', data)
    },
    onDrag (dragStatus) {
      this.$emit('onDrag', dragStatus)
    },
    onOptionAction(data, widgetItem) {
      const event = data.event
      data.path.index = widgetItem.widgetIndex
      const path = {
        node: 'widgets',
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
      this.$emit('onOptionAction', emitData)
    },
    onSubmitElement(widget) {
      let widgetData = widget.item.info
      if (widget.item.info !== undefined) {
        widgetData.options = widget.options
      }
      if (this.action === 'add') {
        if (!this.$props.data?.rows) {
          this.$props.data = {
            rows: []
          }
        }
        this.$props.data.rows[this.eventRow.rowIndex].cols.push(widgetData)
      } else if (this.action === 'edit') {
        widgetData = widget.item
        if (!this.$props.data?.rows) {
          this.$props.data = {
            rows: []
          }
        }
        this.$props.data.rows[this.eventRow.rowIndex] = widgetData
      }
      this.elementFormDialog = false
    },
    setRow(event, rowItem) {
      this.action = event
      this.eventRow = {
        rowIndex: rowItem.rowIndex,
        row: rowItem.row
      }
      if (event === 'add') {
        this.elementFormDialog = true
      } else if (event === 'edit') {
        this.form = this.eventRow.row
        this.form.type = 'row'
        this.elementFormDialog = true
      } else if (event === 'delete') {
        // this.$props.data.rows.splice(this.eventRow.rowIndex, 1)
      } else if (event === 'duplicate') {
        // this.$props.data.rows.push(this.eventRow.row)
      }
    },

    onDragStart (event, widget, widgetIndex) {
      if (!this.editable) {
        return
      }
      event.stopPropagation()
      this.$emit('onDrag', 'DragStart')
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('value', JSON.stringify({ widget, widgetIndex }))
      this.localDraggable = event
      // console.log('onDragStart', event.dataTransfer.getData('value'))
    },
    onDragOver (event) {
      if (!this.editable) {
        return
      }
      event.preventDefault()
      // console.log('onDragOver', event.dataTransfer.getData('value'))
    },
    onDragLeave (event) {
      // if (!props.editable) {
      //
      // }
      /*
      ev.target.style.marginTop = '2px'
      ev.target.style.marginBottom = '2px'
      */
      // console.log('onDragLeave', event.dataTransfer.getData('value'))
    },
    // dragEnter(ev) {
    //   /*
    //   if (ev.clientY > ev.target.height / 2) {
    //     ev.target.style.marginBottom = '10px'
    //   } else {
    //     ev.target.style.marginTop = '10px'
    //   }
    //   */
    // },,
    onDrop (event, newIndex, parent) {
      if (!this.editable) {
        return
      }
      const valueStringField = event.dataTransfer.getData('value')
      const value = valueStringField ? JSON.parse(valueStringField) : null
      const widget = value.widget
      const widgetOldIndex = value.widgetIndex
      const widgetNewIndex = newIndex
      if (this.localDraggable) {
        this.updatePosition(this.computedRows, widgetOldIndex, widgetNewIndex)
      } else {
        this.addToIndex(this.computedRows, widget, widgetNewIndex)
      }

      this.localDraggable = null
      this.$emit('onDrag', 'Drop')
      event.stopPropagation()
    },
    updatePosition (list, oldIndex, newIndex) {
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
    },
    addToIndex (list, newItem, index) {
      if (list.length > index) {
        list.splice(index, 0, newItem)
      } else {
        list.push(newItem)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../Component.scss";
@import 'quasar/src/css/variables.sass';

$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
$border: v-bind('sectionOptions.borderStyle.borderCssString');
$borderRadius: v-bind('sectionOptions.borderStyle.borderRadiusCssString');
$hoverBorder: v-bind('sectionOptions.cssHoverEffects.borderStyle.borderCssString');
$hoverBorderRadius: v-bind('sectionOptions.cssHoverEffects.borderStyle.borderRadiusCssString');
$skewX: v-bind('sectionOptions.cssHoverEffects.borderStyle.borderCssString');
$skewX: v-bind('sectionOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('sectionOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('sectionOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('sectionOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('sectionOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('sectionOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('sectionOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('sectionOptions.cssHoverEffects.transition.time');
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
$responsiveSpacing: (
    xs: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.xs.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.xs.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.xs.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.xs.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.xs.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.xs.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.xs.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.xs.paddingBottom'),
    ),
    sm: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.sm.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.sm.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.sm.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.sm.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.sm.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.sm.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.sm.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.sm.paddingBottom'),
    ),
    md: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.md.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.md.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.md.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.md.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.md.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.md.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.md.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.md.paddingBottom'),
    ),
    lg: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.lg.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.lg.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.lg.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.lg.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.lg.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.lg.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.lg.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.lg.paddingBottom'),
    ),
    xl: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.xl.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.xl.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.xl.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.xl.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.xl.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.xl.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.xl.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.xl.paddingBottom'),
    )
);

.page-builder-section {
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
    border: dashed 2px $primary;
    @if not $border {
      border: $border;
    } @else {
      border: dashed 2px $primary;
    }
  }

  &.full-height-section {
    //min-height: calc(100vh - 86px);
  }

  &.vertical-align-center {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  &.vertical-align-end {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }
  &.vertical-align-start {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
  }

  @include media-query-backgrounds($backgrounds, $sizes);
  @include media-query-spacings($responsiveSpacing, $sizes);
}
</style>
