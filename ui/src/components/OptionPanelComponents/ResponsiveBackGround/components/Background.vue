<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-6">
      <div class="row">
        <div class="col-12">
          <q-input v-model="localValue.color"
                   label="backgroundColor">
            <template v-slot:append>
              <q-icon name="colorize"
                      class="cursor-pointer">
                <q-popup-proxy cover
                               transition-show="scale"
                               transition-hide="scale">
                  <q-color v-model="localValue.color"
                           label="backgroundColor"
                           :default-value="'rgba(34,255,0,0.72)'"
                           format-model="rgba" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-md-12">
          <q-select v-model="localValue.repeat"
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
          <q-select v-model="localValue.attachment"
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
          <slot name="backgroundImageSrcInput">
            <BackgroundImageSrcInput v-if="hasBackgroundImageSrcInputComponent()"
                                     v-model:value="localValue.image" />
            <q-input v-else
                     v-model="localValue.image"
                     label="backgroundImage" />
          </slot>
        </div>
        <div class="col-md-12">
          <q-select v-model="localValue.position"
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
          <q-select v-model="localValue.size"
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
</template>

<script>
import { useQuasar } from 'quasar'

const components = {}
export default {
  name: 'Background',
  components,
  props: {
    value: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  setup () {
    const $q = useQuasar()
    if ($q.$pageBuilderWidgetOptionPanelImageUploader) {
      components.BackgroundImageSrcInput = $q.$pageBuilderWidgetOptionPanelImageUploader
    }

    const hasBackgroundImageSrcInputComponent = () => {
      return !!$q.$pageBuilderWidgetOptionPanelImageUploader
    }

    return {
      hasBackgroundImageSrcInputComponent
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('update:value', newValue)
      }
    }
  }
}
</script>

<style scoped>

</style>
