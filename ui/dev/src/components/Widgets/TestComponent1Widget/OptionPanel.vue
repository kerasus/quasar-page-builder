<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab >
      <div class="option-panel-container">
        <div class="option-panel-container">
          <div class="data">data: {{data}}</div>
          <div class="options">options: {{options}}</div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel, OptionPanelTabs } from 'ui'

export default defineComponent({
  name:"TestComponent1WidgetOptionPanel",
  mixins: [mixinOptionPanel],
  components: {OptionPanelTabs}
})
</script>
