<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-3">
            <q-checkbox v-model="useGutter"
                        label="Gutter" />
          </div>
          <div v-if="useGutter"
               class="col-md-9">
            <div class="row">
              <div class="col-md-6">
                <q-select v-model="localOptions.gutterXSize"
                          label="Gutter Horizontal"
                          :options="sizes" />
              </div>
              <div class="col-md-6">
                <q-select v-model="localOptions.gutterYSize"
                          label="Gutter Vertical"
                          :options="sizes" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <q-checkbox v-model="localOptions.boxed"
                        label="Boxed" />
          </div>
          <div class="col-md-9">
            <q-input v-if="!!localOptions.boxed"
                     v-model="localOptions.boxedWidth"
                     label="boxedWidth" />
          </div>
          <div class="col-md-3" />
          <div class="col-md-9">
            <q-input v-model="localOptions.paddingOfBoxedInFullWidth"
                     hint="use when box is in full width state (always use with units like px)"
                     label="PaddingOfBoxedState" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <q-checkbox v-model="isAbsolute"
                        label="Absolute" />
          </div>
          <div class="col-md-9 q-mt-sm">
            <q-option-group v-if="isAbsolute"
                            v-model="defaultOptions.absolute"
                            :options="absoluteOptions"
                            color="primary"
                            inline
                            dense />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import mixinOptionPanel from '../../mixin/OptionPanel.js'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'RowOptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data() {
    return {
      useGutter: true,
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
      isAbsolute: false,
      absoluteOptions: [
        {
          label: 'top',
          value: 'top'
        },
        {
          label: 'right',
          value: 'right'
        },
        {
          label: 'bottom',
          value: 'bottom'
        },
        {
          label: 'left',
          value: 'left'
        }
      ],
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        gutterXSize: 'md',
        gutterYSize: 'md',
        absolute: 'none',
        paddingOfBoxedInFullWidth: '30px',
        style: {}
      }
    }
  },
  watch: {
    isAbsolute (newValue) {
      if (!newValue) {
        this.localOptions.absolute = 'none'
      } else {
        this.localOptions.absolute = 'top'
      }
    },
    useGutter (newValue) {
      this.localOptions.gutterXSize = newValue ? 'md' : null
      this.localOptions.gutterYSize = newValue ? 'md' : null
      this.updateLocalOptions(this.localOptions)
    }
  }
})
</script>
