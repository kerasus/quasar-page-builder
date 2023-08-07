<template>
  <div :id="sectionOptions.id"
       :class="sectionClassName"
       :style="sectionOptions.style">
    <editor-box v-if="editable"
                :label="'section'"
                @callAction="callAction" />
    <q-resize-observer @resize="Resize" />
    <page-builder-row v-for="(row, rowIndex) in data.rows"
                      :key="rowIndex"
                      v-model:cols="row.cols"
                      v-model:options="row.options"
                      :editable="editable"
                      :drag-status="dragStatus"
                      @onOptionAction="onOptionAction($event, {widget: row, widgetIndex: rowIndex, name: 'row'})"
                      @onDrag="onDrag" />
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
  emits: ['onOptionAction', 'update:options'],
  data() {
    return {
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
    responsiveShow () {
      let responsiveShow = ''
      debugger
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
      return 'page-builder-section ' + this.sectionOptions.className + this.responsiveShow
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
  created() {
    this.setFullHeight()
  },
  methods: {
    computeOptionsClassName () {
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
        this.$props.data.rows[this.eventRow.rowIndex].cols.push(widgetData)
      } else if (this.action === 'edit') {
        widgetData = widget.item
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
    }
  }
}
</script>

<style scoped lang="scss">
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

@mixin media-query-background($min-width, $size, $color, $image, $repeat, $position, $attachment) {
  @media (min-width: $min-width) {
    & {
      background-size: $size;
      background-color: $color;
      background-image: $image;
      background-repeat: $repeat;
      background-position: $position;
      background-attachment: $attachment;
    }
  }
}

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

  @each $name, $min-width in $sizes {
    $background: map_get($backgrounds, $name);
    $size: map_get($background, 'size');
    $color: map_get($background, 'color');
    $image: map_get($background, 'image');
    $repeat: map_get($background, 'repeat');
    $position: map_get($background, 'position');
    $attachment: map_get($background, 'attachment');
    @include media-query-background($min-width, $size, $color, $image, $repeat, $position, $attachment);
  }
}
</style>
