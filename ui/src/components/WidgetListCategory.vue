<template>
  <q-card class="full-width">
    <template v-if="isAllItemWidget()">
      <div class="row">
        <div v-for="tabKey in tabKeys"
             :key="tabKey"
             class="col-12">
          <q-btn outline
                 rounded
                 icon="widgets"
                 color="primary"
                 class="full-width"
                 :label="item[tabKey].name"
                 @click="onSelectWidget(item[tabKey])"
                 @selectWidget="onSelectWidget" />
        </div>
      </div>
    </template>
    <template v-else>
      <q-tabs v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              :vertical="tabKeys.length > 3"
              narrow-indicator>
        <q-tab v-for="tabKey in tabKeys"
               :key="tabKey"
               :name="tabKey"
               :label="tabKey" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab"
                    animated>
        <q-tab-panel v-for="tabKey in tabKeys"
                     :key="tabKey"
                     :name="tabKey">
          <div class="text-h6">{{ tabKey }}</div>
          <q-btn v-if="isCategoryItemWidget(item[tabKey])"
                 outline
                 rounded
                 icon="widgets"
                 color="primary"
                 :label="item[tabKey].name"
                 @click="onSelectWidget(item[tabKey])"
                 @selectWidget="onSelectWidget" />
          <widget-list-category v-else
                                :item="item[tabKey]"
                                @selectWidget="onSelectWidget" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-card>
</template>

<script>
export default {
  name: 'WidgetListCategory',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tab: null
    }
  },
  computed: {
    tabKeys () {
      return Object.keys(this.item)
    }
  },
  methods: {
    isAllItemWidget () {
      const widgetCount = Object.keys(this.item).filter(key => this.isCategoryItemWidget(this.item[key])).length
      const categoryCount = Object.keys(this.item).length
      return widgetCount === categoryCount
    },
    onSelectWidget (data) {
      this.$emit('selectWidget', data)
    },
    isCategoryItemWidget (categoryItemWidget) {
      return Object.keys(categoryItemWidget).filter(key => typeof categoryItemWidget[key] === 'string').length > 0
    }
  }
}
</script>

<style scoped lang="scss">
:deep(.q-panel) {
    & > div {
        padding: 3px;
    }
}
</style>
