<template>
<v-button v-model:show="isShow" :disabled="auth">
  签到设置
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="签到设置" :data="data" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <Index />
      <Detail :data="{coding}" :render="init" />
    </v-space>
  </template>
  <template v-slot:content v-if="isShow">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div style="border: 1px solid #f0f0f0;">
        <div class="bg-f7f8fa align_center" style="height: 120px; line-height: 120px;" @click="handleClick(item)"><img :src="item.image[0]" onerror="this.src='/images/slideshow.png'" style="width: 100%; height: 120px" /></div>
        <div class="nowrap ptb10 plr5">{{item.name}}
          <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
        </div>
      </div>
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
    codings,
  getCurrentInstance,
  onMounted,
  watch,
  ref,
  useStore
} from '@/utils'
import Detail from './components/detail.vue'
import Index from './components/content/index.vue'
// import List from './list/index.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow: any = ref(false)
    const dataList: any = ref([]);
    const coding: any = codings.sign;
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>
