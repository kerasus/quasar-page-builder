<template>
  <div class="row q-col-gutter-md justify-center">
    <div class="col-md-2 -col-12">
      <q-icon name="live_tv"
              size="lg"
              color="grey" />
      <q-checkbox v-model="localResponsiveShow.xl"
                  label="xl"
                  @update:model-value="onChange" />
    </div>
    <div class="col-md-2 -col-12">
      <q-icon name="computer"
              size="lg"
              color="grey" />
      <q-checkbox v-model="localResponsiveShow.lg"
                  label="lg"
                  @update:model-value="onChange" />
    </div>
    <div class="col-md-2 -col-12">
      <q-icon name="laptop"
              size="lg"
              color="grey" />
      <q-checkbox v-model="localResponsiveShow.md"
                  label="md"
                  @update:model-value="onChange" />
    </div>
    <div class="col-md-2 -col-12">
      <q-icon name="tablet_android"
              size="lg"
              color="grey" />
      <q-checkbox v-model="localResponsiveShow.sm"
                  label="sm"
                  @update:model-value="onChange" />
    </div>
    <div class="col-md-2 -col-12">
      <q-icon name="phone_iphone"
              size="lg"
              color="grey" />
      <q-checkbox v-model="localResponsiveShow.xs"
                  label="xs"
                  @update:model-value="onChange" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponsiveShow',
  props: {
    responsiveShow: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data: () => {
    return {
      defaultResponsiveShow: {
        xl: true,
        lg: true,
        md: true,
        sm: true,
        xs: true
      }
    }
  },
  computed: {
    localResponsiveShow: {
      get () {
        return Object.assign(this.defaultResponsiveShow, this.responsiveShow)
      },
      set (newValue) {
        this.$emit('update:responsiveShow', newValue)
      }
    }
  },
  methods: {
    onChange () {
      this.$emit('update:responsiveShow', this.localResponsiveShow)
    }
  }
}
</script>

<style scoped>

</style>
