<template>
  <div
    class="page-builder"
    :class="className"
    :style="style"
  >
    <page-builder-section
      v-for="(section, sectionIndex) in sections"
      :key="sectionIndex"
      v-model:options="section.options"
      :containerFullHeight="section.options.fullHeight.value ? section.options.height.value : false"
      :get-data="getData"
      :editable="editable"
      v-model:data="section.data"
      @yieldSelf="setSection($event, {section, sectionIndex})"
    />
    <PageBuilderDialog :dialog="elementFormDialog"
                       :formData="form"
                       :action="action"
                       :type="addType"
                       @closeDialog="elementFormDialog = false"
                       @submit="onSubmitElement" />
    <q-page-sticky position="bottom-left"
                   :offset="[18, 18]">
      <q-btn color="primary"
             v-if="preview"
             :icon="editable ? 'preview' : 'data_array'"
             @click="$emit('toggleEdit')" />
    </q-page-sticky>
  </div>
</template>

<script>
import PageBuilderSection from './PageBuilderSection.vue'
import mixinWidget from '../mixin/Widgets'
import GetWidgetsData from '../mixin/GetWidgetsData'
import PageBuilderDialog from './PageBuilderDialog'

export default {
  name: 'PageBuilder',
  mixins: [mixinWidget],
  components: {
    PageBuilderSection,
    PageBuilderDialog
  },
  emits: ['toggleEdit'],
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editable: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      height: '',
      action: '',
      addType: '',
      form: {},
      eventSection: {},
      elementFormDialog: false
    }
  },
  created() {
    this.defaultOptions = Object.assign(this.defaultOptions, this.options)
    if (this.$props.editable) {
      this.initialSection()
    }
  },

  methods: {
    getData (url) {
      return GetWidgetsData.getData(url)
    },
    calculateHeight (height) {
      this.height = height
    },
    setSection(event, sectionItem) {
      this.action = event
      this.addType = 'row'
      this.eventSection = {
        sectionIndex: sectionItem.sectionIndex,
        section: sectionItem.section
      }
      if (event === 'add') {
        this.elementFormDialog = true
      } else if (event === 'edit') {
        this.form = this.eventSection.section
        this.form.type = 'section'
        this.elementFormDialog = true
      } else if (event === 'delete') {
        this.$props.sections.splice(this.eventSection.sectionIndex, 1)
      } else if (event === 'duplicate') {
        this.$props.sections.push(this.eventSection.section)
      }
    },
    onSubmitElement(widget) {
      if (this.$props.sections.length === 0 && this.action === 'initial') {
        const section = {
          data: {
            rows: []
          },
          options: {
            fullHeight: widget.options.fullHeight,
            height: widget.options.height,
            verticalAlign: widget.options.verticalAlign
          }
        }
        this.$props.sections.push(section)
      }
      let widgetData = widget.item.info
      if (this.action === 'add') {
        widgetData.options = widget.options
        this.$props.sections[this.eventSection.sectionIndex].data.rows.push(widgetData)
      } else if (this.action === 'edit') {
        widgetData = widget.item
        this.$props.sections[this.eventSection.sectionIndex] = widgetData
      }
      this.elementFormDialog = false
    },
    initialSection() {
      if (this.$props.sections.length === 0) {
        this.addType = 'section'
        this.action = 'initial'
        this.elementFormDialog = true
      }
    },
    extractWidgets(json) {
      const widgets = []
      json.children.forEach(element => {
        if (element.type === 'widget') {
          widgets.push(element)
        } else {
          // eslint-disable-next-line no-prototype-builtins
          if (element.hasOwnProperty('children')) {
            extractWidgets(element)
          }
        }
      })
      return widgets
    }
  },
  watch: {
    editable: {
      deep: true,
      handler() {
        this.initialSection()
      }
    }
  }
}
</script>

<style scoped></style>
