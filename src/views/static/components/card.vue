<template>
<div class="card h100" v-if="!isDetail">
  <div class="col-md-12 pb10">{{title}}</div>
  <div class="col-md-9">
    <v-progress />
  </div>
  <div class="col-md-3">
    <Progress :data="{title: `正在更新${item.name}${title}`, data: data}" />
  </div>
</div>
<div class="card h100" v-else>
  <div class="col-md-12 pb10">{{title}}</div>
  <div>
    <div class="col-md-2 limit relative" :class="`col-md-2`">
      <v-popover :content="`<div>排序: <span>${enumSort[item.sort]}</span></div>`" arrow="tb" offset="right" :move="-10" :keys="`static_${index}`">
        <ul>
          <li @click="data.sort = i" v-for="(data, i) in sort" :key="i">{{data}}</li>
        </ul>
      </v-popover>
    </div>
    <div class="col-md-3 limit relative">
      <v-popover :content="`<span>范围: ${item.limitStart} - ${item.limitEnd}</span>`" arrow="tb" offset="right" :move="-100" :keys="`static_${index}`">
        <div class="p10"><input maxlength="5" type="text" class="ant-input" v-model="item.limitStart" style="width: 100px; flex: 1"><span class="pl15 pr15"> 至 </span><input maxlength="5" type="text" class="ant-input" v-model="item.limitEnd" style="width: 100px; flex: 1"></div>
      </v-popover>
    </div>
    <div class="col-md-6">
      <v-progress v-if="title !== '标签'" />
    </div>
    <div class="col-md-1">
      <Progress :data="{title: `正在更新${item.name}${title}`, data: data}" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@/utils'
import Progress from './progress.vue';
import {
  enumSort
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Progress',
  components: {
    Progress
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, context) {
    return {
      enumSort
    }
  }
})
</script>
