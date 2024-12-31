<template>
  <ul class="form-wrap-box">
    {{dataList}}
    <template v-for="(item, index) in dataList" :key="index">
      <li class="vertical">
        <div class="label">{{item.remark}}</div>
        <div>
          <input v-model="data[item.fields]" type="text" class="input-sm input-full" v-if="item.text_type === 'input'" />
          <textarea v-model="data[item.fields]" class="w-full" v-else-if="item.text_type === 'textarea'"></textarea>
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineExpose,
  ref,
  watch,
  codings,
  useStore,
  onMounted,
  channels
} from '@/utils'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Array,
      default: []
    },
  })
</script>
