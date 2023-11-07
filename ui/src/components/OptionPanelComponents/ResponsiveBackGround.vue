<template>
  <q-card class="ResponsiveBackGround">
    <q-tabs v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            align="justify">
      <q-tab name="xs"
             label="xs" />
      <q-tab name="sm"
             label="sm" />
      <q-tab name="md"
             label="md" />
      <q-tab name="lg"
             label="lg" />
      <q-tab name="xl"
             label="xl" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="xs">
        <background-component v-model:value="localOptions.xs" />
      </q-tab-panel>
      <q-tab-panel name="sm">
        <background-component v-model:value="localOptions.sm" />
      </q-tab-panel>
      <q-tab-panel name="md">
        <background-component v-model:value="localOptions.md" />
      </q-tab-panel>
      <q-tab-panel name="lg">
        <background-component v-model:value="localOptions.lg" />
      </q-tab-panel>
      <q-tab-panel name="xl">
        <background-component v-model:value="localOptions.xl" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import BackgroundComponent from './Tabs/Style/Background.vue'

export default {
  name: 'ResponsiveBackGround',
  components: {
    BackgroundComponent
  },
  props: {
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      tab: 'md',
      defaultOptions: {
        xl: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        lg: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        md: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        sm: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        xs: {
          size: null,
          color: null,
          image: null,
          repeat: null,
          position: null,
          attachment: null
        }
      }
    }
  },
  computed: {
    localOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
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
