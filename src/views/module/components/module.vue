<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-group" />
</v-button>
<v-drawer v-model:show="isShow" title="模块和单页搜索引擎管理" :style="{width: '700'}" :hasfooter="false">
  <template v-slot:extra>
    <Setting :data="{coding}" :render="init" />
  </template>
  <template v-slot:content>
    <div class="ptb5 plr10">模块</div>
    <div class="mb25 clearfix">
      <div class="col-md-4 p10" v-for="(item, index) in dataList.filter(item => item.type == '0')" :key="index">
        <div class="blog-wrap flex p10 radius-4" style="background: rgb(247, 248, 250); align-items: center;">
          <div class="photos" style="width: 80px;">
            <span style="display: inline-block;">
            <div class="relative">
              <i class="iconfont font36" :class="`icon-${item.icon}`" @click="handleRouter(item)" />
              </div>
            </span>
          </div>
          <div style="flex: 1">
            <div class="mb10 bold pl15">{{item.name}}</div>
            <div class="bg-white p5 font12 align_center" style="border-radius: 50px;">
              <span class="mr10">
                <CodeDetail :data="{coding: item.coding}" name="新增" :render="init" v-if="item.value==='code'" />
                <BlogDetail :data="{coding: item.coding}" name="新增" :render="init" v-else-if="item.value==='thirdBlog'" />
                <OfficicalWebsiteDetail :data="{coding: item.coding}" name="新增" :render="init" v-else-if="item.value==='officicalWebsite'" />
                <ToolDetail :data="{coding: item.coding}" name="新增" :render="init" v-else-if="item.value==='tool'" />
                <FileDetail :data="{coding: item.coding}" name="新增" :render="init" v-else-if="item.value==='file'" />
                <QuestionBankDetail :data="{coding: item.coding}" name="新增" :render="init" v-else-if="item.value==='questionBank'" />
                <VoteDetail :data="{coding: item.coding}" name="新增" :render="init" v-else-if="item.value==='vote'" />
                <ModelDetail :data="{coding: item.coding}" name="新增" :render="init" v-else-if="item.value==='model'" />
                <TrackMapDetail :data="{coding: item.coding}" name="新增" :render="init" v-else-if="item.value==='trackMap'" />
                <!-- <template v-else>新增</template> -->
              </span>
              <span>
                <Setting action="edit" :data="{id: item.id, coding}" :render="init" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ptb5 plr10">单页</div>
    <div>
      <div class="col-md-4 p10" v-for="(item, index) in dataList.filter(item => item.type == '1')" :key="index">
        <div class="blog-wrap flex p10 radius-4" style="background: rgb(247, 248, 250); align-items: center;">
          <div class="photos" style="width: 80px;">
            <span style="display: inline-block;">
            <div class="relative">
              <i class="iconfont font36" :class="`icon-${item.icon}`" />
              </div>
            </span>
          </div>
          <div style="flex: 1">
            <div class="mb10">{{item.name}}</div>
            <div>
              <Setting :data="{id: item.id, coding}" :render="init" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  codings,
  useStore
} from '@/utils'
import Setting from './setting.vue'
import CodeDetail from '../code/components/detail.vue'
import BlogDetail from '../thirdBlog/components/detail.vue'
import OfficicalWebsiteDetail from '../officicalWebsite/components/detail.vue'
import ToolDetail from '../tool/components/detail.vue'
import FileDetail from '../file/components/detail.vue'
import QuestionBankDetail from '../questionBank/components/detail.vue'
import VoteDetail from '../vote/components/detail.vue'
import ModelDetail from '../model/components/detail.vue'
import TrackMapDetail from '../trackMap/components/detail.vue'

  const props: any = defineProps({
      router: {
      type: Function,
      default: () => {
        return
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  })
    const store = useStore()
    const coding = codings.modules
    const isShow: any = ref(false)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: 'moduleList'
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleRouter(param: any) {
      props.router(param.value)
    }
</script>
