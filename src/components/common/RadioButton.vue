<template>
<div class="radio-group">
  <label class="relative" :class="{current: checked === item.value}" style="" v-for="(item, index) in enums" :key="index" @change="handleclick(item.value)">
    <input type="radio" :name="name" :value="item.value" v-model="checked" :checked="checked == item.value" class="mr5" style="float: left; display: none" />
    <span>{{item.label}}</span>
  </label></div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    label: {
      type: String,
      default: "",
    },
    enums: {
      type: Object,
      default: () => {
        return {}
      },
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    checked: {
      type: String,
      default: ""
    }
  },
  emits: [`update:checked`],
  setup(props, context) {


    function handleclick(param: any) {
      context.emit(`update:checked`, param)
    }
    return {
      handleclick
    }
  }
})
</script>

<style scoped>

</style>
