<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-6">
      backgroundColor
      <q-color v-model="localValue.backgroundColor"
               label="backgroundColor"
               :default-value="'rgba(34,255,0,0.72)'"
               format-model="rgba"
      />
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col-12">
          <q-input v-model="localValue.backgroundImage"
                   label="backgroundImage"
          />
        </div>
        <div class="col-md-12">
          <q-select v-model="localValue.backgroundPosition"
                    label="backgroundPosition"
                    :options="[
                    'center center',
                    'center top',
                    'center bottom',
                    'left top',
                    'left center',
                    'left bottom',
                    'right top',
                    'right center',
                    'right bottom'
                    ]"
          />
        </div>
        <div class="col-md-12">
          <q-select v-model="localValue.backgroundSize"
                    label="backgroundSize"
                    :options="[
                    'cover',
                    'contain',
                    'inherit',
                    'initial',
                    'revert',
                    'revert-layer',
                    'unset'
                    ]"
          />
        </div>
        <div class="col-md-12">
          <q-select v-model="localValue.backgroundRepeat"
                    label="backgroundRepeat"
                    :options="[
                    'no-repeat',
                    'repeat',
                    'repeat-x',
                    'repeat-y',
                    'space',
                    'round',
                    'initial',
                    'inherit'
                    ]"
          />
        </div>
        <div class="col-md-12">
          <q-select v-model="localValue.backgroundAttachment"
                    label="backgroundAttachment"
                    :options="[
                    'scroll',
                    'fixed',
                    'local',
                    'initial',
                    'inherit'
                    ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  props: {
    value: {
      default: {},
      type: Object
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('update:value', newValue)
      }
    }
  }
}
</script>

<style scoped>

</style>
