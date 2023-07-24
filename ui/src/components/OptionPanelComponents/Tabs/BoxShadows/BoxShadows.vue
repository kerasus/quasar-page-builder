<template>
  <div class="BoxShadows row q-col-gutter-md">
    <div class="col-md-10 col-12">
      <q-expansion-item v-for="(boxShadow, index) in localBoxShadows"
                        :key="index"
                        expand-separator
                        :label="'Shadow ' + index">
        <q-card>
          <q-card-section>
            <shadow-item v-model:box-shadow="localBoxShadows[index]" />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
    <div class="col-md-2 col-12">
      <q-card>
        <q-card-section class="SampleBoxCanvas flex justify-center align-center">
          <div class="SampleBox"
               :style="{boxShadow: shadows}" />
        </q-card-section>
      </q-card>
      <q-btn @click="addShadow">
        add shadow
      </q-btn>
    </div>
  </div>
</template>

<script>
import ShadowItem from './components/ShadowItem.vue'

export default {
  name: 'BoxShadows',
  components: { ShadowItem },
  props: {
    boxShadows: {
      default: () => {
        return []
      },
      type: [Array, Object]
    }
  },
  computed: {
    shadows () {
      const shadows = []
      this.localBoxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    localBoxShadows: {
      get () {
        return this.boxShadows
      },
      set (newValue) {
        this.$emit('update:boxShadows', newValue)
      }
    }
  },
  methods: {
    addShadow () {
      this.localBoxShadows.push({
        blurRadius: 0,
        spreadRadius: 0,
        verticalOffset: 0,
        horizontalOffset: 0,
        color: 'rgba(0,0,0,0.1)',
        cssString: '',
        inset: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.BoxShadows {
  .SampleBoxCanvas {
    background: #f3f4f6;
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
