<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <div>
        transition time ({{ localValue.cssHoverEffects.transition.time }}s)
      </div>
      <q-slider v-model="localValue.cssHoverEffects.transition.time"
                :min="0"
                :max="10"
                :step="0.1" />
      <div>
        Rotate ({{ localValue.cssHoverEffects.transform.rotate }}deg)
      </div>
      <q-slider v-model="localValue.cssHoverEffects.transform.rotate"
                :min="0"
                :max="360" />
      <div>
        Scale X ({{ localValue.cssHoverEffects.transform.scaleX }})
      </div>
      <q-slider v-model="localValue.cssHoverEffects.transform.scaleX"
                :min="0.25"
                :max="3"
                :step="0.2" />
      <div>
        Scale Y ({{ localValue.cssHoverEffects.transform.scaleY }})
      </div>
      <q-slider v-model="localValue.cssHoverEffects.transform.scaleY"
                :min="0.25"
                :max="3"
                :step="0.2" />
      <div>
        Skew X ({{ localValue.cssHoverEffects.transform.skewX }}deg)
      </div>
      <q-slider v-model="localValue.cssHoverEffects.transform.skewX"
                :min="-90"
                :max="90"
                :step="1" />
      <div>
        Skew Y ({{ localValue.cssHoverEffects.transform.skewY }}deg)
      </div>
      <q-slider v-model="localValue.cssHoverEffects.transform.skewY"
                :min="-90"
                :max="90"
                :step="1" />
      <div>
        Translate X ({{ localValue.cssHoverEffects.transform.translateX }}px)
      </div>
      <q-slider v-model="localValue.cssHoverEffects.transform.translateX"
                :min="-300"
                :max="300"
                :step="1" />
      <div>
        Translate y ({{ localValue.cssHoverEffects.transform.translateY }}px)
      </div>
      <q-slider v-model="localValue.cssHoverEffects.transform.translateY"
                :min="-300"
                :max="300"
                :step="1" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoverEffects',
  props: {
    value: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data: () => {
    return {
      defaultOptions: {
        style: {},
        cssHoverEffects: {
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      }
    }
  },
  computed: {
    localValue: {
      get () {
        return Object.assign(this.defaultOptions, this.value)
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
