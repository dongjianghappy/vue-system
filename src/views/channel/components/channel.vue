<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-app" />
</v-button>
<v-drawer v-model:show="isShow" title="频道管理" :style="{width: '700'}" :hasfooter="false">
  <template v-slot:extra>
    <v-space>
      <Instructions module="channel" />
      <Setting :data="{coding}" :render="init" />
    </v-space>
  </template>
  <template v-slot:content>
    <div class="clearfix">
      <div class="col-md-4 p10" v-for="(item, index) in dataList" :key="index">
        <div class="blog-wrap flex p10 radius-4" style="background: rgb(247, 248, 250); align-items: center;">
          <div class="photos" style="width: 80px;">
            <span style="display: inline-block;">
            <div class="relative">
              <i class="iconfont font36" :class="`icon-${item.icon}`" @click="handleRouter(item)" />
              </div>
            </span>
          </div>
          <div style="flex: 1">
            <div class="mb10 bold pl15 relative">{{item.name}}
              <Checked :data="{coding: item.coding}" :render="init" v-if="item.checked_num" />
            </div>
            <div class="bg-white p5 font12 align_center" style="border-radius: 50px;">
              <span class="mr10">
                <ArticleDetail :data="{channel: item, coding: item.coding}" name="新增" v-if="item.module ==='article' || item.module ==='tech' || item.module ==='topic'" />
                <PictureDetail :data="{channel: item, coding: item.coding}" name="上传" v-else-if="item.module ==='picture'" />
                <SourceDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='source'" />
                <DesignDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='design'" />
                <OfficeDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='office'" />
                <WebsiteDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='website'" />
                <HaositeDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='haosite'" />
                <WordsDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='words'" />
                <DigitalDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='digital'" />
                <FunnyDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='funny'" />
                <NotesDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='notes'" />
                <QustionsDetail :data="{channel: item, coding: item.coding}" name="提问" v-else-if="item.module ==='questions'" />
                <VideoDetail :data="{channel: item, coding: item.coding}" name="上传" v-else-if="item.module ==='video'" />
                <MusicDetail :data="{channel: item, coding: item.coding}" name="上传" v-else-if="item.module ==='music' || item.module ==='sound'" />
                <LearnDetail :data="{channel: item, coding: item.coding}" name="新增" v-else-if="item.module ==='learn'" />
                <DocumentDetail :data="{channel: item, coding: item.coding}" name="上传" v-else-if="item.module ==='document'" />
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
import Instructions from '../../links/components/instructions.vue'
import Setting from './setting.vue'
import Checked from '../../data/components/checked.vue'
import ArticleDetail from '../detail/articleDetail.vue'
import PictureDetail from '../detail/pictureDetail.vue'
import VideoDetail from '../detail/videoDetail.vue'
import MusicDetail from '../music/list/components/detail.vue'
import FunnyDetail from '../detail/funnyDetail.vue'
import NotesDetail from '../detail/notesDetail.vue'
import QustionsDetail from '../detail/qustionsDetail.vue'
import SourceDetail from '../detail/sourceDetail.vue'
import WebsiteDetail from '../detail/websiteDetail.vue'
import HaositeDetail from '../detail/haositeDetail.vue'
import DesignDetail from '../detail/designDetail.vue'
import OfficeDetail from '../detail/officeDetail.vue'
import WordsDetail from '../detail/WordsDetail.vue'
import DigitalDetail from '../detail/DigitalDetail.vue'
import LearnDetail from '../detail/learnDetail.vue'
import DocumentDetail from '../detail/documentDetail.vue'

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
    const coding = codings.channel
    const isShow: any = ref(false)
    const currentValue: any = ref("manage")
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "channelList",
        data: {
          management_checked: 0
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleRouter(param: any) {
      props.router(param.module)
    }
</script>
