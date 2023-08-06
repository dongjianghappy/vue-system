<template>
<div class="module-wrap m0">
  <div class="module-head">关键词</div>
  <div class="module-content p0" style="height: 370px">
    <ul>
      <li class="item-thum-wrap mb10" v-for="(item, index) in data" :key="index">
        <div class="item-title relative">
          <i class="iconfont icon-dot m0" />
          {{item.word}}
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@/utils'

export default defineComponent({
  name: 'v-Keyword',
  props: {
    data: {
      type: Array,
      default: []
    }
  }
})
</script>
