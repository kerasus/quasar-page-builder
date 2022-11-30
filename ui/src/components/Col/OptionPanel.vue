<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab >
      <div class="option-panel-container">
        <q-input v-model="localOptions.colNumber"
                 label="col number"
        />
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import {defineComponent} from 'vue'
import mixinOptionPanel from '../../mixin/OptionPanel'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs'

export default defineComponent({
  name: 'ColOptionPanel',
  mixins: [mixinOptionPanel],
  components: {OptionPanelTabs}
})
</script>
