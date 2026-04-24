<template>
<div>
  <div class="con-list relative" style="background: none;">
    <div class="con-wrap">
      <div class="photos">
        <img :src="data.photos" onerror="this.src='/images/head_normal_100.png'" width="30" height="30" class="showuserinfo" data-uid="{$sm_talklist[l].account}" data-placement="automatic" data-toggle="tooltip{$sm_talklist[l].id}" data-left="150" />
      </div>
      <div>
        <span class="absolute" style="top: 15px; right: 15px;">
          <!-- <ArticleDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" :auth="true" /> -->
          <ArticleDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-if="data.channel.module ==='article' || data.channel.module ==='tech' || data.channel.module ==='topic'" />
          <PictureDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='picture'" />
          <SourceDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='source'" />
          <DesignDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='design'" />
          <OfficeDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='office'" />
          <WebsiteDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='website'" />
          <HaositeDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='haosite'" />
          <WordsDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='words'" />
          <DigitalDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='digital'" />
          <FunnyDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='funny'" />
          <NotesDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='notes'" />
          <QustionsDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='questions'" />
          <VideoDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='video'" />
          <MusicDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='music' || data.channel.module ==='sound'" />
          <LearnDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='learn'" />
          <DocumentDetail action="edit" :data="{channel: data.channel, id: data.id, coding: data.coding}" :render="render" v-else-if="data.channel.module ==='document'" />
          <Synchronous :data="data"/>
          <span class="mr10" @click="handleUpdate(data)">生成静态</span>
        </span>
      </div>
      <div class="user_info pb5"><span class="username">{{data.nickname}}</span></div>
      <div class="user_from pb5">{{data.times}}</div>
      <div class="user_text">
        <div class="bold mb10">
          {{data.channel.name}}<i class="iconfont icon-dot" /><span v-html="data.title"></span>
        </div>
        <div class="mb10">ID: {{data.id}}</div>
        <div class="mb10">分类: {{data.parent}}</div>
        <div class="mb10"> 来源: <span v-if="data.method=='1'">{{data.source}}</span>
                <span v-else-if="data.method=='2'">原</span>
                <span v-else-if="data.method=='3'">搞</span>
                <span v-else>Ai</span>
        </div>
        <div class="mb10"> 描述: {{data.description}}</div>
        <div class="mb10"> 标签: {{data.tag}}</div>
        <div class="mb10"> 浏览: {{data.visit}}</div>
        <div class="mb10">
          相册: 
          <span v-if="data.image && data.image.length">
            <v-thumbnail :data="data" :coding="data.coding.art" icon="img" :hasInfo="false" />
          </span>
          <span v-else>无</span>
        </div>
        <!--转载渲染-->
        <template v-if="data.list">
          <div v-for="(list, i) in data.list" :key="i">
            <div v-if="list.video || list.image" style="background:#eee; margin-top: 5px; margin-left: -80px; margin-right: -15px; margin-bottom: -15px; padding-top: 10px; padding-left: 80px; padding-right:15px;    padding-bottom: 15px;">
              <span @click="handleclick(list.account || list.uid)" class="showuserinfo" style="color: #eb7350;">@{{list.nickname}}</span>

              <span v-html="list.summary"></span>
              <!-- 视频预览 -->
              <video v-if="list.video" src="{$sm_talklist[l].video}" class="playmp4" style="width: 450px; height: auto;">
                您的浏览器不支持HTML5
              </video>
            </div>
            <div v-else>
              <!-- 这部分显示最后转载用户吧 -->
              <span @click="handleclick(list.account || list.uid)" class="showuserinfo" style="color: #eb7350;">@{{list.nickname}}</span>
              <span v-html="list.summary"></span>
            </div>
          </div>
        </template>
        <!--原文渲染-->
      </div>
    </div>
    <Talkdatabar :data="data" />
  </div>

</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  useStore,
  useRouter,
  getUid
} from '@/utils'
import ArticleDetail from '../../../detail/articleDetail.vue'
import PictureDetail from '../../../detail/pictureDetail.vue'
import VideoDetail from '../../../detail/videoDetail.vue'
import MusicDetail from '../../../music/list/components/detail.vue'
import FunnyDetail from '../../../detail/funnyDetail.vue'
import NotesDetail from '../../../detail/notesDetail.vue'
import QustionsDetail from '../../../detail/qustionsDetail.vue'
import SourceDetail from '../../../detail/sourceDetail.vue'
import WebsiteDetail from '../../../detail/websiteDetail.vue'
import HaositeDetail from '../../../detail/haositeDetail.vue'
import DesignDetail from '../../../detail/designDetail.vue'
import OfficeDetail from '../../../detail/officeDetail.vue'
import WordsDetail from '../../../detail/WordsDetail.vue'
import DigitalDetail from '../../../detail/DigitalDetail.vue'
import LearnDetail from '../../../detail/learnDetail.vue'
import DocumentDetail from '../../../detail/documentDetail.vue'
import Synchronous from '@/views/channel/components/synchronous.vue'
  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    wordsList: {
      type: Array,
      default: () => {
        return []
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  })
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const router = useRouter();
    const showFlag: any = ref(false)

    function showImg() {
      showFlag.value = !showFlag.value
    }

    function handleclick(uid: any) {
      if (getUid() !== uid) {
        const path = window.location.pathname.split("/")
        window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
      } else {
        router.push(`${proxy.const.u}${uid}/home`)
      }
    }

    function textBlur(e: any, index: any) {
      debugger
      props.wordsList[index] = e.currentTarget.innerHTML
    }

    function handleDelete(word: any) {
      let index = props.wordsList.findIndex((data: any) => data === word)
      props.wordsList.splice(index, 1)
    }

    // 静态更新
    function handleUpdate(param: any) {
      debugger
      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          serve: props.data.channel.server,
          id: param.id,
          action: 'singleArticle',
          model: props.data.channel.module
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "更新成功"
        })
      })
    }    

    function saveWord(e: any) {
        store.dispatch('common/Fetch', {
          api: "changeData",
          data: {
            coding: props.data.coding.art,
            id: props.data.id,
            field: "words",
            value: props.wordsList.join(",")
          }
        }).then(res => {
          proxy.$hlj.message({
            msg: "保存成功"
          })
          props.render()
        })
    }
</script>
