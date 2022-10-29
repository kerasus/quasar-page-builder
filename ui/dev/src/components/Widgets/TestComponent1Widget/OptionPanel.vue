<template>
  <div class="option-panel-container">
    <div class="data">data: {{data}}</div>
    <div class="options">options: {{options}}</div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name:"TestComponent1WidgetOptionPanel",
  props: {
      data: {
          type: Object,
          default: () => {}
      },
      options: {
          type: Object,
          default: () => {}
      }
  },
  setup(){
      return {

      }
  }
})
</script>
