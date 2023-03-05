<template>
<div>
  <div class="con-list relative" style="background: none;">
    <div class="con-wrap">
      <div class="photos">
        <a href="/{$sm_talklist[l].uid}/home" target="_blank">
          <img :src="data.photos" width="30" height="30" class="showuserinfo" data-uid="{$sm_talklist[l].account}" data-placement="automatic" data-toggle="tooltip{$sm_talklist[l].id}" data-left="150" />
        </a>
      </div>

      <div class="user_info pb5"><span class="username">{{data.nickname}}</span></div>
      <div class="user_from pb5">{{data.times}}</div>
      <div class="user_text">
        <div class="bold mb10" v-html="data.title"></div>
        <p class="mb10">分类: {{data.parent}}</p>
        <div class="mb10"> 标签: {{data.tag}}</div>
        <div class="bg-white p15">
          <div class="mb5">文章词库
            <span class="pointer right" @click="saveWord">保存</span>
          </div>
          <perfect-scrollbar v-if="wordsList.length > 0">
          <ul class="form-wrap-box" >
            <li class="p10 vertical mb5" style="background: #f8f8f8;" v-for="(item, index) in wordsList" :key="index">
              <div class="label relative plr25">
                <span class="absolute" style="left: 0">
                  {{index+1}}、
                </span>
                <div contenteditable="true" class="content-editable" @blur="textBlur($event, index)">
                  {{item}}
                </div>
                <span class="absolute" style="right: 0;
    top: 0;"><i class="iconfont icon-close font12 pointer" @click="handleDelete(item)" /></span>
              </div>

            </li>
          </ul>
          </perfect-scrollbar>
          <div class="p15" style="background: #f8f8f8;" v-else>暂时无词库</div>
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
    <TalkItembar :data="data" />
  </div>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  useRouter,
  getUid
} from '@/utils'
// import TalkItembar from './TalkItembar.vue'

export default defineComponent({
  name: 'TalkItemView',
  components: {
    // TalkItembar,
    Comment
  },
  props: {
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
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const router = useRouter();
    const showFlag = ref(false)

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
      let index = props.wordsList.findIndex((item: any) => item === word)
      props.wordsList.splice(index, 1)
    }

    function saveWord(e: any) {
        store.dispatch('common/Fetch', {
          api: "changeData",
          data: {
            coding: props.data.coding,
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

    return {
      showImg,
      showFlag,
      handleclick,
      textBlur,
      handleDelete,
      saveWord
    }
  }
})
</script>

<style scoped>
.ps {
  height: 380px;
}
</style>