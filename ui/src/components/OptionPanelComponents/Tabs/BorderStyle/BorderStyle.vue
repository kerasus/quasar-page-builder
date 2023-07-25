<template>
  <div class="BoxShadows row q-col-gutter-md">
    <div class="col-md-8 col-12">
      <div>
        Top Left Radius ({{ localBorderStyle.topLeftRadius }}px)
      </div>
      <q-slider v-model="localBorderStyle.topLeftRadius"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateBorderStyle" />
      <div>
        Top Righ Radius ({{ localBorderStyle.topRightRadius }}px)
      </div>
      <q-slider v-model="localBorderStyle.topRightRadius"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateBorderStyle" />
      <div>
        Bottom Righ Radius ({{ localBorderStyle.bottomRightRadius }}px)
      </div>
      <q-slider v-model="localBorderStyle.bottomRightRadius"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateBorderStyle" />
      <div>
        Bottom Left Radius ({{ localBorderStyle.bottomLeftRadius }}px)
      </div>
      <q-slider v-model="localBorderStyle.bottomLeftRadius"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateBorderStyle" />
      <div>
        Border Width ({{ localBorderStyle.borderWidth }}px)
      </div>
      <q-slider v-model="localBorderStyle.borderWidth"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateBorderStyle" />
      <div>
        Border Style
      </div>
      <q-select v-model="localBorderStyle.borderStyle"
                label="backgroundRepeat"
                :options="[
                  'solid',
                  'dotted',
                  'dashed',
                  'double',
                  'groove',
                  'ridge',
                  'inset',
                  'outset',
                  'none',
                  'hidden'
                ]"
                @update:model-value="onUpdateBorderStyle" />
    </div>
    <div class="col-md-4 col-12">
      <q-card>
        <q-card-section class="SampleBoxCanvas flex justify-center align-center">
          <div class="SampleBox"
               :style="{border: border, borderRadius: borderRadius}" />
          <q-color v-model="localBorderStyle.borderColor"
                   class="q-mt-lg"
                   @update:model-value="onUpdateBorderStyle" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BorderStyle',
  props: {
    borderStyle: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data: () => {
    return {
      defaultBorderStyle: {
        topLeftRadius: 0,
        topRightRadius: 0,
        bottomLeftRadius: 0,
        bottomRightRadius: 0,
        borderWidth: 0,
        borderColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'solid'
      }
    }
  },
  computed: {
    border () {
      return this.localBorderStyle.borderStyle + ' ' + this.localBorderStyle.borderWidth + 'px ' + this.localBorderStyle.borderColor
    },
    borderRadius () {
      return this.localBorderStyle.topLeftRadius + 'px ' + this.localBorderStyle.topRightRadius + 'px ' + this.localBorderStyle.bottomRightRadius + 'px ' + this.localBorderStyle.bottomLeftRadius + 'px'
    },
    localBorderStyle: {
      get () {
        return Object.assign(this.defaultBorderStyle, this.borderStyle)
      },
      set (newValue) {
        this.$emit('update:borderStyle', newValue)
      }
    }
  },
  methods: {
    onUpdateBorderStyle () {
      this.$emit('update:borderStyle', this.localBorderStyle)
    }
  }
}
</script>

<style lang="scss" scoped>
.BoxShadows {
  .SampleBoxCanvas {
    background: #f3f4f6;
    .SampleBox {
      width: 100px;
      height: 100px;
      background: #fff;
      //border: solid 2rem transparent;
      border-radius: 1rem;
    }
  }
}
</style>
