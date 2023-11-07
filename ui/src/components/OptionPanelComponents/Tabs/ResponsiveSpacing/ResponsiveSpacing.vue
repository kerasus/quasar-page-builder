<template>
  <q-card class="ResponsiveSpacing">
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
        <margin-and-padding v-model:value="localSpacing.xs" />
      </q-tab-panel>
      <q-tab-panel name="sm">
        <margin-and-padding v-model:value="localSpacing.sm" />
      </q-tab-panel>
      <q-tab-panel name="md">
        <margin-and-padding v-model:value="localSpacing.md" />
      </q-tab-panel>
      <q-tab-panel name="lg">
        <margin-and-padding v-model:value="localSpacing.lg" />
      </q-tab-panel>
      <q-tab-panel name="xl">
        <margin-and-padding v-model:value="localSpacing.xl" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import MarginAndPadding from '../Style/MarginAndPadding.vue'

export default {
  name: 'ResponsiveSpacing',
  components: {
    MarginAndPadding
  },
  props: {
    spacing: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      tab: 'md',
      defaultSpacing: {
        xs: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        },
        sm: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        },
        md: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        },
        lg: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        },
        xl: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        }
      }
    }
  },
  computed: {
    localSpacing: {
      get() {
        return Object.assign(this.defaultSpacing, this.spacing)
      },
      set(newValue) {
        this.$emit('update:spacing', newValue)
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
