<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab >
      <div class="option-panel-container">
        page builder ...
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import {defineComponent} from 'vue'
<<<<<<< HEAD
import mixinOptionPanel from '../mixin/OptionPanel'
import OptionPanelTabs from './OptionPanelComponents/OptionPanelTabs'
=======
import mixinOptionPanel from '../mixin/OptionPanel.js'
import OptionPanelTabs from './OptionPanelComponents/OptionPanelTabs.vue'
>>>>>>> f5d31bb604d339a737480794fde17936362721c2

export default defineComponent({
  name: 'ColOptionPanel',
  mixins: [mixinOptionPanel],
  components: {OptionPanelTabs}
})
</script>
