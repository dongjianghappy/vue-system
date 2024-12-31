<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="幻灯片管理">
      <template v-slot:extraright>
        <v-condition name="展示频道" icon="select" field="channel_id" :enums="channel" :render="init" />
        <span class="mr10" @click="handleCreateJson">导出数据</span>
        <Detail :data="{ coding }" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div class="relative">
          <div class="absolute number">{{item.num}}</div>
          <img :src="item.image || '/images/slideshow.png'" onerror="this.src='/images/slideshow.png'" style="width: 100%" @click="handleClick(item)">
        </div>
        <div class="ptb15">
          <span class="bold">{{item.channelname}}</span> - {{item.name}}
          <v-space class="right">
            <Detail action="edit" :data="{id: item.id, coding }" :render="init" :auth="auth.checked('edit')" />
            <v-switch :data="{ item, field: 'status', coding }" :auth="auth" />
          </v-space>
        </div>
      </div>
    </div>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  useRouter,
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const dataList = computed(() => store.getters['basic/slideshow']);
    const channel: any = computed(() => {
      let channelArr: any = []
      store.getters['user/channel'].map((item: any) => {
        channelArr.push({
          name: item.name,
          value: item.id
        })
      })
      channelArr.push({
          name: "微博",
          value: "1000"
        })
      return channelArr
    });
    const coding: any = codings['slideshow'].cate;
    const auth: any = proxy.$auth.init('slideshow/cate')

    function init(param: any = {}) {
      const params: any = {}
      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        api: "slideshow",
        state: "slideshow",
        data: {
          ...params
        }
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/slideshow/list?name=${param.name}&fid=${param.id}`)
    }

    function handleCreateJson() {
      store.dispatch('common/Fetch', {
        api: "createAdJson",
        data: {
          type: 'slideshow'
        }
      }).then((res: any) => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })

    }

    onMounted(init)
</script>
