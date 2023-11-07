<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <div>
        transition time ({{ localCssHoverEffects.transition.time }}s)
      </div>
      <q-slider v-model="localCssHoverEffects.transition.time"
                :min="0"
                :max="10"
                :step="0.1" />
      <q-btn class="full-width q-mb-md"
             color="primary"
             @click="resetTransforms">
        reset transforms
      </q-btn>
      <div>
        Rotate ({{ localCssHoverEffects.transform.rotate }}deg)
      </div>
      <q-slider v-model="localCssHoverEffects.transform.rotate"
                :min="0"
                :max="360" />
      <div>
        Scale X ({{ localCssHoverEffects.transform.scaleX }})
      </div>
      <q-slider v-model="localCssHoverEffects.transform.scaleX"
                :min="0.25"
                :max="3"
                :step="0.2" />
      <div>
        Scale Y ({{ localCssHoverEffects.transform.scaleY }})
      </div>
      <q-slider v-model="localCssHoverEffects.transform.scaleY"
                :min="0.25"
                :max="3"
                :step="0.2" />
      <div>
        Skew X ({{ localCssHoverEffects.transform.skewX }}deg)
      </div>
      <q-slider v-model="localCssHoverEffects.transform.skewX"
                :min="-90"
                :max="90"
                :step="1" />
      <div>
        Skew Y ({{ localCssHoverEffects.transform.skewY }}deg)
      </div>
      <q-slider v-model="localCssHoverEffects.transform.skewY"
                :min="-90"
                :max="90"
                :step="1" />
      <div>
        Translate X ({{ localCssHoverEffects.transform.translateX }}px)
      </div>
      <q-slider v-model="localCssHoverEffects.transform.translateX"
                :min="-300"
                :max="300"
                :step="1" />
      <div>
        Translate y ({{ localCssHoverEffects.transform.translateY }}px)
      </div>
      <q-slider v-model="localCssHoverEffects.transform.translateY"
                :min="-300"
                :max="300"
                :step="1" />
      <div>
        <q-separator class="q-my-md" />
        <div>
          shadow
        </div>
        <box-shadows v-model:box-shadows="localCssHoverEffects.boxShadows" />
      </div>
      <div>
        <q-separator class="q-my-md" />
        <div>
          border
        </div>
        <border-style v-model:border-style="localCssHoverEffects.borderStyle" />
      </div>
    </div>
  </div>
</template>

<script>
import BoxShadows from './BoxShadows/BoxShadows.vue'
import BorderStyle from './BorderStyle/BorderStyle.vue'

export default {
  name: 'HoverEffects',
  components: { BorderStyle, BoxShadows },
  props: {
    cssHoverEffects: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data: () => {
    return {
      defaultCssHoverEffects: {
        boxShadows: [],
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        },
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
  },
  computed: {
    localCssHoverEffects: {
      get () {
        return this.cssHoverEffects
      },
      set (newValue) {
        this.$emit('update:cssHoverEffects', newValue)
      }
    }
  },
  methods: {
    resetTransforms () {
      this.localCssHoverEffects.transform.rotate = null
      this.localCssHoverEffects.transform.scaleX = null
      this.localCssHoverEffects.transform.scaleY = null
      this.localCssHoverEffects.transform.skewX = null
      this.localCssHoverEffects.transform.skewY = null
      this.localCssHoverEffects.transform.translateX = null
      this.localCssHoverEffects.transform.translateY = null
    }
  }
}
</script>

<style scoped>

</style>
