<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab >
      <div class="option-panel-container">
        <q-checkbox v-model="localOptions.fullHeight"
                    label="fullHeight"
        />
        <q-select v-model="localOptions.verticalAlign"
                  label="verticalAlign"
                  :options="['center', 'right', 'left']"
        />
<!--        <q-btn label="ذخیره"-->
<!--               color="primary"-->
<!--               class="q-mt-md"-->
<!--               @click="passOptions"-->
<!--        />-->
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import {defineComponent} from 'vue'
import mixinOptionPanel from '../../mixin/OptionPanel'
import OptionPanelTabs from '../OptionPanelComponents/OptionPanelTabs'

export default defineComponent({
  name: 'SectionOptionPanel',
  components: {OptionPanelTabs},
  mixins: [mixinOptionPanel],
  data: () =>{
    return {
      defaultOption: {
        fullHeight: false,
        verticalAlign: 'center',
      }
    }
  },
})
</script>
