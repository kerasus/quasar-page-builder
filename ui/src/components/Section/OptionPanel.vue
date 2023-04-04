<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-4">
            <q-checkbox v-model="useFullHeight"
                        label="fullHeight" />
          </div>
          <div class="col-md-4">
            <q-input v-if="useFullHeight"
                     v-model="localOptions.fullHeight"
                     label="FullHeight value" />
          </div>
          <div class="col-md-4">
            <q-select v-if="useFullHeight"
                      v-model="localOptions.verticalAlign"
                      label="verticalAlign"
                      :options="['center', 'end', 'start']" />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <q-separator class="q-mt-md q-mb-sm" />
            Background
            <q-banner dense
                      class="bg-primary text-white">
              don't use background in style directly
            </q-banner>
          </div>
          <div class="col-12">
            <q-tabs v-model="backgroundTab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator>
              <q-tab v-for="backgroundKey in backgroundsKeys"
                     :key="backgroundKey"
                     :name="backgroundKey"
                     :label="backgroundKey" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="backgroundTab"
                          animated>
              <q-tab-panel v-for="backgroundKey in backgroundsKeys"
                           :key="backgroundKey"
                           :name="backgroundKey">
                <div class="row q-col-gutter-md">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-12">
                        <q-input v-model="defaultOptions.backgrounds[backgroundKey].color"
                                 label="backgroundColor">
                          <template v-slot:append>
                            <q-icon name="colorize"
                                    class="cursor-pointer">
                              <q-popup-proxy cover
                                             transition-show="scale"
                                             transition-hide="scale">
                                <q-color v-model="defaultOptions.backgrounds[backgroundKey].color"
                                         label="backgroundColor"
                                         :default-value="'rgba(34,255,0,0.72)'"
                                         format-model="rgba" />
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-12">
                        <q-select v-model="defaultOptions.backgrounds[backgroundKey].repeat"
                                  label="backgroundRepeat"
                                  :options="[
                                    'no-repeat',
                                    'repeat',
                                    'repeat-x',
                                    'repeat-y',
                                    'space',
                                    'round',
                                    'initial',
                                    'inherit'
                                  ]" />
                      </div>
                      <div class="col-md-12">
                        <q-select v-model="defaultOptions.backgrounds[backgroundKey].attachment"
                                  label="backgroundAttachment"
                                  :options="[
                                    'scroll',
                                    'fixed',
                                    'local',
                                    'initial',
                                    'inherit'
                                  ]" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-12">
                        <q-input v-model="defaultOptions.backgrounds[backgroundKey].image"
                                 label="backgroundImage" />
                      </div>
                      <div class="col-md-12">
                        <q-select v-model="defaultOptions.backgrounds[backgroundKey].position"
                                  label="backgroundPosition"
                                  :options="[
                                    'center center',
                                    'center top',
                                    'center bottom',
                                    'left top',
                                    'left center',
                                    'left bottom',
                                    'right top',
                                    'right center',
                                    'right bottom'
                                  ]" />
                      </div>
                      <div class="col-md-12">
                        <q-select v-model="defaultOptions.backgrounds[backgroundKey].size"
                                  label="backgroundSize"
                                  :options="[
                                    'cover',
                                    'contain',
                                    'inherit',
                                    'initial',
                                    'revert',
                                    'revert-layer',
                                    'unset'
                                  ]" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import mixinOptionPanel from '../../mixin/OptionPanel.js'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'SectionOptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data: () => {
    return {
      useFullHeight: false,
      backgroundTab: 'md',
      backgroundTabs: ['xs', 'sm', 'md', 'lg'],
      defaultOptions: {
        fullHeight: false,
        backgrounds: {
          xs: {
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
          md: {
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
          xl: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          }
        },
        verticalAlign: null
      }
    }
  },
  computed: {
    backgroundsKeys () {
      return Object.keys(this.defaultOptions.backgrounds)
    }
  },
  watch: {
    useFullHeight (newValue) {
      this.defaultOptions.fullHeight = newValue
    }
  },
  created () {
    const oldFullHeight = this.localOptions.fullHeight
    this.useFullHeight = !!this.localOptions.fullHeight
    this.$nextTick(() => {
      this.localOptions.fullHeight = oldFullHeight
    })
  }
})
</script>
