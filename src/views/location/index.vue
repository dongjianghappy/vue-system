<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="位置管理">
      <template v-slot:extraright>
        <v-space>
          <v-search field="address" placeholder="地址查找" :render="init" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <ul>
      <li v-for="(item, index) in dataList.list" :key="index" class="ptb10 flex" @click="handleClick(item.address)">
        <div class="nowrap flex" style="flex: 1; line-height: 32px;">
          <div class="w25"><i class="iconfont icon-position" /> </div>
          <div style="flex: 1; height: 32px;">
            <input type="text" v-model="item.address" class="input-sm input-full p0" v-if="item.isEdit" />
            <span v-else>{{item.address}}</span>
          </div>
        </div>
        <div class="w80">
          <span @click="handleEdit(item, 'edit')" v-if="!item.isEdit">编辑</span>
          <template v-else>
            <span class="mr10" @click="handleEdit(item, 'cancel')">取消</span>
            <span @click="handleEdit(item, 'save')">保存</span>
          </template>
        </div>
      </li>
    </ul>
    <v-nodata :data="dataList.list" />
    <div class="mt25 align_center" v-if="dataList.total > 10">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const coding = codings.location
    const dataList: any = ref({})
    const auth: any = proxy.$auth.init('partner')

    function handleEdit(param: any, type: any) {
      if(type === 'cancel'){
        param.isEdit = false
        return
      }
      if(type === 'edit'){
        param.isEdit = true
      }else{
        param.isEdit = false
        store.dispatch('common/Fetch', {
          api: "changeData",
          data: {
            coding,
            id: param.id,
            field: 'address',
            value: param.address
          }
        }).then((res: any) => {
          init()
        })
      }
    }

    // 初始化
    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: "getLocation",
        data: {
          ...params
        }
      }).then(res => {
        dataList.value = res.result || []
      })
    }

    onMounted(() => {
      init()
    })
</script>
