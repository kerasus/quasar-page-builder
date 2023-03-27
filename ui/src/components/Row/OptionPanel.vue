<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-3">
            <q-checkbox v-model="localOptions.boxed"
                        label="boxed" />
          </div>
          <div class="col-md-9">
            <q-input v-if="!!localOptions.boxed"
                     v-model="localOptions.boxedWidth"
                     label="boxedWidth" />
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
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  }
})
</script>
