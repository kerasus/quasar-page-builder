<template>
  <div :style="options.style"
       :class="options.className">
    <q-btn color="primary">
      test btn
    </q-btn>
  </div>
</template>

<script>
import { mixinWidget } from 'ui'

export default {
  name: 'ButtonWidget',
  mixins: [mixinWidget]
}
</script>

<style scoped>
div {
  border: solid 1px red;
}
</style>
