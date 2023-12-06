<template>
  <div class="margin-square">
    <q-input v-model="localValue.marginTop"
             label="marginTop"
             dense
             class="margin-input input-marginTop" />
    <q-input v-model="localValue.marginLeft"
             label="marginLeft"
             dense
             class="margin-input input-marginLeft" />
    <q-input v-model="localValue.marginRight"
             label="marginRight"
             dense
             class="margin-input input-marginRight" />
    <q-input v-model="localValue.marginBottom"
             label="marginBottom"
             dense
             class="margin-input input-marginBottom" />
    <div class="padding-square">
      <q-input v-model="localValue.paddingTop"
               label="paddingTop"
               dense
               class="padding-input input-paddingTop" />
      <q-input v-model="localValue.paddingLeft"
               label="paddingLeft"
               dense
               class="padding-input input-paddingLeft" />
      <q-input v-model="localValue.paddingRight"
               label="paddingRight"
               dense
               class="padding-input input-paddingRight" />
      <q-input v-model="localValue.paddingBottom"
               label="paddingBottom"
               dense
               class="padding-input input-paddingBottom" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarginAndPadding',
  props: {
    value: {
      default: () => {
        return {}
      },
      type: Object
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

<style lang="scss" scoped>
.margin-square {
  position: relative;
  margin: auto;
  width: 350px;
  height: 350px;
  border: 50px solid #fcd17f;
  border-right-color: #ffd998;
  border-left-color: #ffd998;
  .margin-input {
    position: absolute;
    &.input-marginTop {
      top: -45px;
      left: 0;
      width: 100%;
    }
    &.input-marginLeft {
      top: 105px;
      left: -150px;
      transform: rotate(-90deg);
      width: 100%;
    }
    &.input-marginRight {
      top: 105px;
      left: 150px;
      transform: rotate(90deg);
      width: 100%;
    }
    &.input-marginBottom {
      bottom: -45px;
      left: 0;
      width: 100%;
    }
  }
  .padding-square {
    position: relative;
    width: 250px;
    height: 250px;
    border: 50px solid #c3ffad;
    border-right-color: #b2fd96;
    border-left-color: #b2fd96;
    .padding-input {
      position: absolute;
      &.input-paddingTop {
        top: -45px;
        left: 0;
        width: 100%;
      }
      &.input-paddingLeft {
        top: 55px;
        left: -100px;
        transform: rotate(-90deg);
        width: 100%;
      }
      &.input-paddingRight {
        top: 55px;
        left: 100px;
        transform: rotate(90deg);
        width: 100%;
      }
      &.input-paddingBottom {
        bottom: -45px;
        left: 0;
        width: 100%;
      }
    }
  }
}
</style>
