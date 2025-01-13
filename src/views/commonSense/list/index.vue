<template>
<v-button v-model:show="isShow" :disabled="true">
  内容
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.name}`" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:extra>
    <Detail :data="{fid: data.id, coding: data.coding.art}" :render="init" />
  </template>
  <template v-slot:content v-if="isShow">
    <div class="con-list p15 flex item-thum-wrap" style=" align-items: center;" v-for="(item, index) in dataList" :key="index">
      <div style="width: 120px">
        <img :src="item.image" onerror="this.src='/images/slideshow.png'" class="radius-4" width="100" height="80">
      </div>
      <div style="flex: 1">
        <div class="mb15">
          {{item.title}}
          {{item.start_date}} - {{item.end_date}}
        </div>
        <div>
          <span class="mr5 font12 cl-666" v-html="item.content"></span>
        </div>
      </div>
      <div class="align_center" style="width: 100px">
        <v-switch :data="{ item, field: 'checked', coding: data.coding.art }" :auth="true" />
      </div>
      <div class="font14 align_center" style="width: 100px">
        <Detail action="edit" :data="{id: item.id, coding: data.coding.art}" :render="init" />
      </div>
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
} from '@/utils'
import Detail from './components/detail.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const isShow: any = ref(false)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init(param: any = {}) {
      store.dispatch('basic/Fetch', {
        data: {
          coding: props.data.coding.art,
          fid: props.data.id
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>
