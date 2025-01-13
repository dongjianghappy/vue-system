<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="话题管理">
      <template v-slot:extraright>
        <v-condition name="类型" icon="type" field="type" :enums="[{name: '学生', value: '1'}, {name: '体育', value: '2'}]" :render="init" />
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-4">话题</td>
        <td class="col-md-2">说明</td>
        <!-- <td class="col-md-1">参与人次</td> -->
        <!-- <td class="col-md-1">投票开启</td> -->
        <td class="col-md-2">创建时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td class="flex">
          <div class="mr10 w150">
            <img :src="item.image" onerror="this.src='/images/slideshow.png'" class="radius-4" width="150" height="120">
          </div>
          <div>
            <div class="mb10 font16 bold">#{{item.name}}#</div>
            <div class="mb5">参与人次：{{item.num}}</div>
            <div>
              <span class="mr10">收藏：{{item.collect}}</span>
              <!-- <span class="mr10">分享：131</span> -->
              <span class="mr10">浏览：{{item.visit}}</span>
            </div>
          </div>
          
        </td>
        <td>
          {{item.summary}}
        </td>
        <!-- <td>{{item.num}}</td> -->
        <!-- <td @click="handleClick(item)" :class="item.vote === '0' || 'red'">
          <i class="iconfont icon-dot" :class="item.vote === '1' ? 'cl-green' : ''" />
          {{item.vote === '0' ? '未开启' : '已开启'}}</td> -->
        <td>
          {{item.times}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />

        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="init" operating="delete" :auth="true"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useRoute,
  useRouter,
  codings,
  useStore
} from '@/utils'

import Detail from './components/detail.vue'

    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.talk.activity;
    const route = useRoute();
    const router = useRouter();

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)
      
      store.dispatch('common/Fetch', {
        api: 'activity',
        data: {
          coding,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(item: any) {
      let url: any = `/admin/vote/item?talkid=${item.id}&name=${item.name}`
      if (item.vote !== '0') {
        url = `/admin/vote/item/list?id=${item.vote}`
      }
      router.push(url)
    }

    onMounted(init)
</script>
