<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="设置" :style="{width: '350'}" :data="{...data, coding}" :param="detail" :submit="submit">
  <template v-slot:content v-if="isShow">
    <audio ref="show_video" :src="fileInfo.fileUrl || detail.file" type="video/mp4">
    </audio>
    <div class="pt50 hide" style="text-align: center;">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="music" v-model:file="fileInfo" uploadtype="system" format=".mp3, .wav" />
    </div>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.name" placeholder="请输入页面名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.value" placeholder="请输入页面字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">icon图标</span>
        <input type="text" v-model="detail.icon" placeholder="请输入icon图标" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">颜色</span>
        <input type="text" v-model="detail.color" placeholder="请输入颜色" class="input-sm input-full" />
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  codings,
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'
import {
  tabsSetting
} from '@/assets/const'
export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    action: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore()
    const coding = codings.channel_config
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const fileInfo: any = ref({})
    const detail: any = ref({})
    const show_video: any = ref(null)
    const isplay: any = ref(false)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        fileInfo.value = {}
        detail.value = await drawer.value.init()
        isplay.value = false
      }
    })

    // 监听
    watch([() => fileInfo.value.fileUrl], async (newValues: any, prevValues) => {
      setTimeout(() => {
        debugger
        detail.value.title = fileInfo.value.name.substring(0, fileInfo.value.name.lastIndexOf("."))
        isplay.value = false
      }, 10)
    })

    function onPlay() {
      isplay.value = !isplay.value
      show_video.value.play()
      if (isplay.value) {
        show_video.value.play()
      } else {
        show_video.value.pause()
      }
    }

    function handleChange(e: any, param: any) {
      param.broadcast = e.currentTarget.checked ? '1' : '0'
    }

    function submit(cancel: any) {
      debugger
      const {
        fid,
        name,
        value,
        icon,
        color
      } = detail.value

      const param: any = {
        fid: fid || props.data.fid,
        name,
        value,
        icon,
        color
      }

      if (props.action !== "add") { //  && props.param
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: coding,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      coding,
      tabsSetting,
      detail,
      drawer,
      handleChange,
      submit,
      upload,
      fileInfo,
      show_video,
      onPlay,
      isplay
    }
  }
})
</script>
