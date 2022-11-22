<template>
  <div class="widgets-container row q-col-gutter-md">
    <div v-for="item in widgetExpanded"
         :key="item"
         @click="$emit('selectWidget', item)"
         class="col text-center">
      <q-btn outline rounded icon="widgets" color="primary" :label="item.name" />
    </div>
  </div>
</template>

<script>
import {useQuasar} from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageBuilderWidgetList',
  emits: ['selectWidget'],
  setup() {
    const $q = useQuasar()
    const widgetExpanded = $q.$QPageBuilderWidgetList
    return {
      widgetExpanded
    }
  }
})
</script>

<style lang="scss" scoped>
  .widgets-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 15px;

    .widget-item {
      width: 100%;
      height: 85px;
      padding: 5px;
      margin: 10px 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      border: 1px solid $secondary;
      border-radius: 15px;
      transition: all .4s ease;

      .widget-name {
        width: 100%;
        text-align: center;
        font-size: 10px;
      }

      &:hover {
        background: #fefefe;
        box-shadow: 0 4px 20px 0 #f1f2fa;
        transform: scale(1.1);
        transition: all .4s ease;
      }
    }
  }
</style>
