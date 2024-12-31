<template>
<v-button v-model:show="isShow" :disabled="auth">
  心情种类
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="心情种类" :data="data" :style="{width: '650'}" :submit="submit">
  <template v-slot:extra>
    <Detail :data="{coding: coding.cate}" />
  </template>
  <template v-slot:content v-if="isShow">
  <div class="module-content plr15">
      <div class="mb15 p15" v-for="(item, index) in dataList" :key="index" style="background: var(--card-background); border-radius: 4px;">
        <div class="mb15">
          {{item.name}}
          <span class="right">
            <Detail action="edit" :data="{id: item.id, coding: coding.cate }" :render="init" :auth="true" />
            <Detail1 action="add" :data="{fid: item.id, coding: coding.list}" :render="init" />
          </span>
        </div>
        <div style="overflow: hidden;">
          <div class="col-md-3 p10" v-for="(list, i) in item.list" :key="i" >
            <div class="mood relative" :style="{background: list.color}">
              <i class="iconfont cl-white" :class="`icon-${list.icon}`" />{{list.name}}
              <span style="position: absolute; bottom: -25px; right: 20px; padding-top: 25px;">
              <List :data="{...list}" />
              </span>
              <span style="position: absolute; bottom: -25px; right: 0px; padding-top: 25px;">
              <Detail1 action="edit" :data="{id: list.id, coding: coding.list }" :render="init" :auth="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    <v-nodata :data="dataList" />
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
import Detail1 from './components/detail1.vue'
import List from './list/index.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow: any = ref(false)
    const dataList: any = ref([]);
    const coding: any = codings.mood;
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: 'mood'
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>
