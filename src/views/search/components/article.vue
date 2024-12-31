<template>
<div class="col-md-4" style=" padding-right: 8px;">
  <div class="module-wrap">
    <div class="module-head">
      搜索热榜
    </div>
    <div class="module-content plr15" style="height: 336px">
      <ul>
        <li class="item-thum-wrap mb10" v-for="(item, index) in data.hot" :key="index">
          <div class="item-title relative pl40 pr40">
            <i class="iconfont icon-top num m0" v-if="index === 0" />
            <span class="num" v-else>{{index}}</span>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="col-md-5" style="padding-left: 8px; padding-right: 8px;">
  <div class="module-wrap">
    <div class="module-head">
      搜索发现
      <span class="right">
        <v-refresh :data="find" v-model:number="current" size="4" />
      </span>
    </div>
    <div class="module-content plr15" style="height: 336px">
      <ul>
        <li class="item-thum-wrap mb10" v-for="(item, index) in find[current]" :key="index">
          <div class="item-title relative pl40 pr40">
            <i class="iconfont icon-top num m0" v-if="index === 0" />
            <span class="num" v-else>{{index}}</span>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="col-md-3" style="padding-left: 8px;">
  <div class="module-wrap">
    <div class="module-head">
      用户
    </div>
    <div class="module-content plr15" style="height: 336px">
      <ul>
        <li class="item-thum-wrap mb10" v-for="(item, index) in find" :key="index">
          <div class="item-title relative pl40 pr40">
            <i class="iconfont icon-top num m0" v-if="index === 0" />
            <span class="num" v-else>{{index}}</span>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref
} from '@/utils'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    find: {
      type: Array,
      default: []
    }
  })
    let current: any = ref(0)
    
</script>
