<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab >
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-4">
            <q-checkbox v-model="localOptions.fullHeight"
                        label="fullHeight"
            />
          </div>
          <div class="col-md-4">
            <q-select v-if="!!localOptions.fullHeight"
                      v-model="localOptions.verticalAlign"
                      label="verticalAlign"
                      :options="['center', 'end', 'start']"
            />
          </div>
          <div class="col-md-4">
            input for fullHeight amount
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import {defineComponent} from 'vue'
import mixinOptionPanel from '../../mixin/OptionPanel'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs'

export default defineComponent({
  name: 'SectionOptionPanel',
  components: {OptionPanelTabs},
  mixins: [mixinOptionPanel],
  data: () =>{
    return {
      defaultOptions: {
        fullHeight: false,
        verticalAlign: null,
      }
    }
  },
})
</script>
