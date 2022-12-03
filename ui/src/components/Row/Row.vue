<template>
  <div class="page-builder-row"
       :class="rowClassName"
<<<<<<< HEAD
       :style="rowOptions?.style"
=======
       :style="rowOptions.style"
>>>>>>> f5d31bb604d339a737480794fde17936362721c2
  >
    <div class="row"
         :id="defaultOptions.id"
    >
      <editor-box v-if="editable"
                  :label="'row'"
                  @callAction="callAction"
      />
      <page-builder-col v-for="(col, colIndex) in cols"
                        :key="'colIndex'+colIndex"
                        v-model:options="col.options"
                        v-model:widgets="col.widgets"
<<<<<<< HEAD
                        :get-data="getData"
=======
>>>>>>> f5d31bb604d339a737480794fde17936362721c2
                        :editable="editable"
                        @onOptionAction="onOptionAction($event, {widget: col, widgetIndex: colIndex, name: 'col'})"
      />
    </div>
  </div>
</template>

<script>
import EditorBox from '../EditorBox.vue'
import PageBuilderCol from '../Col/Col.vue'
<<<<<<< HEAD
import mixinWidget from '../../mixin/Widgets'
=======
import mixinWidget from '../../mixin/Widgets.js'
>>>>>>> f5d31bb604d339a737480794fde17936362721c2

export default {
  name: 'PageBuilderRow',
  mixins: [mixinWidget],
  components: {
    PageBuilderCol,
    EditorBox,
  },
  emits: ['onOptionAction', 'update:options'],
  data() {
    return {
      deviceWidth: 1920,
      boxedInFullWidthStatus: false,
      form: {},
      action: '',
      eventCol: {},
      elementFormDialog: false,
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  },
  watch: {
    rowOptions: {
      handler() {
        this.updateClassName()
        this.updateBoxedStyle()
      },
      deep: true
    },
    editable () {
      this.updateClassName()
    },
    boxedInFullWidthStatus () {
      this.updateClassName()
    }
  },
  computed: {
    rowOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options);
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    },
    rowClassName () {
      return this.rowOptions.className
    },
  },
  props: {
    cols: {
      type: Object,
      default: () => {
        return {}
      }
    },
<<<<<<< HEAD
    getData: {
      type: Function,
      default: () => {
      }
    },
=======
>>>>>>> f5d31bb604d339a737480794fde17936362721c2
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  created() {
    this.updateClassName()
    this.updateBoxedStyle()
    window.addEventListener('resize', () => {
      this.updateBoxedStyle()
    })
  },
  methods: {
    updateClassName () {
      this.rowOptions.className = this.getUpdateClassNamesWithKey(this.rowOptions.className, 'editable', this.editable)
      this.rowOptions.className = this.getUpdateClassNamesWithKey(this.rowOptions.className, 'boxed', this.rowOptions.boxed)
      this.rowOptions.className = this.getUpdateClassNamesWithKey(this.rowOptions.className, 'boxedInFullWidthStatus', this.boxedInFullWidthStatus)
    },
    updateBoxedStyle () {
      this.deviceWidth = window.innerWidth
      if (!this.defaultOptions.boxed) {
<<<<<<< HEAD
=======
        this.defaultOptions.style.width = null
        this.defaultOptions.style.maxWidth = null
>>>>>>> f5d31bb604d339a737480794fde17936362721c2
        return
      }

      this.defaultOptions.style.maxWidth = this.defaultOptions.boxedWidth + 'px'
      this.defaultOptions.style.width = this.defaultOptions.boxedWidth + 'px'
      this.boxedInFullWidthStatus = this.deviceWidth <= this.defaultOptions.boxedWidth
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
        node: 'data.rows',
      }
      const data = {
        event,
        path,
        name: 'row'
      }
      this.$emit('onOptionAction', data)
    },
    onOptionAction (data, widgetItem) {
      const event = data.event
      data.path.index = data.widgetIndex ? data.widgetIndex : widgetItem.widgetIndex
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

<style lang="scss" scoped>
<<<<<<< HEAD
.page-builder-row {
  position: relative;
  //:deep(.widget-editor-box) {
  //  display: none;
  //}
  //&:hover {
  //  :deep(.widget-editor-box) {
  //    display: block;
  //  }
  //}
=======
@import 'quasar/src/css/variables.sass';

.page-builder-row {
  position: relative;
>>>>>>> f5d31bb604d339a737480794fde17936362721c2
  &.editable {
    border: dashed 2px $primary;
    padding-top: 40px;
  }
  &.boxed {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    width: 1200px;

    &.boxedInFullWidthStatus {
      padding-right: 15px;
      padding-left: 15px;
      max-width: 100% !important;
      width: 100% !important;
    }
  }
}
</style>
