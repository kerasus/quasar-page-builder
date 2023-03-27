<template>
  <div>
    <q-list bordered>
      <q-expansion-item expand-separator
                        icon="image"
                        label="background">
        <q-card>
          <q-card-section>
            <background v-model:value="localStyles" />
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item expand-separator
                        label="space">
        <q-card>
          <q-card-section>
            <margin-and-padding v-model:value="localStyles" />
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item expand-separator
                        label="typography">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-md-6">
                <q-input v-model="localStyles.fontFamily"
                         label="fontFamily" />
                <q-input v-model="localStyles.fontSize"
                         label="fontSize" />
                <q-input v-model="localStyles.fontWeight"
                         label="fontWeight" />
              </div>
              <div class="col-md-6">
                color
                <q-color v-model="localStyles.color"
                         :default-value="'rgba(34,255,0,0.72)'"
                         format-model="rgba" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import MarginAndPadding from './MarginAndPadding.vue'
import Background from './Background.vue'
export default {
  name: 'StyleTabComponent',
  components: { Background, MarginAndPadding },
  props: {
    styles: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    localStyles: {
      get () {
        return this.styles
      },
      set (newValue) {
        this.$emit('update:styles', newValue)
      }
    }
  }
}
</script>
