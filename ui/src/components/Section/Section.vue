<template>
  <div class="page-builder-section"
       :class="sectionClassName"
       :id="sectionOptions.id"
       :style="sectionOptions.style"
  >
    <editor-box v-if="editable"
                :label="'section'"
                @callAction="callAction"
    />
    <q-resize-observer @resize="Resize"/>
    <page-builder-row v-for="(row, rowIndex) in data.rows"
                      :key="rowIndex"
                      v-model:cols="row.cols"
                      v-model:options="row.options"
                      :get-data="getData"
                      :editable="editable"
                      @onOptionAction="onOptionAction($event, {widget: row, widgetIndex: rowIndex, name: 'row'})"
    />
  </div>
</template>

<script>
import EditorBox from '../EditorBox.vue'
import PageBuilderRow from '../Row/Row.vue'
import mixinWidget from '../../mixin/Widgets'

export default {
  name: 'PageBuilderSection',
  mixins: [mixinWidget],
  components: {
    EditorBox,
    PageBuilderRow,
  },
  props: {
    getData: {
      type: Function,
      default: () => {
      }
    }
  },
  emits: ['onOptionAction', 'update:options'],
  data() {
    return {
      defaultBackground: null,
      eventRow: {},
      action: '',
      form: {},
      elementFormDialog: false,
      defaultOptions: {
        fullHeight: false,
        className: '',
        background: [],
        style: {}
      },
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
  created() {
    this.setFullHeight()
  },
  computed: {
    sectionOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    },
    sectionClassName () {
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

      return this.sectionOptions.className
    },
    containerFullHeight: {
      get() {
        if (!this.sectionOptions?.fullHeight) {
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
  methods: {
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
        node: 'widgets',
      }
      const data = {
        event,
        name: 'section',
        path
      }
      this.$emit('onOptionAction', data)
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
.page-builder-section {
  position: relative;
  &.editable {
    border: dashed 2px $primary;
    padding-top: 40px;
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
}
</style>
