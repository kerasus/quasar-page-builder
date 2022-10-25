<template>
  <ComponentWrapper :editable="editable"
                    @callAction="callAction($event)">
    <template v-slot:body>
      <div
        class="page-builder-section"
        :class="className"
        :id="defaultOptions.id"
        :style="style"
      >
        <page-builder-row
          v-for="(row, rowIndex) in data.rows"
          :key="rowIndex"
          v-model:options="row.options"
          :containerFullHeight="containerFullHeight"
          :get-data="getData"
          :editable="editable"
          v-model:cols="row.cols"
          @yieldSelf="setRow($event,{row,rowIndex})"
        />
      </div>
    </template>
  </ComponentWrapper>
  <PageBuilderDialog :dialog="elementFormDialog"
                     :formData="form"
                     :action="action"
                     :type="'col'"
                     @closeDialog="elementFormDialog = false"
                     @submit="onSubmitElement" />
  <q-resize-observer @resize="Resize" />
</template>

<script>
import mixinWidget from '../mixin/Widgets'
import ComponentWrapper from './PageBuilderEditor.vue'
import PageBuilderDialog from './PageBuilderDialog'
import PageBuilderRow from './PageBuilderRow.vue'

export default {
  name: 'PageBuilderSection',
  mixins: [mixinWidget],
  components: {
    PageBuilderRow,
    ComponentWrapper,
    PageBuilderDialog
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getData: {
      type: Function,
      default: () => {}
    },
    editable: {
      type: Boolean,
      default: false
    },
    containerFullHeight: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: ['yieldSelf'],
  data () {
    return {
      defaultBackground: null,
      eventRow: {},
      action: '',
      form: {},
      elementFormDialog: false,
      defaultOptions: {
        background: [],
        style: {}
      },
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
  created () {
    this.setFullHeight()
  },
  computed: {
    windowWidth () {
      return this.windowSize.x
    },
    windowHeight() {
      return this.windowSize.y
    }
  },
  watch: {
    windowWidth () {
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
    setFullHeight () {
      if (this.containerFullHeight === true) {
        this.defaultOptions.style.minHeight = '100vh'
        return
      } else if (this.containerFullHeight !== false) {
        this.defaultOptions.style.minHeight = this.containerFullHeight
      } else {
        this.defaultOptions.style.minHeight = 'auto'
      }
    },
    callAction(event) {
      this.$emit('yieldSelf', event)
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
        this.$props.data.rows.splice(this.eventRow.rowIndex, 1)
      } else if (event === 'duplicate') {
        this.$props.data.rows.push(this.eventRow.row)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-builder-section {
  &.full-height-section {
    //min-height: calc(100vh - 86px);
  }
  &.vertical-align-center {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  //.row {
  //  width: 100%;
  //}
  //display: flex;
  //flex-flow: column;
  /*justify-content: center;*/
  //align-items: center;
}
</style>
