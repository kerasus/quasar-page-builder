<template>
  <div class="page-builder-row items-lg-stretch"
       :class="rowClassName"
       :style="rowOptions.style">
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
                        @onOptionAction="onOptionAction($event, {widget: col, widgetIndex: colIndex, name: 'col'})"
                        @onDrag="onDrag" />
    </div>
  </div>
</template>

<script>
import EditorBox from '../EditorBox.vue'
import PageBuilderCol from '../Col/Col.vue'
import mixinWidget from '../../mixin/Widgets.js'

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
  emits: ['onOptionAction', 'update:options'],
  data() {
    return {
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
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        gutterXSize: null,
        gutterYSize: null,
        absolute: 'none',
        paddingOfBoxedInFullWidth: '30px',
        alignment: {
          justifyContent: {
            global: null,
            xl: null,
            lg: null,
            md: null,
            sm: null,
            xs: null
          },
          alignItems: {
            global: null,
            xl: null,
            lg: null,
            md: null,
            sm: null,
            xs: null
          },
          alignContent: {
            global: null,
            xl: null,
            lg: null,
            md: null,
            sm: null,
            xs: null
          }
        },
        style: {}
      }
    }
  },
  computed: {
    rowOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    },
    rowClassName () {
      return this.rowOptions.className
    }
  },
  watch: {
    rowOptions: {
      handler() {
        this.updateClassName()
        this.updateBoxedStyle()
      },
      deep: true
      // immediate: true
    },
    editable: {
      handler() {
        this.updateClassName()
      }
      // immediate: true
    },
    boxedInFullWidthStatus: {
      handler() {
        this.updateClassName()
      }
      // immediate: true
    }
  },
  created() {
    this.updateClassName()
  },
  mounted() {
    this.updateBoxedStyle()
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
              result = result.replaceAll(item, '')
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
    updateClassName () {
      let newClassName = this.rowOptions.className
      newClassName = this.getUpdateClassNamesWithKey(newClassName, 'editable', this.editable)
      newClassName = this.getUpdateClassNamesWithKey(newClassName, 'boxed', this.rowOptions.boxed)
      newClassName = this.getUpdateClassNamesWithKey(newClassName, 'boxedInFullWidthStatus', this.boxedInFullWidthStatus)
      newClassName = this.getUpdateClassNamesWithKey(newClassName, 'absolute-row absolute-top', this.rowOptions.absolute === 'top')
      newClassName = this.getUpdateClassNamesWithKey(newClassName, 'absolute-row absolute-right', this.rowOptions.absolute === 'right')
      newClassName = this.getUpdateClassNamesWithKey(newClassName, 'absolute-row absolute-bottom', this.rowOptions.absolute === 'bottom')
      newClassName = this.getUpdateClassNamesWithKey(newClassName, 'absolute-row absolute-left', this.rowOptions.absolute === 'left')
      this.rowElementClass = this.rowElementClass.replace(/q-col-gutter-(x|y)-(xs|sm|md|lg|xl)/gi, '')
      if (this.rowOptions.gutterXSize) {
        this.rowElementClass = this.getUpdateClassNamesWithKey(this.rowElementClass, this.getGutterSize(this.rowOptions.gutterXSize, 'x'), this.rowOptions.gutterXSize)
      }
      if (this.rowOptions.gutterYSize) {
        this.rowElementClass = this.getUpdateClassNamesWithKey(this.rowElementClass, this.getGutterSize(this.rowOptions.gutterYSize, 'y'), this.rowOptions.gutterYSize)
      }

      this.rowElementClass = this.getRemoveAlignmentClasses(this.rowElementClass)
      this.rowElementClass = this.rowElementClass.replaceAll('  ', ' ')
      this.rowElementClass += this.getAlignmentClasses()

      this.rowOptions.className = newClassName
    },
    getGutterSize (size, type) {
      return 'q-col-gutter-' + type + '-' + size
    },
    updateBoxedStyle () {
      this.deviceWidth = typeof window !== 'undefined' ? window.innerWidth : 0
      if (!this.rowOptions.boxed) {
        this.rowOptions.style.width = null
        this.rowOptions.style.maxWidth = null
        return
      }

      this.rowOptions.style.maxWidth = this.rowOptions.boxedWidth + 'px'
      this.rowOptions.style.width = this.rowOptions.boxedWidth + 'px'
      this.boxedInFullWidthStatus = this.deviceWidth <= (Number(this.rowOptions.boxedWidth) + this.getPaddingOfBoxedInFullWidth())
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
    }
  }
}
</script>

<style scoped lang="scss">
@import 'quasar/src/css/variables.sass';

.page-builder-row {
  position: relative;
  &.editable {
    border: dashed 2px $primary;
  }
  &.boxed {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    &.boxedInFullWidthStatus {
      padding: 0 v-bind('rowOptions.paddingOfBoxedInFullWidth');
      max-width: 100% !important;
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
}
</style>
