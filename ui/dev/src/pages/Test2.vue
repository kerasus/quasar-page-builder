<template>
  <q-page padding>
    <q-page-builder
      v-model:sections="sections"
      v-model::options="pageConfig"
      :preview="true"
      :editable="editable"
      @toggleEdit="toggleEdit"
    />
  </q-page>
</template>

<script>
export default {
  name: 'BaseComponent',
  data() {
    return {
      editable: false,
      pageConfig: {},
      sections: [],
    }
  },
  methods: {
    toggleEdit() {
      this.editable = !this.editable
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
