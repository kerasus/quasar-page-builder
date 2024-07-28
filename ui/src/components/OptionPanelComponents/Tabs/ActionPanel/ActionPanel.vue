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
    <div v-if="localOptions.actionName === 'scroll'"
         class="input-container col-md-3">
      <q-input v-model="localOptions.headerOffset"
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
}
</script>

<style scoped>

</style>
