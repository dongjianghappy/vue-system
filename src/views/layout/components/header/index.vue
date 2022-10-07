<template>
<div style="background: #001529; position: inherit;">
  <div class="logo" @click="handleRouter('', 'basic')">
    <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" width="25" class="mr10 left" style="margin-top: 20px;" />
    控制平台{{channelData.name ? `- ${channelData.name}` : ""}}
  </div>
  <div class="header-wrap">
    <div class="header-left">
      <ul style="display: flex; line-height: 64px;">
        <li class="align_center" style="width: 80px;" @click="handleclick">
          <i class="iconfont font20" :class="`icon-menu-${collapse ? 'fold1' : 'unfold'}`"></i>
        </li>
        <li style="flex: 1; line-height: 16px; padding-top:16px">
          <Search />
        </li>
      </ul>
    </div>
    <div class="header-right">
      <ul style="display: flex; line-height: 64px;">
        <li style="flex: 1">
          <Popover :content="userInfo.nickname" arrow="tb" offset="right" :move="-20" :keys="`static_${index}`">
            <ul class="font14 cl-333" style="display: block">
              <li style="height: 32px" @click="handleSelectServer(`/admin/collection/list?fid=${item.id}&name=${item.name}`)">个人中心</li>
              <li @click="routing('signOut')">退出</li>
            </ul>
          </Popover>
          <v-avatar :data="userInfo" style="margin-top: 16px;" />
        </li>
        <li class="mr15" style="width: 50px;">
          <span>消息<span class="badge"><sup class="number">0</sup></span></span>
          <video ref="video_visit" class="hide">
            <source src="@/assets/video/visit.mp3" type="audio/mp3">
          </video>
          <video ref="video_down" class="hide">
            <source src="@/assets/video/down.mp3" type="audio/mp3">
          </video>
          <video ref="video_register" class="hide">
            <source src="@/assets/video/register.mp3" type="audio/mp3">
          </video>
        </li>
        <li style="width: 50px;">风格</li>
        <li style="width: 50px;"><a href="http://www.yunxi10.com" target="_blank">首页</a></li>
        <li style="width: 50px;">旧版本</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  watch,
  useStore,
  useRouter,
  useRoute,
  getUid,
  channels
} from '@/utils'
import {
  basicInfo,
  information
} from '@/assets/const'
import Search from './Search.vue'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Header',
  components: {
    Search,
    Popover
  },
  emits: ['setRoute', 'update:collapse'],
  props: {
    collapse: {
      type: String,
      default: true
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const channelData: any = ref(channels());
    const router = useRouter();
    const route = useRoute();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const setting: any = computed(() => store.getters['user/setting']);
    const menu: any = basicInfo;
    const isInit: any = ref(true)
    const messge: any = information;
    const video_visit: any = ref(null)
    const video_down: any = ref(null)
    const video_register: any = ref(null)
    const jsspeak = ref(false)
    const broadcast: any = ref(0)
    const time: any = ref("")
    const message: any = ref({
      user: 0,
      download: 0,
      visit: 0,
      visit_yunxi: 0,
      visit_blog: 0
    })

    // 监听路由
    watch(route, (newValues, prevValues) => {
      channelData.value = channels()
    })

    // 监听语音播报设置
    watch(setting, (newVal, oldVal) => {
      clearTimeout(time.value)
      jsspeak.value = false
      for (let key in newVal) {
        if (newVal[key] === "1") {
          jsspeak.value = true
          break
        }
      }
      jsspeak.value && speaking()
    }, {
      immediate: true,
      deep: true
    });

    function handleRouter(param: any, module: any) {
      context.emit('setRoute', {
        path: param,
        module: module
      })
    }

    function handleclick(param: any) {
      context.emit('update:collapse', !props.collapse)
    }
    // 路由跳转
    function routing(param: any) {
      if (param === 'signOut') {
        store.dispatch('common/Fetch', {
          api: "signOut"
        }).then(res => {
          router.push(`/login`)
        })
      }
    }

    function speaking() {
      const speakMsg = new SpeechSynthesisUtterance()

      time.value = setInterval(() => {
        let speech = ""
        store.dispatch('common/Fetch', {
          api: "voiceBroadcast"
        }).then(res => {
          const {
            user,
            download,
            visit,
            visit_yunxi,
            visit_blog
          } = res.result
          if (isInit.value) {
            message.value = res.result
            isInit.value = false
            return
          }

          if (user > message.value.user) {
            speech = `07素材网有${user-message.value.user}个新的用户注册`
            message.value.user = res.result.user
            broadcast.value = 1

          } else if (download > message.value.download) {
            speech = `07素材网有${download-message.value.download}个新的下载资源`
            message.value.download = res.result.download
            broadcast.value = 2

          } else if (visit_yunxi > message.value.visit_yunxi) {
            speech = `07素材网有${visit_yunxi-message.value.visit_yunxi}个新的访问页面`
            message.value.visit_yunxi = res.result.visit_yunxi
            broadcast.value = 0

          } else if (visit_blog > message.value.visit_blog) {
            speech = `东江博客有${visit_blog-message.value.visit_blog}个新的访问页面`
            message.value.visit_blog = res.result.visit_blog
            broadcast.value = 0

          }
          // 本地播报
          else if (visit > message.value.visit && window.location.href.indexOf("localhost") > -1) {
            speech = `您有${visit-message.value.visit}个新的访问页面`
            message.value.visit = res.result.visit
            broadcast.value = 0

          }
          if (speech) {

            if (setting.value.register === '1' && broadcast.value === 1) {
              video_register.value && video_register.value.play()
            } else if (setting.value.download === '1' && broadcast.value === 2) {
              video_down.value && video_down.value.play()
            } else if(setting.value.visit === '1' && broadcast.value === 0) {
              video_visit.value && video_visit.value.play()
            }
            setTimeout(() => {
              speakMsg.text = speech; //文字内容
              speakMsg.lang = "zh-CN"; //使用的语言:中文
              speakMsg.volume = 1;
              //声音音量:0-1
              speakMsg.rate = 1.5;
              //语速:0-10
              speakMsg.pitch = 10;
              //音高:0-1
              window.speechSynthesis.speak(speakMsg)

            }, 1000)
          }

        })
      }, 20000)
    }

    return {
      loginuser,
      userInfo,
      channelData,
      menu,
      messge,
      handleRouter,
      handleclick,
      routing,
      video_visit,
      video_down,
      video_register
    }
  }
})
</script>

<style scoped>
.header {
  min-height: 60px;
  line-height: 60px;
  height: 64px;
}

.logo {
  box-shadow: #2f455a 1px 0px 3px;
  padding-left: 25px;
  width: 199px;
  height: 64px;
  line-height: 64px;
  float: left;
  font-size: 18px;
  color: #fff !important;
}

.header-wrap {
  display: flex;
  flex: 1;
}

.header-wrap .header-left {
  flex: 1;
  justify-content: space-between;
}

.header-wrap .header-right {
  width: 350px;
  color: #fff;
}

.header-wrap .header-right .dropDwon {
  width: 120px;
  color: #fff !important;
}
</style>
