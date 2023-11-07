<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-border-style-tab="true"
                     :show-box-shadows-tab="true"
                     :show-hover-effects-tab="true"
                     :show-responsive-spacing="true"
                     :show-responsive-show="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-4">
            <q-checkbox v-model="useFullHeight"
                        label="fullHeight" />
          </div>
          <div class="col-md-4">
            <q-input v-if="useFullHeight"
                     v-model="localOptions.fullHeight"
                     label="FullHeight value" />
          </div>
          <div class="col-md-4">
            <q-select v-if="useFullHeight"
                      v-model="localOptions.verticalAlign"
                      label="verticalAlign"
                      :options="['center', 'end', 'start']" />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <q-separator class="q-mt-md q-mb-sm" />
            Background
            <q-banner dense
                      class="bg-primary text-white">
              don't use background in style directly
            </q-banner>
          </div>
          <div class="col-12">
            <responsive-back-ground v-model:options="localOptions.backgrounds" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import defaultOptions from './DefaultOptions.js'
import mixinOptionPanel from '../../mixin/OptionPanel.js'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs.vue'
import ResponsiveBackGround from '../OptionPanelComponents/ResponsiveBackGround/ResponsiveBackGround.vue'

export default defineComponent({
  name: 'SectionOptionPanel',
  components: { OptionPanelTabs, ResponsiveBackGround },
  mixins: [mixinOptionPanel],
  data: () => {
    return {
      useFullHeight: false,
      defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
    }
  },
  watch: {
    useFullHeight (newValue) {
      this.defaultOptions.fullHeight = newValue
    }
  },
  created () {
    const oldFullHeight = this.localOptions.fullHeight
    this.useFullHeight = !!this.localOptions.fullHeight
    this.$nextTick(() => {
      this.localOptions.fullHeight = oldFullHeight
    })
  }
})
</script>
