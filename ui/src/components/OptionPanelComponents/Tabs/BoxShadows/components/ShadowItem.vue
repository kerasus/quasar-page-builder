<template>
  <q-card class="ShadowItem">
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md-8">
          <div class="SampleBoxCanvas">
            <div class="SampleBox"
                 :style="{boxShadow: sampleShadow}" />
          </div>
          <div>
            Horizontal offset ({{ localBoxShadow.horizontalOffset }})
          </div>
          <q-slider v-model="localBoxShadow.horizontalOffset"
                    :min="-100"
                    :max="100"
                    :step="0.5"
                    @update:model-value="onUpdateBoxShadow" />
          <div>
            Vertical offset ({{ localBoxShadow.verticalOffset }})
          </div>
          <q-slider v-model="localBoxShadow.verticalOffset"
                    :min="-100"
                    :max="100"
                    :step="0.5"
                    @update:model-value="onUpdateBoxShadow" />
          <div>
            Blur radius ({{ localBoxShadow.blurRadius }})
          </div>
          <q-slider v-model="localBoxShadow.blurRadius"
                    :min="0"
                    :max="100"
                    :step="0.5"
                    @update:model-value="onUpdateBoxShadow" />
          <div>
            Spread radius ({{ localBoxShadow.spreadRadius }})
          </div>
          <q-slider v-model="localBoxShadow.spreadRadius"
                    :min="-100"
                    :max="100"
                    :step="0.5"
                    @update:model-value="onUpdateBoxShadow" />
          <div>
            Inset
          </div>
          <q-checkbox v-model="localBoxShadow.inset"
                      @update:model-value="onUpdateBoxShadow" />
        </div>
        <div class="col-md-4 flex justify-center align-center">
          <div>
            <q-color v-model="localBoxShadow.color"
                     @update:model-value="onUpdateBoxShadow" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ShadowItem',
  props: {
    boxShadow: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data: () => {
    return {
      defaultOptions: {
        blurRadius: 0,
        spreadRadius: 0,
        verticalOffset: 0,
        horizontalOffset: 0,
        color: 'rgba(0,0,0,0.1)',
        inset: false,
        cssString: ''
      }
    }
  },
  computed: {
    sampleShadow () {
      const shadow = this.localBoxShadow.horizontalOffset + 'px ' +
          this.localBoxShadow.verticalOffset + 'px ' +
          this.localBoxShadow.blurRadius + 'px ' +
          this.localBoxShadow.spreadRadius + 'px ' +
          this.localBoxShadow.color + ' ' +
          (this.localBoxShadow.inset ? 'inset' : '')

      return shadow
    },
    localBoxShadow: {
      get () {
        return Object.assign(this.defaultOptions, this.boxShadow)
      },
      set (newValue) {
        this.$emit('update:boxShadow', newValue)
      }
    }
  },
  methods: {
    getShadowFromObject (object) {
      return object.horizontalOffset + 'px ' +
          object.verticalOffset + 'px ' +
          object.blurRadius + 'px ' +
          object.spreadRadius + 'px ' +
          object.color + ' ' +
          (object.inset ? 'inset' : '')
    },
    onUpdateBoxShadow () {
      this.localBoxShadow.cssString = this.getShadowFromObject(this.localBoxShadow)
      this.$emit('update:boxShadow', this.localBoxShadow)
    }
  }
}
</script>

<style lang="scss" scoped>
.ShadowItem {
  background: #f3f4f6;
  .SampleBoxCanvas {
    display: flex;
    align-items: center;
    justify-content: center;
    .SampleBox {
      width: 50px;
      height: 50px;
      background: #fff;
      //border: solid 2rem transparent;
      border-radius: 1rem;
    }
  }
}
</style>
