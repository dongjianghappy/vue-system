<template>
<i class="iconfont icon-dot cl-red no-event" style="position: absolute; top: 0px; left: 20px; font-size: 32px !important;" v-if="messgeData.unread"></i>
<video ref="audio" style="display: none">
  <source src="@/assets/video/visit.mp3" type="audio/mp3">
</video>
<v-popover content="消息" arrow="tb" offset="right" :move="-60" keys="popover-message">
  <div style="width: 150px; height: auto">
    <ul class="p15 font14" style="display: block">
      <li style="height: 32px" v-for="(item, index) in messgeData.message" :key="index" @click="router('message', 'message')">{{item.name}}
        <span class="cl-white p5 mt10 right align_center font12" style="background: #f00; width: 25px; height: 15px; line-height: 5px; border-radius: 100px;">{{item.num}}</span>
      </li>
    </ul>
  </div>
</v-popover>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  useStore
} from '@/utils'
export default defineComponent({
  name: 'v-Message',
  props: {
    router: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const messgeData: any = ref({})
    const time: any = ref(null)

    const audio: any = ref(null)
    const speakMsg = new SpeechSynthesisUtterance()

    function getMessage() {

      store.dispatch('common/Fetch', {
        api: 'voiceBroadcast',
      }).then((res: any) => {
        messgeData.value = res.result

        for (let i = 0; i < messgeData.value.message.length; i++) {
          // 开启语音播报且有新的消息
          if (messgeData.value.message[i].broadcast) {
            audio.value.src = messgeData.value.message[i].audio
            audio.value.load()
            audio.value.play()
            setTimeout(() => {
              speakMsg.text = messgeData.value.message[i].speech; //文字内容
              speakMsg.lang = "zh-CN"; //使用的语言:中文
              speakMsg.volume = 1;
              //声音音量:0-1
              speakMsg.rate = 1.5;
              //语速:0-10
              speakMsg.pitch = 10;
              //音高:0-1
              window.speechSynthesis.speak(speakMsg)

            }, 2000)
          }
        }
      })
    }
    onMounted(() => {
      getMessage()
      time.value = setInterval(() => {
        getMessage()
      }, 20000)
    })
    return {
      messgeData,
      audio
    }
  }
})
</script>
