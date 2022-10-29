<template>
  <div v-if="editable"
       class="editor-wrapper">
    <q-btn-group outline
                 class="edit-toolbar">
      <q-btn v-if="label"
             outline
             color="white"
             :label="label" />
      <q-btn outline
             @click="$emit('callAction', 'delete')"
             color="white"
             icon="delete" />
      <q-btn outline
             @click="$emit('callAction', 'duplicate')"
             color="white"
             icon="content_copy" />
      <q-btn outline
             @click="$emit('callAction', 'edit')"
             color="white"
             icon="edit"  />
      <q-btn outline
             color="white"
             icon="add"
             @click="$emit('callAction', 'add')" />
    </q-btn-group>
    <slot name="body"></slot>
  </div>
  <slot v-else
        name="body"></slot>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComponentWrapper',
  props: {
    label: {
      type: String,
      default: null
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.editor-wrapper {
    position: relative;
    border: 2px dashed $primary;
    border-radius: 5px;
    padding: 40px 25px;
    width: 100%;

    .edit-toolbar {
      position: absolute;
      height: 40px;
      background: rgba($color: $primary, $alpha: .75);
      top: 0;
      right : 0;
      border-radius: 10px;
      z-index: 999;
    }

    .add-element {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
</style>
