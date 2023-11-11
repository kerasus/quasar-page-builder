<template>
  <div class="row q-col-gutter-sm">
    <div class="col-md-2">
      <q-checkbox v-model="localOptions.hasAction" left-label label="has action" />
    </div>
    <div v-if="localOptions.hasAction" class="input-container col-md-2">
      <q-select v-model="localOptions.actionName"
                :options="actionOptions" />
    </div>
    <div v-if="localOptions.actionName === 'scroll'"
         class="input-container col-md-8">
      <q-input v-model="localOptions.scrollTo"
               label="scrollTo" />
    </div>
    <div v-if="localOptions.actionName === 'link'"
         class="input-container col-md-8">
      <q-input v-model="localOptions.route"
               label="route" />
    </div>
    <div v-if="localOptions.actionName === 'event'"
         class="input-container col-md-4">
      <q-input v-model="localOptions.eventName"
               label="eventName" />
    </div>
    <div v-if="localOptions.actionName === 'event'"
         class="input-container col-md-4">
      <q-input v-model="localOptions.eventArgs"
               label="eventArgs" />
    </div>
<!--    <div v-if="localOptions.action === 'hamburger_menu'"-->
<!--         class="input-container col-md-12">-->
<!--      <q-expansion-item label="topWidgets">-->
<!--        <q-card>-->
<!--          <q-card-section v-for="(widget, index) in localOptions.topSectionWidgets"-->
<!--                          :key="index">-->
<!--            <q-expansion-item :label=widget.name-->
<!--                              icon="build">-->
<!--              <template v-slot:header>-->
<!--                <q-item-section avatar>-->
<!--                  <q-icon name="build" />-->
<!--                </q-item-section>-->

<!--                <q-item-section>-->
<!--                  {{ widget.name }}-->
<!--                </q-item-section>-->

<!--                <q-item-section side>-->
<!--                  <q-btn color="negative"-->
<!--                         flat-->
<!--                         icon="delete"-->
<!--                         @click="deleteWidget('topSectionWidgets', index)" />-->
<!--                </q-item-section>-->
<!--              </template>-->
<!--              <q-card>-->
<!--                <q-card-section>-->
<!--                  <option-panel v-if="widget.name === 'ActionButton'"-->
<!--                                v-model:options="widget.options" />-->
<!--                  <component :is="widget.name.concat('OptionPanel')"-->
<!--                             v-model:options="widget.options" />-->
<!--                </q-card-section>-->
<!--              </q-card>-->
<!--            </q-expansion-item>-->
<!--          </q-card-section>-->
<!--          <q-card-section>-->
<!--            <div class="row q-col-gutter-md">-->
<!--              <div>-->
<!--                <q-btn icon="isax:add"-->
<!--                       class="full-width"-->
<!--                       color="positive"-->
<!--                       label="text"-->
<!--                       @click="addTextWidget('topSectionWidgets')" />-->
<!--              </div>-->
<!--              <div>-->
<!--                <q-btn icon="isax:add"-->
<!--                       class="full-width"-->
<!--                       color="positive"-->
<!--                       label="image"-->
<!--                       @click="addImageWidget('topSectionWidgets')" />-->
<!--              </div>-->
<!--              <div>-->
<!--                <q-btn icon="isax:add"-->
<!--                       class="full-width"-->
<!--                       color="positive"-->
<!--                       label="action button"-->
<!--                       @click="addActionButtonWidget('topSectionWidgets')" />-->
<!--              </div>-->
<!--            </div>-->
<!--          </q-card-section>-->
<!--        </q-card>-->
<!--      </q-expansion-item>-->
<!--      <q-expansion-item label="bottomWidgets">-->
<!--        <q-card>-->
<!--          <q-card-section v-for="(widget, index) in localOptions.bottomSectionWidgets"-->
<!--                          :key="index">-->
<!--            <q-expansion-item :label=widget.name-->
<!--                              icon="build">-->
<!--              <template v-slot:header>-->
<!--                <q-item-section avatar>-->
<!--                  <q-icon name="build" />-->
<!--                </q-item-section>-->

<!--                <q-item-section>-->
<!--                  {{ widget.name }}-->
<!--                </q-item-section>-->

<!--                <q-item-section side>-->
<!--                  <q-btn color="negative"-->
<!--                         flat-->
<!--                         icon="delete"-->
<!--                         @click="deleteWidget('bottomSectionWidgets', index)" />-->
<!--                </q-item-section>-->
<!--              </template>-->
<!--              <q-card>-->
<!--                <q-card-section>-->
<!--                  <component :is="widget.name.concat('OptionPanel')"-->
<!--                             v-model:options="widget.options" />-->
<!--                </q-card-section>-->
<!--              </q-card>-->
<!--            </q-expansion-item>-->
<!--          </q-card-section>-->
<!--          <q-card-section>-->
<!--            <div class="row q-col-gutter-md">-->
<!--              <div class="col-3">-->
<!--                <q-btn icon="isax:add"-->
<!--                       class="full-width"-->
<!--                       color="positive"-->
<!--                       label="text"-->
<!--                       @click="addTextWidget('bottomSectionWidgets')" />-->
<!--              </div>-->
<!--              <div class="col-3">-->
<!--                <q-btn icon="isax:add"-->
<!--                       class="full-width"-->
<!--                       color="positive"-->
<!--                       label="image"-->
<!--                       @click="addImageWidget('bottomSectionWidgets')" />-->
<!--              </div>-->
<!--              <div class="col-3">-->
<!--                <q-btn icon="isax:add"-->
<!--                       class="full-width"-->
<!--                       color="positive"-->
<!--                       label="action button"-->
<!--                       @click="addActionButtonWidget('bottomSectionWidgets')" />-->
<!--              </div>-->
<!--              <div class="col-3">-->
<!--                <q-btn icon="isax:add"-->
<!--                       class="full-width"-->
<!--                       color="positive"-->
<!--                       label="timer"-->
<!--                       @click="addTimerWidget('bottomSectionWidgets')" />-->
<!--              </div>-->
<!--            </div>-->
<!--          </q-card-section>-->
<!--        </q-card>-->
<!--      </q-expansion-item>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "ActionPanel",
  props: {
    action: {
      type: Object,
      default: () => {
      }
    },
  },
  data() {
    return {
      actionOptions: ['scroll', 'link', 'event'],
    }
  },
  computed: {
    localOptions: {
      get() {
        return this.action
      },
      set(newValue) {
        this.$emit('update:action', newValue)
      }
    }
  },
  mounted() {
    console.log(this.localOptions)
  }
}
</script>

<style scoped>

</style>
