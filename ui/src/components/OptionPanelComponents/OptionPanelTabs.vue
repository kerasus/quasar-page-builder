<template>
  <q-card>
    <q-tabs v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            align="justify"
    >
      <q-tab name="main" label="main"/>
      <q-tab name="style" label="style"/>
      <q-tab name="other" label="other"/>
    </q-tabs>

    <q-separator/>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main">
        <q-input v-model="localOptions.className"
                 label="className"
        />
        <slot name="main-tab" :options="localOptions"/>
      </q-tab-panel>

      <q-tab-panel name="style">
        <style-tab-component v-model:styles="localOptions.style"/>
      </q-tab-panel>

      <q-tab-panel name="other">
        <slot name="other-tab">
          <div class="text-h6">other</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </slot>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import StyleTabComponent from './Tabs/Style'

export default {
  name: 'OptionPanelTabs',
  components: {StyleTabComponent},
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
  data() {
    return {
      tab: 'main'
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
