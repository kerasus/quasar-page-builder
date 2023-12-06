<template>
  <q-dialog v-model="showValue"
            class="quasar-page-builder-dialog"
            :persistent="false"
            @before-show="setTab">
    <q-card class="quasar-page-builder-dialog-card">
      <q-card-section>
        <div class="header">
          <div class="title">
            <template v-if="actionType==='add'">
              widget list
            </template>
            <template v-else-if="actionType==='edit'">
              {{ optionPanel }}
            </template>
            <template v-else-if="actionType==='import'">
              import to {{ optionPanel }}
            </template>
          </div>
          <div class="close">
            <q-btn color="primary"
                   icon="close"
                   @click="close" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <component :is="optionPanel"
                   v-if="actionType==='edit' && optionPanel"
                   v-model:options="localWidgetOptions" />
        <template v-else-if="actionType==='add' && widgetName==='col'">
          <q-btn color="primary"
                 class="full-width q-mb-md"
                 label="add section"
                 @click="addSection" />
          <widget-list @selectWidget="onSelectWidget" />
        </template>
        <div v-else-if="actionType==='import'" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar } from 'quasar'
import WidgetList from './WidgetList.vue'
import { defineComponent, ref } from 'vue'
import ColOptionPanel from './Col/OptionPanel.vue'
import RowOptionPanel from './Row/OptionPanel.vue'
import SectionOptionPanel from './Section/OptionPanel.vue'
import PageBuilderOptionPanel from './PageBuilderOptionPanel.vue'

const components = {
  WidgetList,
  ColOptionPanel,
  RowOptionPanel,
  SectionOptionPanel,
  PageBuilderOptionPanel
}

export default defineComponent({
  name: 'PageBuilderDialog',
  components,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    actionType: {
      type: String,
      default: 'add'
    },
    widgetName: {
      type: String,
      default: null
    },
    widgetOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['closeDialog', 'addWidget', 'update:widgetOptions', 'update:show'],
  setup(props, { emit }) {
    const $q = useQuasar()
    if ($q.$pageBuilderWidgetOptionPanels) {
      Object.assign(components, $q.$pageBuilderWidgetOptionPanels)
    }

    const widgetExpanded = $q.$QPageBuilderWidgetList

    const optionPanel = ref('')
    const loadDynamicComponentForEditPanel = () => {
      const targetOptionPanel = widgetExpanded.find(widget => widget.name === props.widgetName)
      if (props.widgetName === 'pageBuilder' || props.widgetName === 'section' || props.widgetName === 'row' || props.widgetName === 'col') {
        optionPanel.value = props.widgetName.charAt(0).toUpperCase() + props.widgetName.slice(1) + 'OptionPanel'
      } else if (targetOptionPanel && targetOptionPanel.optionPanel !== undefined) {
        optionPanel.value = targetOptionPanel.optionPanelName
      } else {
        optionPanel.value = null
      }
    }

    const close = () => {
      emit('closeDialog')
    }

    const setTab = (event) => {
      if (props.actionType === 'edit' && props.widgetName) {
        loadDynamicComponentForEditPanel()
      }
    }

    return {
      optionPanel,
      loadDynamicComponentForEditPanel,
      close,
      setTab
    }
  },
  computed: {
    showValue: {
      get() {
        return this.show
      },
      set(newValue) {
        this.$emit('update:show', newValue)
      }
    },
    localWidgetOptions: {
      get() {
        return this.widgetOptions
      },
      set(newValue) {
        this.$emit('update:widgetOptions', newValue)
      }
    }
  },
  methods: {
    addSection () {
      this.$emit('addWidget', {
        name: 'NestedSection',
        optionPanel: '',
        optionPanelName: 'SectionOptionPanel',
        path: '',
        self_type: '',
        type: 'widget'
      })
    },
    onSelectWidget (data) {
      this.$emit('addWidget', data)
    }
  }
})
</script>

<style lang="scss">
.quasar-page-builder-dialog {
  .quasar-page-builder-dialog-card {
    width: 900px;
    max-width: 80vw;
    .header {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
    }
  }
}
</style>
