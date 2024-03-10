<template>
  <div ref="pageBuilderRow"
       class="page-builder-row"
       :class="rowClassName"
       :style="optionsStyle"
       @dragover="onDragOver"
       @dragleave="onDragLeave"
       @drop="onDrop($event, 0, true)">
    <editor-box v-if="editable"
                :label="'row'"
                @callAction="callAction" />
    <div :id="rowOptions.id"
         :class="rowElementClass">
      <page-builder-col v-for="(col, colIndex) in cols"
                        :key="'colIndex'+colIndex"
                        v-model:options="col.options"
                        v-model:widgets="col.widgets"
                        :editable="editable"
                        :drag-status="dragStatus"
                        :draggable="editable"
                        @onOptionAction="onOptionAction($event, {widget: col, widgetIndex: colIndex, name: 'col'})"
                        @onDrag="onDrag"
                        @dragstart="onDragStart($event, col, colIndex)"
                        @dragover="onDragOver"
                        @dragleave="onDragLeave"
                        @drop="onDrop($event, colIndex)" />
    </div>
  </div>
</template>

<script>
import EditorBox from '../EditorBox.vue'
import PageBuilderCol from '../Col/Col.vue'
import mixinWidget from '../../mixin/Widgets.js'
import defaultOptions from './DefaultOptions.js'

export default {
  name: 'PageBuilderRow',
  components: {
    PageBuilderCol,
    EditorBox
  },
  mixins: [mixinWidget],
  props: {
    cols: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onOptionAction', 'update:options', 'update:cols', 'onDrag'],
  data () {
    return {
      mounted: false,
      localDraggable: null,
      deviceWidth: 1920,
      boxedInFullWidthStatus: false,
      form: {},
      action: '',
      eventCol: {},
      alignmentOptions: {
        justifyContent: {
          global: [
            null,
            'justify-start',
            'justify-center',
            'justify-end',
            'justify-between',
            'justify-around',
            'justify-evenly'
          ],
          xl: [
            null,
            'justify-xl-start',
            'justify-xl-center',
            'justify-xl-end',
            'justify-xl-between',
            'justify-xl-around',
            'justify-xl-evenly'
          ],
          lg: [
            null,
            'justify-lg-start',
            'justify-lg-center',
            'justify-lg-end',
            'justify-lg-between',
            'justify-lg-around',
            'justify-lg-evenly'
          ],
          md: [
            null,
            'justify-md-start',
            'justify-md-center',
            'justify-md-end',
            'justify-md-between',
            'justify-md-around',
            'justify-md-evenly'
          ],
          sm: [
            null,
            'justify-sm-start',
            'justify-sm-center',
            'justify-sm-end',
            'justify-sm-between',
            'justify-sm-around',
            'justify-sm-evenly'
          ],
          xs: [
            null,
            'justify-xs-start',
            'justify-xs-center',
            'justify-xs-end',
            'justify-xs-between',
            'justify-xs-around',
            'justify-xs-evenly'
          ]
        },
        alignItems: {
          global: [
            null,
            'items-start',
            'items-center',
            'items-end',
            'items-baseline',
            'items-stretch'
          ],
          xl: [
            null,
            'items-xl-start',
            'items-xl-center',
            'items-xl-end',
            'items-xl-baseline',
            'items-xl-stretch'
          ],
          lg: [
            null,
            'items-lg-start',
            'items-lg-center',
            'items-lg-end',
            'items-lg-baseline',
            'items-lg-stretch'
          ],
          md: [
            null,
            'items-md-start',
            'items-md-center',
            'items-md-end',
            'items-md-baseline',
            'items-md-stretch'
          ],
          sm: [
            null,
            'items-sm-start',
            'items-sm-center',
            'items-sm-end',
            'items-sm-baseline',
            'items-sm-stretch'
          ],
          xs: [
            null,
            'items-xs-start',
            'items-xs-center',
            'items-xs-end',
            'items-xs-baseline',
            'items-xs-stretch'
          ]
        },
        alignContent: {
          global: [
            null,
            'content-start',
            'content-center',
            'content-end',
            'content-between',
            'content-around',
            'content-stretch'
          ],
          xl: [
            null,
            'content-xl-start',
            'content-xl-center',
            'content-xl-end',
            'content-xl-between',
            'content-xl-around',
            'content-xl-stretch'
          ],
          lg: [
            null,
            'content-lg-start',
            'content-lg-center',
            'content-lg-end',
            'content-lg-between',
            'content-lg-around',
            'content-lg-stretch'
          ],
          md: [
            null,
            'content-md-start',
            'content-md-center',
            'content-md-end',
            'content-md-between',
            'content-md-around',
            'content-md-stretch'
          ],
          sm: [
            null,
            'content-sm-start',
            'content-sm-center',
            'content-sm-end',
            'content-sm-between',
            'content-sm-around',
            'content-sm-stretch'
          ],
          xs: [
            null,
            'content-xs-start',
            'content-xs-center',
            'content-xs-end',
            'content-xs-between',
            'content-xs-around',
            'content-xs-stretch'
          ]
        }
      },
      elementFormDialog: false,
      rowElementClass: 'row',
      defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
    }
  },
  computed: {
    optionsStyle () {
      if (!this.mounted) {
        return {}
      }

      return this.rowOptions.style
    },
    responsiveShow () {
      let responsiveShow = ''
      Object.keys(this.rowOptions.responsiveShow).forEach(key => {
        if (this.rowOptions.responsiveShow[key] === false) {
          responsiveShow += key + '-hide '
        }
      })

      return ' ' + responsiveShow
    },
    shadows () {
      const shadows = []
      this.rowOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    hoverShadows () {
      const shadows = []
      this.rowOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    rowOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    },
    rowOptionsClassName () {
      return this.rowOptions.className
    },
    rowOptionsResponsiveBoxedWidth () {
      return this.rowOptions.responsiveBoxedWidth
    },
    rowClassName () {
      const isAbsolute = this.rowOptions.absolute === 'top' || this.rowOptions.absolute === 'right' || this.rowOptions.absolute === 'bottom' || this.rowOptions.absolute === 'left'
      return {
        editable: this.editable,
        'boxed rtl-fixed-for-boxed': this.rowOptions.boxed,
        responsiveBoxedWidth: this.rowOptionsResponsiveBoxedWidth,
        boxedInFullWidthStatus: this.boxedInFullWidthStatus,
        'absolute-row': isAbsolute,
        'absolute-top': this.rowOptions.absolute === 'top',
        'absolute-right': this.rowOptions.absolute === 'right',
        'absolute-bottom': this.rowOptions.absolute === 'bottom',
        'absolute-left': this.rowOptions.absolute === 'left',
        [this.rowOptions.className]: true
      }
    },
    computedCol: {
      get () {
        return this.cols
      },
      set (value) {
        this.$emit('update:cols', value)
      }
    }
  },
  watch: {
    rowOptions: {
      handler() {
        this.updateRowElementClass()
        this.updateBoxedStyle()
      },
      deep: true
      // immediate: true
    },
    editable: {
      handler() {
        this.updateRowElementClass()
      }
      // immediate: true
    },
    boxedInFullWidthStatus: {
      handler() {
        this.updateRowElementClass()
      }
      // immediate: true
    }
  },
  created () {
    this.updateRowElementClass()
  },
  mounted () {
    this.mounted = true
    this.updateBoxedStyle()
    this.updateRowElementClass()
    window.addEventListener('resize', () => {
      this.updateBoxedStyle()
    })
  },
  methods: {
    getAlignmentClasses () {
      const geClassItem = (classItem) => {
        return (classItem ? classItem + ' ' : '')
      }
      const getResponsiveClasses = (object) => {
        return geClassItem(object.global) +
            geClassItem(object.xl) +
            geClassItem(object.lg) +
            geClassItem(object.md) +
            geClassItem(object.sm) +
            geClassItem(object.xs)
      }
      return ' ' + getResponsiveClasses(this.rowOptions.alignment.justifyContent) +
          getResponsiveClasses(this.rowOptions.alignment.alignItems) +
          getResponsiveClasses(this.rowOptions.alignment.alignContent)
    },
    getRemoveAlignmentClasses (classNames) {
      let result = classNames
      const removeByObject = (object) => {
        const removeArray = (array) => {
          array.forEach(item => {
            if (item) {
              if (!result) {
                result = ''
              }
              if (typeof result !== 'string') {
                result = result.toString()
              }
              result = String(result).replace(new RegExp(item, 'g'), ' ')
            }
          })
        }
        removeArray(object.global)
        removeArray(object.xl)
        removeArray(object.lg)
        removeArray(object.md)
        removeArray(object.sm)
        removeArray(object.xs)
      }
      removeByObject(this.alignmentOptions.justifyContent)
      removeByObject(this.alignmentOptions.alignItems)
      removeByObject(this.alignmentOptions.alignContent)

      return result
    },
    updateRowElementClass () {
      this.rowElementClass = this.rowElementClass.replace(/q-col-gutter-([xy])-(xs|sm|md|lg|xl)/gi, '')
      if (this.rowOptions.gutterXSize) {
        this.rowElementClass = this.getUpdateClassNamesWithKey(this.rowElementClass, this.getGutterSize(this.rowOptions.gutterXSize, 'x'), this.rowOptions.gutterXSize)
      }
      if (this.rowOptions.gutterYSize) {
        this.rowElementClass = this.getUpdateClassNamesWithKey(this.rowElementClass, this.getGutterSize(this.rowOptions.gutterYSize, 'y'), this.rowOptions.gutterYSize)
      }

      this.rowElementClass = this.getRemoveAlignmentClasses(this.rowElementClass)
      this.rowElementClass = String(this.rowElementClass).replace(/\s+/g, ' ')
      this.rowElementClass += this.getAlignmentClasses()
    },
    getGutterSize (size, type) {
      return 'q-col-gutter-' + type + '-' + size
    },
    updateBoxedStyle () {
      // pageBuilderRow
      if (!this.rowOptions.boxed || this.rowOptions.responsiveBoxedWidth) {
        this.rowOptions.style.width = null
        this.rowOptions.style.maxWidth = null
        this.boxedInFullWidthStatus = false
        return
      }

      // this.deviceWidth = typeof window !== 'undefined' ? window.innerWidth : 0
      const pageBuilderRowWidth = (this.$refs.pageBuilderRow) ? this.$refs.pageBuilderRow.offsetWidth : 1920

      this.rowOptions.style.maxWidth = this.rowOptions.boxedWidth + 'px'
      this.rowOptions.style.width = this.rowOptions.boxedWidth + 'px'
      // this.boxedInFullWidthStatus = this.deviceWidth <= (Number(this.rowOptions.boxedWidth) + this.getPaddingOfBoxedInFullWidth())
      this.boxedInFullWidthStatus = pageBuilderRowWidth <= (Number(this.rowOptions.boxedWidth) + this.getPaddingOfBoxedInFullWidth())
    },
    getPaddingOfBoxedInFullWidth() {
      const padding = this.rowOptions.paddingOfBoxedInFullWidth.split('px')
      if (padding && padding.length > 0) {
        return Number(padding[0])
      } else {
        return 0
      }
    },
    onSubmitElement(widget) {
      const widgetData = widget.item.type === 'widget' ? widget.item : widget.item.info
      if (widget.item.info !== undefined) {
        widgetData.options = widget.options
      }
      if (this.action === 'add') {
        this.$props.cols[this.eventCol.colIndex].widgets.push(widgetData)
      } else if (this.action === 'edit') {
        this.$props.cols[this.eventCol.colIndex] = widgetData
      }
      this.elementFormDialog = false
    },
    callAction(event) {
      const path = {
        node: 'data.rows'
      }
      const data = {
        event,
        path,
        name: 'row'
      }
      this.$emit('onOptionAction', data)
    },
    onDrag (dragStatus) {
      this.$emit('onDrag', dragStatus)
    },
    onOptionAction (data, widgetItem) {
      const event = data.event
      data.path.index = widgetItem.widgetIndex
      const path = {
        node: 'data.rows',
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
        this.updatePosition(this.computedCol, widgetOldIndex, widgetNewIndex)
      } else {
        this.addToIndex(this.computedCol, widget, widgetNewIndex)
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
    },
    removeFromIndex (list, index) {
      list.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../Component.scss";
@import 'quasar/src/css/variables.sass';

$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
$border: v-bind('rowOptions.borderStyle.borderCssString');
$borderRadius: v-bind('rowOptions.borderStyle.borderRadiusCssString');
$hoverBorder: v-bind('rowOptions.cssHoverEffects.borderStyle.borderCssString');
$hoverBorderRadius: v-bind('rowOptions.cssHoverEffects.borderStyle.borderRadiusCssString');
$skewX: v-bind('rowOptions.cssHoverEffects.borderStyle.borderCssString');
$skewX: v-bind('rowOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('rowOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('rowOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('rowOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('rowOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('rowOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('rowOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('rowOptions.cssHoverEffects.transition.time');
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
$responsiveBoxedWidths: (
    xs: (
        width: v-bind('defaultOptions.responsiveBoxedWidths.xs.width')
    ),
    sm: (
        width: v-bind('defaultOptions.responsiveBoxedWidths.sm.width')
    ),
    md: (
        width: v-bind('defaultOptions.responsiveBoxedWidths.md.width')
    ),
    lg: (
        width: v-bind('defaultOptions.responsiveBoxedWidths.lg.width')
    ),
    xl: (
        width: v-bind('defaultOptions.responsiveBoxedWidths.xl.width')
    )
);

@mixin media-query-boxed-width($min-width, $responsiveBoxedWidth) {
  @media (min-width: $min-width) {
    & {
      width: map_get($responsiveBoxedWidth, 'width');
      max-width: map_get($responsiveBoxedWidth, 'width');
      min-width: map_get($responsiveBoxedWidth, 'width');
    }
  }
}

@mixin media-query-boxed-widths($responsiveBoxedWidths, $sizes) {
  @each $name, $min-width in $sizes {
    $responsiveBoxedWidth: map_get($responsiveBoxedWidths, $name);
    @include media-query-boxed-width($min-width, $responsiveBoxedWidth);
  }
}

.page-builder-row {
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
    @if not $border {
      border: $border;
    } @else {
      border: dashed 2px $primary;
    }
  }
  &.boxed.rtl-fixed-for-boxed {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    &.boxedInFullWidthStatus {
      padding: 0 v-bind('rowOptions.paddingOfBoxedInFullWidth');
      @include media-query-spacings($responsiveSpacing, $sizes, true, false);
      max-width: 100% !important;
    }

    &.responsiveBoxedWidth {
      @include media-query-boxed-widths($responsiveBoxedWidths, $sizes);
    }
  }
  &.absolute-row {
    position: absolute;
    &.absolute-top {
      bottom: 0;
      width: 100%;
      max-width: 100%;
      //min-width: 100%;
    }
    &.absolute-bottom {
      bottom: 0;
      width: 100%;
      max-width: 100%;
      //min-width: 100%;
    }
    &.absolute-right {
      left: 0;
      height: 100%;
      max-height: 100%;
      min-height: 100%;
    }
    &.absolute-left {
      right: 0;
      height: 100%;
      max-height: 100%;
      min-height: 100%;
    }
  }

  @include media-query-backgrounds($backgrounds, $sizes);
  @include media-query-spacings($responsiveSpacing, $sizes);
}
</style>
