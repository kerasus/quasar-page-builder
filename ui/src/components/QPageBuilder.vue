<template>
  <div :class="pageBuilderClassName"
       :style="pageBuilderOptions.style">
    <template v-if="!loading">
      <editor-box v-if="pageBuilderEditable"
                  label="page-builder"
                  :show-delete="false"
                  :show-duplicate="false"
                  @callAction="onPageBuilderEdit" />
      <page-builder-section v-for="(section, sectionIndex) in pageBuilderSections"
                            :key="sectionIndex"
                            v-model:data="section.data"
                            v-model:options="section.options"
                            :editable="pageBuilderEditable"
                            :drag-status="localDragStatus"
                            @onOptionAction="onOptionAction($event, {widget: section, widgetIndex: sectionIndex, name: 'section'})"
                            @onDrag="onDrag" />
      <option-panel-dialog v-model:widget-options="selectedNode.widget.options"
                           v-model:show="optionPanelDialog"
                           :action-type="selectedNode.event"
                           :widget-name="selectedNode.name"
                           @closeDialog="optionPanelDialog = false"
                           @submit="onSubmitElement"
                           @addWidget="onAddWidget" />
      <q-btn v-if="preview"
             color="primary"
             :icon="pageBuilderEditable ? 'preview' : 'data_array'"
             class="btn-toggle-edit-page-builder"
             @click="toggleEdit" />
    </template>
    <template v-else>
      <slot name="loading">
        <div class="PageBuilderLoading">
          <q-spinner-grid color="primary"
                          size="3em" />
        </div>
      </slot>
    </template>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
import mixinWidget from '../mixin/Widgets.js'
import EditorBox from '../components/EditorBox.vue'
import PageBuilderSection from './Section/Section.vue'
import OptionPanelDialog from './OptionPanelDialog.vue'

export default {
  name: 'QPageBuilder',
  components: {
    EditorBox,
    OptionPanelDialog,
    PageBuilderSection
  },
  mixins: [mixinWidget],
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
    loading: {
      type: Boolean,
      default: false
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
  emits: ['toggleEdit', 'update:options', 'exported', 'notExported'],
  data() {
    return {
      localDragStatus: null,
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
  computed: {
    pageBuilderEditable: {
      get() {
        return this.editable
      },
      set(newValue) {
        this.$emit('update:editable', newValue)
      }
    },
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
        return Object.assign(this.defaultOptions, this.options)
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    },
    pageBuilderClassName() {
      return 'page-builder ' + this.pageBuilderOptions.className
    }
  },
  watch: {
    pageBuilderOptions: {
      handler() {
        this.updateClassName()
      },
      deep: true
    },
    editable () {
      this.updateClassName()
    }
  },
  created() {
    this.updateClassName()
  },
  methods: {
    updateClassName () {
      this.pageBuilderOptions.className = this.getUpdateClassNamesWithKey(this.pageBuilderOptions.className, 'editable', this.editable)
    },
    getWidgetNameFromTagName(tagName) {
      const regex = /-./gms
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
      if (!selectedNode || !selectedNode.widget || !selectedNode.widget.options) {
        selectedNode.widget.options = {}
      }
      this.selectedNode.widget.options = selectedNode.widget.options
      // this.selectedNode.widget.options = selectedNode?.widget?.options ? selectedNode.widget.options : {}
    },
    onPageBuilderEdit(event) {
      if (event === 'add') {
        this.pageBuilderSections.push({
          data: {
            rows: []
          }
        })
        return
      }
      if (event === 'export') {
        this.copyExportedConfig(this.pageBuilderSections)
        return
      }
      if (event === 'import') {
        const sections = prompt('data: ', '')
        if (sections != null) {
          this.pageBuilderSections = JSON.parse(sections)
        }
        return
      }
      this.selectedNode.event = event
      this.selectedNode.name = 'pageBuilder'
      this.selectedNode.widget.name = 'pageBuilder'
      this.selectedNode.widget.options = this.pageBuilderOptions
      this.optionPanelDialog = true
    },
    copyExportedConfig (config) {
      copyToClipboard(JSON.stringify(config))
        .then(() => {
          this.$emit('exported', config)
          if (this.$q.notify) {
            this.$q.notify({
              message: 'Copied to the clipboard!',
              type: 'positive'
            })
          }
        })
        .catch(() => {
          this.$emit('notExported', config)
          if (this.$q.notify) {
            this.$q.notify({
              type: 'negative',
              message: 'Could not copy!'
            })
          }
        })
    },
    onAddWidget (widget) {
      this.actionOnSelectedNode((parent, node, index) => {
        // const widgetName = widget.name[0].toLowerCase() + widget.name.slice(1, widget.name.length).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
        const widgetName = widget.name
        node.widgets.push({
          name: widgetName
        })
      })
    },
    onDrag (dragStatus) {
      this.localDragStatus = dragStatus
    },
    onOptionAction(selectedNode, selectedSection) {
      this.setNodeName(selectedNode)
      this.setOptionPanelData(selectedNode, selectedSection)
      this.actionOnSelectedNode((parent, node, index) => {
        if (selectedNode.event === 'add') {
          if (selectedNode.name === 'section') {
            node.data.rows.push({
              cols: []
            })
          } else if (selectedNode.name === 'row') {
            node.cols.push({
              widgets: []
            })
          } else if (selectedNode.name === 'col') {
            this.optionPanelDialog = true
          }
        } else if (selectedNode.event === 'edit') {
          this.selectedNode.widget = node
          this.optionPanelDialog = true
        } else if (selectedNode.event === 'delete') {
          parent.splice(index, 1)
        } else if (selectedNode.event === 'duplicate') {
          parent.splice(index, 0, JSON.parse(JSON.stringify(node)))
        } else if (selectedNode.event === 'export') {
          this.copyExportedConfig(node)
        } else if (selectedNode.event === 'import') {
          const newNode = prompt('data: ', '')
          if (newNode != null) {
            const newNodeObject = JSON.parse(newNode)
            if (selectedNode.name === 'section') {
              node.data.rows = newNodeObject.data.rows
              node.options = newNodeObject.options
            } else if (selectedNode.name === 'row') {
              node.data.cols = newNodeObject.data.cols
              node.options = newNodeObject.options
            } else if (selectedNode.name === 'col') {
              node.widgets = newNodeObject.widgets
              node.options = newNodeObject.options
            } else {
              node.options = newNodeObject.options
            }
          }
        }
      })
    },
    actionOnSelectedNode(callback) {
      this.actionOnNode(this.selectedNode, callback)
    },
    actionOnNode(node, callback) {
      this.getNodeByPath(node.path, { widgets: this.pageBuilderSections }, callback)
    },
    onSubmitElement(widget) {
      if (this.selectedNode.event === 'edit') {
        this.actionOnSelectedNode((parent, node, index) => {
          node.options = widget.options
        })
      }
    },
    toggleEdit () {
      this.$emit('toggleEdit')
    }
  }
}
</script>

<style scoped lang="scss">
@import 'quasar/src/css/variables.sass';

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
.PageBuilderLoading {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
