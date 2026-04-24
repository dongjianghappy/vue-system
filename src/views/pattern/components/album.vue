<template>
<div style="overflow: auto;">
  <div class="col-md-2 p10" v-for="(item, index) in dataList.list" :key="index">
        <div class="p10" style="border: 1px solid #f0f0f0;">
          <div>
            <img :src="item.image && item.image[0]" style="width: 100%; height: 145px">
          </div>
          <div class="ptb15">{{item.name}}
            <Detail action="edit" :data="{id: item.id, ...data}" :render="init" />
          </div>
        </div>
      </div>
</div>
<v-nodata :data="dataList.list || []" />
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  ref,
  channels,
  useStore,
  useRouter
} from '@/utils'

import Detail from './detail.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  })
</script>
