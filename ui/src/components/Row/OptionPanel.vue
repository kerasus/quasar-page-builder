<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab >
      <div class="option-panel-container">
        row ...
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import {defineComponent} from 'vue'
import mixinOptionPanel from '../../mixin/OptionPanel'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs'

export default defineComponent({
  name: 'RowOptionPanel',
  mixins: [mixinOptionPanel],
  components: {OptionPanelTabs}
})
</script>
