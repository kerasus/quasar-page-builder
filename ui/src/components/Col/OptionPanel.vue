<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-border-style-tab="true"
                     :show-box-shadows-tab="true"
                     :show-hover-effects-tab="true"
                     :show-responsive-show="true">
    <template #main-tab>
      <q-expansion-item expand-separator
                        label="Responsive Grid">
        <q-list bordered>
          <q-item v-for="size in sizes"
                  :key="size">
            <q-item-section avatar>
              {{ size }}
            </q-item-section>
            <q-item-section>
              <q-slider v-model="sizeValue[size]"
                        :min="1"
                        :max="12"
                        :step="1"
                        :label-value="sizeValue[size] ? (sizeValue[size] + '/12') : 0"
                        label
                        color="light-green"
                        @update:modelValue="calcColNumberClass" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item expand-separator
                        label="Responsive Order">
        <q-list bordered>
          <q-item v-for="size in sizes"
                  :key="size">
            <q-item-section avatar>
              {{ size }}
            </q-item-section>
            <q-item-section>
              <q-input v-model="localOptions.responsiveOrder[size]"
                       type="number" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item expand-separator
                        label="Responsive BackGround">
        <responsive-back-ground v-model:options="localOptions.backgrounds" />
      </q-expansion-item>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import defaultOptions from './DefaultOptions.js'
import mixinOptionPanel from '../../mixin/OptionPanel.js'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs.vue'
import ResponsiveBackGround from '../OptionPanelComponents/ResponsiveBackGround.vue'

export default defineComponent({
  name: 'ColOptionPanel',
  components: { ResponsiveBackGround, OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data: () => {
    return {
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
      sizeValue: {},
      responsiveOrderTab: 'md',
      defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
    }
  },
  created () {
    this.updateSizeValueFromOptionsColNumber()
  },
  methods: {
    calcColNumberClass () {
      this.localOptions.colNumber = Object.keys(this.sizeValue).map(key => this.getCol(key, this.sizeValue[key])).join(' ')
    },
    updateSizeValueFromOptionsColNumber () {
      if (typeof this.localOptions.colNumber !== 'string') {
        return
      }
      this.localOptions.colNumber.split(' ').forEach(className => {
        const target = this.getSizeFromClass(className)
        if (target) {
          this.sizeValue[target.size] = target.value
        }
      })
    },
    getSizeFromClass (className) {
      let target = null
      let value = null
      this.sizes.forEach(size => {
        if (className.includes('-' + size + '-')) {
          target = size
          value = className.replace('col-', '').replace(size + '-', '')
        }
      })

      if (target) {
        return { size: target, value }
      }

      return null
    },
    getCol (size, number) {
      if (!size) {
        return ''
      }
      return 'col-' + size + '-' + number
    }
  }
})
</script>
