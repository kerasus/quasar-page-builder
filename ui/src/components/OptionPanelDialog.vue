<template>
  <q-dialog v-model="showValue"
            full-width
            @before-show="setTab"
  >
    <q-card class="element-form-dialog-card">
      <q-card-section>
        <div class="header">
          <div class="title">
            <template v-if="actionType==='add'">
              widget list
            </template>
            <template v-if="actionType==='edit'">
              {{ optionPanel }}
            </template>
          </div>
          <div class="close">
            <q-btn color="primary"
                   icon="close"
                   @click="close"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <component v-if="actionType==='edit' && optionPanel"
                   :is="optionPanel"
                   v-model:options="localWidgetOptions"
        />
        <widget-list v-if="actionType==='add' && widgetName==='col'"
                     @selectWidget="onSelectWidget"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {useQuasar} from 'quasar'
import WidgetList from './WidgetList'
import ColOptionPanel from './Col/OptionPanel'
import RowOptionPanel from './Row/OptionPanel'
import SectionOptionPanel from './Section/OptionPanel'
import PageBuilderOptionPanel from './PageBuilderOptionPanel'
import {defineComponent, defineAsyncComponent, ref} from 'vue'

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
  emits: ['closeDialog', 'addWidget', 'update:widgetOptions', 'update:show'],
  methods: {
    onSelectWidget (data) {
      this.$emit('addWidget', data)
    }
  },
  setup(props, {emit}) {
    const $q = useQuasar()
    const widgetExpanded = $q.$QPageBuilderWidgetList
    widgetExpanded.forEach(element => {
      if (element.optionPanel !== undefined) {
        const optionPanelName = element.optionPanelName
        const optionPanelPath = element.optionPanel.replace('OptionPanel.vue', '')
        components[optionPanelName] = defineAsyncComponent(() => {
          return import('src/' + optionPanelPath + 'OptionPanel.vue')
        })
      }
    })

    const optionPanel = ref('')
    const loadDynamicComponentForEditPanel = () => {
      const targetOptionPanel = widgetExpanded.find(widget => widget.name === props.widgetName)
      if (props.widgetName === 'pageBuilder' || props.widgetName === 'section' || props.widgetName === 'row' || props.widgetName === 'col') {
        optionPanel.value = props.widgetName.charAt(0).toUpperCase() + props.widgetName.slice(1) + 'OptionPanel'
      } else if (targetOptionPanel?.optionPanel !== undefined) {
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
  }
})
</script>

<style lang="scss">
.element-form-dialog-card {
  width: 666px;
  .header {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
}

.base-elements-wrapper {
  display: flex;
  margin: 10px 40px;

  .base-elements-item {
    width: 100px;
    height: 85px;
    padding: 5px;
    margin: 10px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    border: 1px solid $secondary;
    border-radius: 15px;
    transition: all .4s ease;

    .base-elements-name {
      width: 100%;
      text-align: center;
      font-size: 10px;
    }

    &:hover {
      background: #fefefe;
      box-shadow: 0 4px 20px 0 #f1f2fa;
      transform: scale(1.1);
      transition: all .4s ease;
    }
  }
}
</style>
