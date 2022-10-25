<template>
  <q-form
    @submit="onSubmitElement"
    class="q-gutter-md"
  >
    <div class="form-input"
         v-for="(item, index) in formData"
         :key="index">
      <label for="form"></label>
      <q-input v-model="item.value"
               v-if="item.name === 'height' ? (item.type === 'text' && formData.fullHeight === true) :item.type === 'text'"
               outlined
               type="text"
               :label="item.label" />
      <q-input v-model="item.value"
               v-if="item.type === 'number'"
               outlined
               type="number"
               :label="item.label" />
      <q-checkbox v-model="item.value"
                  v-if="item.type === 'boolean'"
                  :label="item.label" />
    </div>
    <div>
      <q-btn label="ذخیره"
             type="submit"
             color="primary" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'PageBuilderForm',
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const form = ref('')
    const onSubmitElement = () => {
      emit('submit', form.value)
    }

    onMounted(() => {
      form.value = props.formData
    })

    return {
      form,
      onSubmitElement
    }
  }
})
</script>
