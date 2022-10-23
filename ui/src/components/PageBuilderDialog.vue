<template>
  <q-dialog full-width
            @before-show="setTab"
            v-model="dialogValue">
    <q-card class="element-form-dialog-card">
      <q-card-section>
        <q-btn color="primary"
               icon="close"
               @click="close" />
      </q-card-section>
      <q-card-section>
        <q-tab-panels v-model="tab"
                      animated>
          <q-tab-panel name="action">
            <div class="widget-panel">
              <div class="base-elements">
                <div class="element-title">المان های اصلی</div>
                <div class="base-elements-wrapper">
                  <q-btn v-for="(value,key,index)  in baseElements"
                         :key="index"
                         @click="selectWidget(value)"
                         :disable="value.allowed.includes(type) === false"
                         class="base-elements-item">
                    <q-icon size="40px"
                            name="widgets"
                            color="primary" />
                    <div class="base-elements-name">{{key}}</div>
                  </q-btn>
                </div>
              </div>
              <q-separator class="q-my-md"
                           v-if="type==='widget'" />
              <div class="widgets-element"
                   v-if="type==='widget'">
                <div class="element-title">المان های صفحه</div>
                <PageBuilderWidgetList
                  @selectWidget="selectWidget($event)" />
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="form">
            <PageBuilderForm :formData="form"
                             @submit="passFormData($event)" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import PageBuilderForm from './PageBuilderForm.vue'
import PageBuilderWidgetList from './PageBuilderWidgetList.vue'

export default defineComponent({
  name: 'PageBuilderDialog',
  components: {
    PageBuilderForm,
    PageBuilderWidgetList
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {}
    },
    action: {
      type: String,
      default: 'add'
    },
    type: {
      type: String,
      required: true
    }
  },
  emits: ['submit', 'closeDialog'],
  setup(props, { emit }) {
    const dialogValue = computed(() => {
      return props.dialog
    })
    const tab = ref('action')
    const form = ref({})
    const selectedItem = ref({})
    const baseElements = ref({
      section: {
        name: 'section',
        options: {
          fullHeight: {
            label: 'ارتفاع کامل',
            type: 'boolean',
            value: false,
            name: 'fullHeight'
          },
          height: {
            label: 'ارتفاع کامل',
            type: 'text',
            value: '100vh',
            name: 'height'
          },
          verticalAlign: {
            label: 'چینش عمودی',
            type: 'text',
            value: 'center',
            name: 'verticalAlign'
          }
        },
        info: {
          data: {
            rows: []
          },
          options: {},
          type: 'section'
        },
        type: 'base',
        allowed: ['section', 'widget']
      },
      row: {
        name: 'row',
        options: {
          boxed: {
            label: 'باکس باشد؟',
            type: 'boolean',
            value: false,
            name: 'boxed'
          },
          boxedWidth: {
            label: 'عرض باکس',
            type: 'number',
            value: 1362,
            name: 'boxedWidth'
          }
        },
        info: {
          cols: [],
          options: {},
          type: 'row'
        },
        type: 'base',
        allowed: ['row']
      },
      col: {
        name: 'col',
        options: {
          boxed: {
            label: 'باکس باشد؟',
            type: 'boolean',
            value: false,
            name: 'boxed'
          },
          boxedWidth: {
            label: 'عرض باکس',
            type: 'number',
            value: 1362,
            name: 'boxedWidth'
          },
          colNumber: {
            label: 'تعداد ستون',
            type: 'text',
            value: 'col-12',
            name: 'colNumber'
          },
          className: {
            label: 'کلاس متفرقه',
            type: 'text',
            value: '',
            name: 'className'
          }
        },
        info: {
          widgets: [],
          type: 'col'
        },
        type: 'base',
        allowed: ['col']
      }
    })
    const passFormData = (event) => {
      const data = {
        options: event,
        item: selectedItem.value,
        action: props.action
      }
      emit('submit', data)
      close()
    }
    const selectWidget = (element) => {
      selectedItem.value = element
      form.value = element.options
      tab.value = 'form'
    }

    const close = () => {
      emit('closeDialog')
      tab.value = 'action'
      form.value = {}
    }

    const setTab = (event) => {
      if (props.action === 'edit') {
        selectWidget(props.formData)
      }
    }

    return {
      dialogValue,
      tab,
      form,
      baseElements,
      passFormData,
      selectWidget,
      close,
      setTab
    }
  }
})
</script>

<style
  lang="scss"
  scoped
>
.element-form-dialog-card {
  width: 666px !important;
}
.page-builder-section {
  background: $secondary;
}
.element-title {
  font-size: 18px;
}

.base-elements-wrapper{
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
