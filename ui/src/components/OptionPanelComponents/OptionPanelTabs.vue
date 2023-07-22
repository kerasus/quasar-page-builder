<template>
  <q-card>
    <q-tabs v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            align="justify">
      <q-tab name="main"
             label="main" />
      <q-tab name="style"
             label="style" />
      <q-tab name="HoverEffects"
             label="HoverEffects" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="main">
        <q-input v-model="localOptions.className"
                 label="className" />
        <slot name="main-tab"
              :options="localOptions" />
      </q-tab-panel>

      <q-tab-panel name="style">
        <style-tab-component v-model:styles="localOptions.style">
          <template #backgroundImageSrcInput>
            <slot name="backgroundImageSrcInput" />
          </template>
        </style-tab-component>
      </q-tab-panel>

      <q-tab-panel name="HoverEffects">
        <hover-effects v-model:value="localOptions" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import HoverEffects from './Tabs/HoverEffects.vue'
import StyleTabComponent from './Tabs/Style/Style.vue'

export default {
  name: 'OptionPanelTabs',
  components: {
    HoverEffects,
    StyleTabComponent
  },
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      tab: 'main'
    }
  },
  computed: {
    localOptions: {
      get() {
        return this.getDefaultOptions(this.options)
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    }
  },
  methods: {
    getDefaultOptions (options) {
      if (!options.style) {
        options.style = {}
      }
      return options
    }
  }
}
</script>
