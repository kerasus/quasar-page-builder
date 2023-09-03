<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-border-style-tab="true"
                     :show-box-shadows-tab="true"
                     :show-hover-effects-tab="true"
                     :show-responsive-show="true">
    <template #main-tab>
      <div class="option-panel-container">
        <q-list>
          <q-expansion-item expand-separator
                            label="Gutter">
            <q-card>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div class="col-md-3">
                    <q-checkbox v-model="useGutter"
                                label="Gutter" />
                  </div>
                  <div v-if="useGutter"
                       class="col-md-9">
                    <div class="row q-col-gutter-md">
                      <div class="col-md-6">
                        <q-select v-model="localOptions.gutterXSize"
                                  label="Gutter Horizontal"
                                  :options="sizes" />
                      </div>
                      <div class="col-md-6">
                        <q-select v-model="localOptions.gutterYSize"
                                  label="Gutter Vertical"
                                  :options="sizes" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            label="Boxed">
            <q-card>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div class="col-md-3">
                    <q-checkbox v-model="localOptions.boxed"
                                label="Boxed" />
                  </div>
                  <div class="col-md-3">
                    <q-input v-if="!!localOptions.boxed"
                             v-model="localOptions.boxedWidth"
                             label="boxedWidth" />
                  </div>
                  <div class="col-md-3">
                    <q-input v-model="localOptions.paddingOfBoxedInFullWidth"
                             hint="use when box is in full width state (always use with units like px)"
                             label="PaddingOfBoxedState" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            label="Absolute">
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-md-3">
                    <q-checkbox v-model="isAbsolute"
                                label="Absolute" />
                  </div>
                  <div class="col-md-9 q-mt-sm">
                    <q-option-group v-if="isAbsolute"
                                    v-model="defaultOptions.absolute"
                                    :options="absoluteOptions"
                                    color="primary"
                                    inline
                                    dense />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            label="Alignment">
            <q-card>
              <q-card-section>
                <q-list>
                  <q-expansion-item expand-separator
                                    label="Justify Content">
                    <q-card>
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-md-12 col-12">
                            <q-select v-model="localOptions.alignment.justifyContent.global"
                                      label="Justify Content"
                                      :options="alignmentOptions.justifyContent.global" />
                            <q-separator />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.justifyContent.xl"
                                      label="Justify Content (xl)"
                                      :options="alignmentOptions.justifyContent.xl" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.justifyContent.lg"
                                      label="Justify Content (lg)"
                                      :options="alignmentOptions.justifyContent.lg" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.justifyContent.md"
                                      label="Justify Content (md)"
                                      :options="alignmentOptions.justifyContent.md" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.justifyContent.sm"
                                      label="Justify Content (sm)"
                                      :options="alignmentOptions.justifyContent.sm" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.justifyContent.xs"
                                      label="Justify Content (xs)"
                                      :options="alignmentOptions.justifyContent.xs" />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item expand-separator
                                    label="Align Items">
                    <q-card>
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-md-12 col-12">
                            <q-select v-model="localOptions.alignment.alignItems.global"
                                      label="Align Items"
                                      :options="alignmentOptions.alignItems.global" />
                            <q-separator />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignItems.xl"
                                      label="Align Items (xl)"
                                      :options="alignmentOptions.alignItems.xl" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignItems.lg"
                                      label="Align Items (lg)"
                                      :options="alignmentOptions.alignItems.lg" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignItems.md"
                                      label="Align Items (md)"
                                      :options="alignmentOptions.alignItems.md" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignItems.sm"
                                      label="Align Items (sm)"
                                      :options="alignmentOptions.alignItems.sm" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignItems.xs"
                                      label="Align Items (xs)"
                                      :options="alignmentOptions.alignItems.xs" />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item expand-separator
                                    label="Align Content">
                    <q-card>
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-md-12 col-12">
                            <q-select v-model="localOptions.alignment.alignContent.global"
                                      label="Align Content"
                                      :options="alignmentOptions.alignContent.global" />
                            <q-separator />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignContent.xl"
                                      label="Align Content (xl)"
                                      :options="alignmentOptions.alignContent.xl" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignContent.lg"
                                      label="Align Content (lg)"
                                      :options="alignmentOptions.alignContent.lg" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignContent.md"
                                      label="Align Content (md)"
                                      :options="alignmentOptions.alignContent.md" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignContent.sm"
                                      label="Align Content (sm)"
                                      :options="alignmentOptions.alignContent.sm" />
                          </div>
                          <div class="col-md-3 col-12">
                            <q-select v-model="localOptions.alignment.alignContent.xs"
                                      label="Align Content (xs)"
                                      :options="alignmentOptions.alignContent.xs" />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            label="ResponsiveBackGround">
            <responsive-back-ground v-model:options="localOptions.backgrounds" />
          </q-expansion-item>
        </q-list>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import defaultOptions from './DefaultOptions.js'
import mixinOptionPanel from '../../mixin/OptionPanel.js'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs.vue'
import ResponsiveBackGround from '../OptionPanelComponents/ResponsiveBackGround.vue'

export default defineComponent({
  name: 'RowOptionPanel',
  components: { ResponsiveBackGround, OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data() {
    return {
      useGutter: true,
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
      isAbsolute: false,
      absoluteOptions: [
        {
          label: 'top',
          value: 'top'
        },
        {
          label: 'right',
          value: 'right'
        },
        {
          label: 'bottom',
          value: 'bottom'
        },
        {
          label: 'left',
          value: 'left'
        }
      ],
      alignmentOptions: {
        justifyContent: {
          global: [
            null,
            'justify-start',
            'justify-center',
            'justify-end',
            'justify-between',
            'justify-around',
            'justify-evenly'
          ],
          xl: [
            null,
            'justify-xl-start',
            'justify-xl-center',
            'justify-xl-end',
            'justify-xl-between',
            'justify-xl-around',
            'justify-xl-evenly'
          ],
          lg: [
            null,
            'justify-lg-start',
            'justify-lg-center',
            'justify-lg-end',
            'justify-lg-between',
            'justify-lg-around',
            'justify-lg-evenly'
          ],
          md: [
            null,
            'justify-md-start',
            'justify-md-center',
            'justify-md-end',
            'justify-md-between',
            'justify-md-around',
            'justify-md-evenly'
          ],
          sm: [
            null,
            'justify-sm-start',
            'justify-sm-center',
            'justify-sm-end',
            'justify-sm-between',
            'justify-sm-around',
            'justify-sm-evenly'
          ],
          xs: [
            null,
            'justify-xs-start',
            'justify-xs-center',
            'justify-xs-end',
            'justify-xs-between',
            'justify-xs-around',
            'justify-xs-evenly'
          ]
        },
        alignItems: {
          global: [
            null,
            'items-start',
            'items-center',
            'items-end',
            'items-baseline',
            'items-stretch'
          ],
          xl: [
            null,
            'items-xl-start',
            'items-xl-center',
            'items-xl-end',
            'items-xl-baseline',
            'items-xl-stretch'
          ],
          lg: [
            null,
            'items-lg-start',
            'items-lg-center',
            'items-lg-end',
            'items-lg-baseline',
            'items-lg-stretch'
          ],
          md: [
            null,
            'items-md-start',
            'items-md-center',
            'items-md-end',
            'items-md-baseline',
            'items-md-stretch'
          ],
          sm: [
            null,
            'items-sm-start',
            'items-sm-center',
            'items-sm-end',
            'items-sm-baseline',
            'items-sm-stretch'
          ],
          xs: [
            null,
            'items-xs-start',
            'items-xs-center',
            'items-xs-end',
            'items-xs-baseline',
            'items-xs-stretch'
          ]
        },
        alignContent: {
          global: [
            null,
            'content-start',
            'content-center',
            'content-end',
            'content-between',
            'content-around',
            'content-stretch'
          ],
          xl: [
            null,
            'content-xl-start',
            'content-xl-center',
            'content-xl-end',
            'content-xl-between',
            'content-xl-around',
            'content-xl-stretch'
          ],
          lg: [
            null,
            'content-lg-start',
            'content-lg-center',
            'content-lg-end',
            'content-lg-between',
            'content-lg-around',
            'content-lg-stretch'
          ],
          md: [
            null,
            'content-md-start',
            'content-md-center',
            'content-md-end',
            'content-md-between',
            'content-md-around',
            'content-md-stretch'
          ],
          sm: [
            null,
            'content-sm-start',
            'content-sm-center',
            'content-sm-end',
            'content-sm-between',
            'content-sm-around',
            'content-sm-stretch'
          ],
          xs: [
            null,
            'content-xs-start',
            'content-xs-center',
            'content-xs-end',
            'content-xs-between',
            'content-xs-around',
            'content-xs-stretch'
          ]
        }
      },
      defaultOptions: JSON.parse(JSON.stringify(defaultOptions))
    }
  },
  watch: {
    isAbsolute (newValue) {
      if (!newValue) {
        this.localOptions.absolute = 'none'
      } else {
        this.localOptions.absolute = 'top'
      }
    },
    useGutter (newValue) {
      this.localOptions.gutterXSize = newValue ? 'md' : null
      this.localOptions.gutterYSize = newValue ? 'md' : null
      this.updateLocalOptions(this.localOptions)
    }
  }
})
</script>
