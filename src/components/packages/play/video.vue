<template>
<div class="drawer-wrap align_left" :class="{'drawer-open': show}" style="top: 0">

  <div v-if="show">
    <div style="position: fixed; inset: 0px; background: #232222; display: flex; min-height: 100vh; z-index: 100000;">
      <div style="flex: 1 1 0%; display: flex; flex-flow: column;">
        <div class="relative" style="flex: 1 1 0%; text-align: center; height: 100%;">
          <video controls="" autoplay="" loop name="media" style="width: inherit; height: inherit;">
            <source :src="`http://localhost/source/public/video/${data.video}.${data.format}`" type="video/mp4">
          </video>
          <div>
            <div class="absolute" @click="handleCancel" style="background: #000; top: 15px; left: 30px; border-radius: 50%; width: 64px; height: 64px; line-height: 70px;"><i class="iconfont icon-close font24 cl-white"></i></div>
            <div class="absolute deg180" style="background: rgba(0, 0, 0, 0.3); top: 50%; left: 30px; border-radius: 30px; width: 60px; height: 60px;"><i class="iconfont icon-arrow"></i></div>
            <!--v-if-->
          </div>
        </div>
        <!--v-if-->
      </div>
      <div class="relative" style="background: rgb(255, 255, 255); width: 350px;">
        <div>
          <div class="con-list relative">
            <div class="con-wrap">
              <div class="photos"><a href="/{$sm_talklist[l].uid}/home" target="_blank"><img src="http://127.0.0.1//user/1101946957/photos/1101946957.png" width="30" height="30" class="showuserinfo" data-uid="{$sm_talklist[l].account}" data-placement="automatic" data-toggle="tooltip{$sm_talklist[l].id}" data-left="150"></a></div>
              <div class="user_info pb5"><span class="username">{{data.nickname}}</span></div>
              <div class="user_from pb5">{{data.times}}</div>
              <div class="user_text">
                <div>{{data.title}}</div>
                <!--转载渲染-->
                <div>
                  <div style="background: rgb(238, 238, 238); margin: 5px -15px -15px -80px; padding: 10px 15px 15px 80px;"><span class="showuserinfo" style="color: rgb(235, 115, 80);">@爱跳舞的芩芩</span><span><a>#前端开发知识#</a></span><!-- 视频预览 -->
                    <!--v-if-->
                  </div>
                </div>
                <!--原文渲染-->
              </div>
            </div>
            <div>
              <div class="bottom-wrap relative">
                <ul>
                  <li style="width: 33.3333%;"><i class="iconfont icon-star"></i><span>收藏 0</span></li>
                  <li style="width: 33.3333%;"><i class="iconfont icon-comment"></i>评论 0</li>
                  <li style="width: 33.3333%;"><span class="pointer block" data-v-9bbc7c4a="">
                      <!--v-if--><i class="iconfont icon-like" data-v-9bbc7c4a=""><span class="font12" data-v-9bbc7c4a="">点赞 1</span></i></span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="form-wrap" style="background: rgb(242, 242, 245);">
          <div>
            <div class="load7 h60">
              <div class="loader">Loading...</div>
            </div>
          </div>
        </div>
        <div class="layer-form-wrap absolute" style="left: 0px; bottom: 0px; right: 0px;">
          <div class="input-box"><input type="text" placeholder="请输入评论信息">
            <div class="expression">
              <!-- @mouseover="handleclick" @mouseleave="handleleave"--><span class="popover-face" style="display: inline-block;"><i class="iconfont icon-face"></i></span>
              <!--v-if-->
              <!-- <div id="toolface"
       class="info-box"
       style="top: 165px; left: 0; display: block; width: 450px; height: 350px"><i class="arrow top-arrow-out"
       style="left: 42px;"></i><i class="arrow top-arrow-in"
       style="left: 42px;"></i>
    <div class="popover_wrap">
      <div class="facebox">
        <ul>
          <li v-for="(item, index) in List"
              :key="index"
              style="    width: 32px;
    height: 32px;
    line-height: 32px;
    float: left;
    text-align: center;
"
              @click="ChooseEmoji(item.name)"><img src=""></li>
        </ul>
      </div>
    </div>
  </div> -->
            </div>
          </div>
          <div class="operate"><button class="operate-right disabled" disabled="">评论</button></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  props: {
    action: {
      type: String,
      default: "add"
    },
    // 标题
    className: {
      type: String,
      default: ""
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 是否有低部
    hasfooter: {
      type: Boolean,
      default: true
    },
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 是否有确认按钮
    confirm: {
      type: Boolean,
      default: true
    },
    // 是否有取消按钮
    cancel: {
      type: Boolean,
      default: true
    },
    // 宽度
    width: {
      type: String,
      default: '450px'
    },
    // 高度
    height: {
      type: String,
      default: '380px'
    },
    close: {
      type: Boolean,
      default: true
    },
    // 列表初始化数据
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    // 数据
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 接口
    api: {
      type: String,
      default: ""
    },
  },

  emits: ['update:show', 'submit'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const top = ref(`${document.documentElement.clientHeight/2-parseInt(props.height)/2}px`)
    const left = ref(`${document.documentElement.clientWidth/2-parseInt(props.width)/2}px`)
    const isShow = ref(props.show)

    // 监听弹窗变量
    watch([isShow], (newValues, prevValues) => {
      context.emit('update:show', false)
    })

    // 初始化数据
    async function init(param: any) {
      let data = {}
      if (props.action === 'edit') {
        await store.dispatch('common/Fetch', {
          api: props.api || "detail",
          data: {
            ...props.data,
            ...param
          }
        }).then(res => {
          data = res.result
        })
      }
      return data
    }

    function handleCancel() {
      context.emit('update:show', false)
    }

    function handleClick() {
      context.emit('submit')
    }

    return {
      handleClick,
      handleCancel,
      init,
      top,
      left,
      isShow
    }
  }
})
</script>

<style scoped>
.animation-fadein {
  -webkit-animation: fadeInUp .5s .2s ease both;
  -moz-animation: fadeInUp .5s .2s ease both;
}

@-webkit-keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(20px)
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0)
  }
}

@-moz-keyframes fadeInUp {
  0% {
    opacity: 0;
    -moz-transform: translateY(20px)
  }

  100% {
    opacity: 1;
    -moz-transform: translateY(0)
  }
}
</style>
