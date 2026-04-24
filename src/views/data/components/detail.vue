<template>
<v-button v-model:show="isShow" :disabled="true">
  <!-- <span class="cl-5bc0de" v-if="data.method=='1'">转</span>
  <span class="cl-eb7350" v-else-if="data.method=='2'">原</span>
  <span class="cl-green" v-else-if="data.method=='3'">搞</span>
  <span class="cl-red" v-else>Ai</span>
  <i class="iconfont icon-dot" /> -->
  <!-- 【{{data.channel}}】 -->
  <span v-if="name">{{name}}</span>
  <span class="font20 bold" v-html="data.title" v-else></span>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="" :style="{width: '1000'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div class="flex" style=" height: -webkit-fill-available;">
        <div style="background: #fff; flex: 1; display: flex; flex-flow: column;">
    <div class="relative" style="flex: 1; overflow: auto;">
      <div style="background: #fff; width: 100%; height: 100%;">
        <div class="p25 mb15">摘要: 
          <span v-html="detail.summary" style="line-height: 30px;"></span>
        </div>
        <div class="plr25" v-if="detail.draw_image">
          <img :src="detail.draw_image" width="550" />
        </div>
        <div class="p25" style="line-height: 30px;">
          正文：
          <v-broadcast :content="detail.content" />
          <span id="broadcast_content" v-html="detail.content"></span>
        </div>
      </div>

    </div>
  </div>
  <div class="relative" style=" background: #f3efef; width: 350px" @click.stop>
    <Article :data="{...detail, channel: data.channel, coding: data.coding}" :render="init" />
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
import Article from '@/views/channel/article/components/layer/article.vue'

  const props: any = defineProps({
    name: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = {}
        init()
      }
    })

    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'searchDetail',
        data: {
          coding: props.data.coding.art,
          id: props.data.artid || props.data.id
        }
      }).then(res => {
        detail.value = res.result
      })
    }
</script>
