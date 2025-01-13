<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="题库管理">
      <template v-slot:extraright>
        <Detail :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div v-for="(item, index) in dataList.list" :key="index">
      <div class="mb10 plr25">第 {{item.id}} 题

        <v-space class="right">
            <span>
              <v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding}" :isUpdate="true" type="text"></v-category>
            </span>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
            <span><v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" /></span>
          </v-space>
      </div>
      <div class=" m10 plr15 markdown" v-html="item.content"></div>
      <div class=" mb35 plr25 markdown" v-html="item.answer.replace(/\n/g, '<br/>')"></div>
    </div>
    <v-nodata :data="dataList.list || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  ref,
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings.module['questionBank'];
    const checkedList: any = ref([])
    const pagesize: any = 25

    function init(param: any) {

      const params: any = {
        page: 1,
        pagesize: pagesize
      }

      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding: coding.art,
          ...params
        }
      })
    }

    onMounted(() => {
      init({
        page: 1
      })
    })
</script>
