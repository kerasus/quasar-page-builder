<template>
  <div class="page-builder"
       :class="className"
       :style="pageBuilderOptions.style"
  >
    <editor-box v-if="editable"
                label="page-builder"
                :show-delete="false"
                :show-duplicate="false"
                @callAction="onPageBuilderEdit"
    />
    <page-builder-section v-for="(section, sectionIndex) in pageBuilderSections"
                          :key="sectionIndex"
                          v-model:data="section.data"
                          v-model:options="section.options"
                          :get-data="getData"
                          :editable="editable"
                          @onOptionAction="onOptionAction($event, {widget: section, widgetIndex: sectionIndex, name: 'section'})"
    />
    <option-panel-dialog v-model:widget-options="selectedNode.widget.options"
                         :show="optionPanelDialog"
                         :action-type="selectedNode.event"
                         :widget-name="selectedNode.name"
                         @closeDialog="optionPanelDialog = false"
                         @submit="onSubmitElement"
                         @addWidget="onAddWidget"
    />
    <q-btn v-if="preview"
           color="primary"
           :icon="editable ? 'preview' : 'data_array'"
           @click="$emit('toggleEdit')"
           class="btn-toggle-edit-page-builder"
    />
  </div>
</template>

<script>
import {useQuasar} from 'quasar'
import {defineAsyncComponent} from 'vue'
import mixinWidget from '../mixin/Widgets'
import OptionPanelDialog from './OptionPanelDialog'
import EditorBox from '../components/EditorBox.vue'
import GetWidgetsData from '../mixin/GetWidgetsData'
import PageBuilderSection from './Section/Section.vue'

export default {
  name: 'PageBuilder',
  mixins: [mixinWidget],
  components: {
    EditorBox,
    OptionPanelDialog,
    PageBuilderSection
  },
  emits: ['toggleEdit'],
  computed: {
    pageBuilderSections: {
      get() {
        return this.sections
      },
      set(newValue) {
        this.$emit('update:sections', newValue)
      }
    },
    pageBuilderOptions: {
      get() {
        return this.options
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    },
  },
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
      sampleEmptySection: {
        data: {}
      },
      sampleEmptyRow: {
        cols: []
      },
      sampleEmptyCol: {
        widgets: []
      },
      optionPanelDialog: false,
      selectedNode: {
        event: null,
        name: null,
        widget: {
          options: {}
        }
      }
    }
  },
  created() {
    this.defaultOptions = Object.assign(this.defaultOptions, this.options)
    if (this.$props.editable) {
      this.initialSection()
    }
  },
  methods: {
    getData(url) {
      return GetWidgetsData.getData(url)
    },
    getWidgetNameFromTagName(tagName) {
      let regex = /-./gms;
      return tagName.slice(0, 1).toUpperCase() + tagName.slice(1).replace(regex, (match) => {
        return match.replace('-', '').toUpperCase()
      })
    },
    getNodeByPath(path, nodesData, callback) {
      let result = null
      let parent = null
      let index = null
      if (path.node !== 'data.rows') {
        parent = nodesData[path.node]
        index = path.index
        result = parent[index]
      } else {
        parent = nodesData.data.rows
        index = path.index
        result = parent[index]
      }

      if (path.child) {
        return this.getNodeByPath(path.child, result, callback)
      }

      if (typeof callback === 'function') {
        callback(parent, result, index)
      }
      return result
    },
    setNodeName(node) {
      if (node.name) {
        return
      }
      node.name = this.getWidgetNameFromTagName(node.widget.name)
    },
    setOptionPanelData(selectedNode, selectedSection) {
      selectedNode.path.index = selectedSection.widgetIndex
      this.selectedNode = selectedNode
      if (!this.selectedNode.widget) {
        this.selectedNode.widget = {}
      }
      this.selectedNode.widget.options = selectedNode?.widget?.options ? selectedNode.widget.options : {}
    },
    onPageBuilderEdit(event) {
      if (event === 'add') {
        this.pageBuilderSections.push(this.sampleEmptySection)
        return
      }
      this.selectedNode.event = event
      this.selectedNode.name = 'pageBuilder'
      this.selectedNode.widget.name = 'pageBuilder'
      this.selectedNode.widget.options = this.pageBuilderOptions
      this.optionPanelDialog = true
    },
    onAddWidget (widget) {
      this.actionOnSelectedNode((parent, node, index) => {
        node.widgets.push({name: widget.name[0].toLowerCase() + widget.name.slice(1, widget.name.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)})
      })
    },
    onOptionAction(selectedNode, selectedSection) {
      this.setNodeName(selectedNode)
      this.setOptionPanelData(selectedNode, selectedSection)
      this.actionOnSelectedNode((parent, node, index) => {
        if (selectedNode.event === 'add') {
          if (selectedNode.name === 'section') {
            node.data.rows.push(this.sampleEmptyRow)
          } else if (selectedNode.name === 'row') {
            node.cols.push(this.sampleEmptyCol)
          }
          this.optionPanelDialog = true
        } else if (selectedNode.event === 'edit') {
          this.selectedNode.widget = node
          this.optionPanelDialog = true
        } else if (selectedNode.event === 'delete') {
          parent.splice(index, 1)
        } else if (selectedNode.event === 'duplicate') {
          parent.splice(index, 0, node)
        }
      })
    },
    actionOnSelectedNode(callback) {
      this.actionOnNode(this.selectedNode, callback)
    },
    actionOnNode(node, callback) {
      this.getNodeByPath(node.path, {widgets: this.pageBuilderSections}, callback)
    },
    onSubmitElement(widget) {
      if (this.selectedNode.event === 'edit') {
        this.actionOnSelectedNode((parent, node, index) => {
          node.options = widget.options
        })
        return
      }
    },
    initialSection() {
      if (this.pageBuilderSections.length !== 0) {
        return
      }
      this.selectedNode.name = 'section'
      this.selectedNode.event = 'initial'
      this.optionPanelDialog = true
    },
  },
  watch: {
    editable() {
      this.initialSection()
    }
  },
  setup() {
    const $q = useQuasar()
    const widgetExpanded = $q.$QPageBuilderWidgetList

    function registerWidgets(widgetsList) {
      const components = {}
      const optionPanels = {}
      widgetsList.forEach(element => {
        const widgetComponentName = element.name
        const widgetComponentPath = element.path + '/' + widgetComponentName
        const widgetOptionPanelPath = element.path + '/' + 'OptionPanel'
        components[widgetComponentName] = defineAsyncComponent(() => import('src/' + widgetComponentPath + '.vue'))
        if (element.optionPanel) {
          optionPanels[widgetComponentName] = {
            name: widgetComponentName,
            tagName: widgetComponentName[0].toLowerCase() + widgetComponentName.slice(1, widgetComponentName.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`),
            path: 'src/' + widgetOptionPanelPath + '.vue'
          }
        }
      })
      window.$pageBuilderWidgetComponents = components
      window.$pageBuilderWidgetOptionPanels = optionPanels
    }

    registerWidgets(widgetExpanded)
  }
}
</script>

<style scoped lang="scss">
.page-builder {
  position: relative;

  &.editable {
    border: dashed 2px $primary;
    padding-top: 40px;
  }

  .btn-toggle-edit-page-builder {
    position: fixed;
    left: 20px;
    bottom: 20px;
    z-index: 99999;
  }
}
</style>
