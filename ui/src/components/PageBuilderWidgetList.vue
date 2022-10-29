<template>
  <div class="row">
    <div class="col-12">
      <div class="widgets-container">
        <div v-for="item in widgetExpanded"
             :key="item"
             @click="$emit('selectWidget', item)"
             class="widget-item">
          <q-icon size="40px"
                  name="widgets"
                  color="primary" />
          <div class="widget-name">{{item.name.split(/(?=[A-Z])/).join(' ')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { widgetExpanded } from 'src/boot/page-builder'

export default defineComponent({
  name: 'PageBuilderWidgetList',
  emits: ['selectWidget'],
  setup() {
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
      width: 100px;
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
