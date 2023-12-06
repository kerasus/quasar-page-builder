<template>
  <div class="widgets-container">
    <widget-list-category :item="categoriezedWidget"
                          @selectWidget="onSelectWidget" />
  </div>
</template>

<script>
import * as shvl from 'shvl'
import { useQuasar } from 'quasar'
import { defineComponent } from 'vue'
import WidgetListCategory from './WidgetListCategory.vue'

export default defineComponent({
  name: 'PageBuilderWidgetList',
  components: { WidgetListCategory },
  emits: ['selectWidget'],
  setup() {
    const $q = useQuasar()
    const widgetExpanded = $q.$QPageBuilderWidgetList

    function getCategorizedWidget (widgetExpanded) {
      const categories = {}
      widgetExpanded.forEach(widgetItem => {
        shvl.set(categories, widgetItem.path.replaceAll('/', '.'), widgetItem)
      })

      function isCategoryItemWidget (categoryItemWidget) {
        return Object.keys(categoryItemWidget).filter(key => typeof categoryItemWidget[key] === 'string').length > 0
      }
      function createUnCategoriezedItem (categoriezedObject) {
        const widgetCount = Object.keys(categoriezedObject).filter(key => isCategoryItemWidget(categoriezedObject[key])).length
        const categoryCount = Object.keys(categoriezedObject).length
        const isAllItemWidget = widgetCount === categoryCount
        Object.keys(categoriezedObject).forEach(key => {
          const isWidget = isAllItemWidget || isCategoryItemWidget(categoriezedObject[key])
          if (isWidget && !isAllItemWidget) {
            if (!categoriezedObject.unCategoriezed) {
              categoriezedObject.unCategoriezed = {}
            }
            categoriezedObject.unCategoriezed[key] = categoriezedObject[key]
            delete categoriezedObject[key]
          } else if (!isAllItemWidget) {
            createUnCategoriezedItem(categoriezedObject[key])
          }
        })
      }

      createUnCategoriezedItem(categories)
      return categories
    }

    const categoriezedWidget = getCategorizedWidget(widgetExpanded)

    return {
      categoriezedWidget
    }
  },
  methods: {
    onSelectWidget (data) {
      this.$emit('selectWidget', data)
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
