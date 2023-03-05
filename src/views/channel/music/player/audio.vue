<template>
<div>
  <i class="iconfont listen" :class="`icon-${isplay ? 'audio' : 'listen'}`" @click="handlePlay($event ,data.index, isplay)"></i>

  <audio :id='`listen_${data.index}`' ref="audio" :src="data.file" loop style="display: none"></audio>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Audio',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const isplay: any = ref(false)
    const audio: any = ref(null)

    function handlePlay(e: any, index: any, status: any) {
      if (!status) {
        VueEvent.emit("navbarSetting", index);
      }
      isplay.value = !isplay.value
      if (isplay.value) {
        audio.value.play()
      } else {
        audio.value.pause()
      }
    }
    onMounted(() => {
      VueEvent.on("navbarSetting", (index: any) => {
        for (let i = 0; i < props.data.number; i++) {
          if (index !== i) {
            let audioDom: any = document.getElementById(`listen_${i}`);
            isplay.value = false
            audioDom.pause()
            audioDom.currentTime = 0
          }
        }
      })
    })
    return {
      audio,
      isplay,
      handlePlay
    }
  }
})
</script>

<style>
.playTheme {
  background: #1b1b1b !important;
  color: #fff !important;
}

.icon-audio {
  font-size: 20px;
  color: #03a9f4;
}
</style>
