<template>
  <div :class="{['position-'+position]: true}"
       class="widget-editor-box">
    <q-btn-group outline
                 class="edit-toolbar">
      <q-btn v-if="showDelete"
             outline
             color="white"
             icon="delete"
             @click="$emit('callAction', 'delete')" />
      <q-btn v-if="showAdd"
             outline
             color="white"
             icon="add"
             @click="$emit('callAction', 'add')" />
      <q-btn v-if="showDuplicate"
             outline
             color="white"
             icon="content_copy"
             @click="$emit('callAction', 'duplicate')" />
      <q-btn v-if="showEdit"
             outline
             color="white"
             icon="edit"
             @click="$emit('callAction', 'edit')" />
      <q-btn v-if="label"
             outline
             color="white"
             :label="label" />
    </q-btn-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditorBox',
  props: {
    label: {
      type: String,
      default: null
    },
    position: {
      type: Number,
      default: 1
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showDuplicate: {
      type: Boolean,
      default: true
    }
  },
  emits: ['callAction']
})
</script>

<style lang="scss" scoped>
@import 'quasar/src/css/variables.sass';

$edit_toolbar_height: 40px;

.widget-editor-box {
  position: relative;
  .edit-toolbar {
    position: relative;
    height: $edit_toolbar_height;
    background: rgba($color: $primary, $alpha: .75);
    border-radius: 10px;
    z-index: 999;
  }
  .add-element {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  &.position-1 {
    top: $edit_toolbar_height * 0;
  }
  &.position-2 {
    top: $edit_toolbar_height * 1;
  }
  &.position-3 {
    top: $edit_toolbar_height * 2;
  }
  &.position-4 {
    top: $edit_toolbar_height * 3;
  }
}
</style>
