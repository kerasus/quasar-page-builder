<template>
  <ComponentWrapper :editable="editable"
                    :label="'row'"
                    @callAction="callAction($event)">
    <template v-slot:body>
      <div :class="{'boxed': options?.boxed?.value, 'boxedInFullWidthStatus': boxedInFullWidthStatus}"
           :style="style"
      >
        <div class="page-builder-row row"
             :id="defaultOptions.id"
        >
          <page-builder-col
            v-for="(col, colIndex) in cols"
            :key="colIndex"
            v-model:options="col.options"
            :containerFullHeight="containerFullHeight"
            :get-data="getData"
            :editable="editable"
            @yieldSelf="setCol($event,{col,colIndex})"
            v-model:widgets="col.widgets"
          />
        </div>
      </div>
    </template>
  </ComponentWrapper>
  <PageBuilderDialog :dialog="elementFormDialog"
                     :formData="form"
                     :action="action"
                     :type="'widget'"
                     @closeDialog="elementFormDialog = false"
                     @submit="onSubmitElement" />
</template>

<script>
import PageBuilderCol from './PageBuilderCol.vue'
import mixinWidget from '../mixin/Widgets'
import ComponentWrapper from './PageBuilderEditor.vue'
import PageBuilderDialog from './PageBuilderDialog'

export default {
  name: 'PageBuilderRow',
  mixins: [mixinWidget],
  components: {
    PageBuilderCol,
    ComponentWrapper,
    PageBuilderDialog
  },
  props: {
    cols: {
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
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      deviceWidth: 1920,
      boxedInFullWidthStatus: false,
      form: {},
      action: '',
      eventCol: {},
      elementFormDialog: false,
      defaultOptions: {
        height: 'auto',
        boxedWidth: 1200
      }
    }
  },
  created() {
    this.updateBoxedStyle()
    window.addEventListener('resize', () => {
      this.updateBoxedStyle()
    })
  },
  methods: {
    updateBoxedStyle () {
      this.deviceWidth = window.innerWidth
      if (!this.defaultOptions.boxed) {
        return
      }

      this.defaultOptions.style.maxWidth = this.defaultOptions.boxedWidth + 'px'
      this.defaultOptions.style.width = this.defaultOptions.boxedWidth + 'px'
      this.boxedInFullWidthStatus = this.deviceWidth <= this.defaultOptions.boxedWidth
    },
    onResize () {
      this.updateBoxedStyle()
    },
    callAction(event) {
      this.$emit('yieldSelf', event)
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
    setCol(event, colItem) {
      this.action = event
      this.eventCol = {
        colIndex: colItem.colIndex,
        col: colItem.col
      }
      if (event === 'add') {
        this.elementFormDialog = true
      } else if (event === 'edit') {
        this.form = this.eventCol.col
        this.form.type = 'col'
        this.elementFormDialog = true
      } else if (event === 'delete') {
        this.$props.cols.splice(this.eventCol.colIndex, 1)
      } else if (event === 'duplicate') {
        this.$props.cols.push(this.eventCol.col)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.boxed {
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
</style>
