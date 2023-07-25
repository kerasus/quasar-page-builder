<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div />
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
  name: 'TestComponent1WidgetOptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data: () => {
    return {
      defaultOptions: {
        style: {},
        boxShadows: [],
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        },
        cssHoverEffects: {
          boxShadows: [],
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      }
    }
  }
})
</script>
