<template>
  <q-card>
    <q-tabs v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            align="justify">
      <q-tab name="main"
             label="main" />
      <q-tab v-if="showStyleTab"
             name="style"
             label="style" />
      <q-tab v-if="showHoverEffectsTab"
             name="HoverEffects"
             label="HoverEffects" />
      <q-tab v-if="showBoxShadowsTab"
             name="BoxShadows"
             label="BoxShadows" />
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

      <q-tab-panel v-if="showStyleTab"
                   name="style">
        <style-tab-component v-model:styles="localOptions.style">
          <template #backgroundImageSrcInput>
            <slot name="backgroundImageSrcInput" />
          </template>
        </style-tab-component>
      </q-tab-panel>

      <q-tab-panel v-if="showHoverEffectsTab"
                   name="HoverEffects">
        <hover-effects v-model:css-hover-effects="localOptions.cssHoverEffects" />
      </q-tab-panel>

      <q-tab-panel v-if="showBoxShadowsTab"
                   name="BoxShadows">
        <box-shadows v-model:box-shadows="localOptions.boxShadows" />
      </q-tab-panel>

    </q-tab-panels>
  </q-card>
</template>

<script>
import HoverEffects from './Tabs/HoverEffects.vue'
import StyleTabComponent from './Tabs/Style/Style.vue'
import BoxShadows from './Tabs/BoxShadows/BoxShadows.vue'

export default {
  name: 'OptionPanelTabs',
  components: {
    BoxShadows,
    HoverEffects,
    StyleTabComponent
  },
  props: {
    showHoverEffectsTab: {
      type: Boolean,
      default: false
    },
    showBoxShadowsTab: {
      type: Boolean,
      default: false
    },
    showStyleTab: {
      type: Boolean,
      default: true
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
