<template>
  <div class="BorderStyle row q-col-gutter-md">
    <div class="col-md-8 col-12">
      <div>
        All Corners Radius ({{ allCorners }})
      </div>
      <q-slider v-model="allCorners"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateAllCorners" />
      <div>
        Top Left Radius ({{ localBorderStyle.topLeftRadius }}
        <q-select v-model="topLeftRadiusUnit"
                  class="unitSelector"
                  label="unit"
                  :options="['px', '%']"
                  @update:model-value="onUpdateBorderStyle" />)

      </div>
      <q-slider v-model="localBorderStyle.topLeftRadius"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateBorderStyle" />
      <div>
        Top Righ Radius ({{ localBorderStyle.topRightRadius }}
        <q-select v-model="topRightRadiusUnit"
                  class="unitSelector"
                  label="unit"
                  :options="['px', '%']"
                  @update:model-value="onUpdateBorderStyle" />)
      </div>
      <q-slider v-model="localBorderStyle.topRightRadius"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateBorderStyle" />
      <div>
        Bottom Right Radius ({{ localBorderStyle.bottomRightRadius }}
        <q-select v-model="bottomRightRadiusUnit"
                  class="unitSelector"
                  label="unit"
                  :options="['px', '%']"
                  @update:model-value="onUpdateBorderStyle" />)
      </div>
      <q-slider v-model="localBorderStyle.bottomRightRadius"
                :min="0"
                :max="200"
                :step="1"
                @update:model-value="onUpdateBorderStyle" />
      <div>
        Bottom Left Radius ({{ localBorderStyle.bottomLeftRadius }}
        <q-select v-model="bottomLeftRadiusUnit"
                  class="unitSelector"
                  label="unit"
                  :options="['px', '%']"
                  @update:model-value="onUpdateBorderStyle" />)
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
      allCorners: 0,
      topLeftRadiusUnit: 'px',
      topRightRadiusUnit: 'px',
      bottomLeftRadiusUnit: 'px',
      bottomRightRadiusUnit: 'px',
      defaultBorderStyle: {
        topLeftRadius: 0,
        topRightRadius: 0,
        bottomLeftRadius: 0,
        bottomRightRadius: 0,
        borderWidth: 0,
        borderColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'solid',
        borderCssString: '',
        borderRadiusCssString: ''
      }
    }
  },
  computed: {
    border () {
      return this.localBorderStyle.borderStyle + ' ' + this.localBorderStyle.borderWidth + 'px ' + this.localBorderStyle.borderColor
    },
    borderRadius () {
      return this.localBorderStyle.topLeftRadius + this.topLeftRadiusUnit + ' ' +
          this.localBorderStyle.topRightRadius + this.topRightRadiusUnit + ' ' +
          this.localBorderStyle.bottomRightRadius + this.bottomRightRadiusUnit + ' ' +
          this.localBorderStyle.bottomLeftRadius + this.bottomLeftRadiusUnit
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
    onUpdateAllCorners () {
      this.localBorderStyle.topLeftRadius = this.allCorners
      this.localBorderStyle.topRightRadius = this.allCorners
      this.localBorderStyle.bottomLeftRadius = this.allCorners
      this.localBorderStyle.bottomRightRadius = this.allCorners
      this.onUpdateBorderStyle()
    },
    onUpdateBorderStyle () {
      this.localBorderStyle.borderCssString = this.border
      this.localBorderStyle.borderRadiusCssString = this.borderRadius
      this.$emit('update:borderStyle', this.localBorderStyle)
    }
  }
}
</script>

<style lang="scss" scoped>
.BorderStyle {
  .unitSelector {
    width: 100px;
    display: inline-block;
  }
  .SampleBoxCanvas {
    background: #f3f4f6;
    .SampleBox {
      width: 200px;
      height: 200px;
      background: #fff;
      //border: solid 2rem transparent;
      border-radius: 1rem;
    }
  }
}
</style>
