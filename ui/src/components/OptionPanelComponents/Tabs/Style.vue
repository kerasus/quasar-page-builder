<template>
  <div>
    <q-list bordered>
      <q-expansion-item
          expand-separator
          icon="image"
          label="background"
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <q-input v-model="localStyles.backgroundImage"
                         label="backgroundImage"
                         @update:model-value="updateLocalOptions(localOptions)"
                />
              </div>
              <div class="col-md-3">
                <q-select v-model="localStyles.backgroundPosition"
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
                    ]"
                />
              </div>
              <div class="col-md-3">
                <q-select v-model="localStyles.backgroundSize"
                          label="backgroundSize"
                          :options="[
                    'cover',
                    'contain',
                    'inherit',
                    'initial',
                    'revert',
                    'revert-layer',
                    'unset'
                    ]"
                />
              </div>
              <div class="col-md-3">
                <q-select v-model="localStyles.backgroundRepeat"
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
                    ]"
                />
              </div>
              <div class="col-md-3">
                <q-select v-model="localStyles.backgroundAttachment"
                          label="backgroundAttachment"
                          :options="[
                    'scroll',
                    'fixed',
                    'local',
                    'initial',
                    'inherit'
                    ]"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
          expand-separator
          label="space"
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <q-input v-model="localStyles.marginTop"
                         label="marginTop"
                />
                <q-input v-model="localStyles.paddingTop"
                         label="paddingTop"
                />
              </div>
              <div class="col-md-3">
                <q-input v-model="localStyles.marginLeft"
                         label="marginLeft"
                />
              </div>
              <div class="col-md-3">
                <q-input v-model="localStyles.paddingLeft"
                         label="paddingLeft"
                />
              </div>
              <div class="col-md-3">
                <q-input v-model="localStyles.paddingRight"
                         label="paddingRight"
                />
              </div>
              <div class="col-md-3">
                <q-input v-model="localStyles.marginRight"
                         label="marginRight"
                />
              </div>
              <div class="col-12">
                <q-input v-model="localStyles.paddingBottom"
                         label="paddingBottom"
                />
                <q-input v-model="localStyles.marginBottom"
                         label="marginBottom"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
          expand-separator
          label="typography"
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-md-2">
                <q-input v-model="localStyles.fontSize"
                         label="fontSize"
                />
              </div>
              <div class="col-md-3">
                color
                <q-color v-model="localStyles.color" label="color" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
// import mixinOptionPanel from '../../../mixin/OptionPanel'

export default {
  name: 'StyleTabComponent',
  // mixins: [mixinOptionPanel],
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
