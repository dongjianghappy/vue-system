<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="设置" :style="{width: '350'}" :data="data" :param="detail" :submit="submit">
  <template v-slot:content v-if="isShow">
    <audio ref="show_video" :src="fileInfo.fileUrl || detail.file" type="video/mp4">
    </audio>
    <div class="pt50 hide" style="text-align: center;">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="music" v-model:file="fileInfo" uploadtype="system" format=".mp3, .wav" />
    </div>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">消息名称</span>
        <input type="text" v-model="detail.remark" placeholder="请输入页面名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.name" placeholder="请输入页面字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">设置类型</span>
        <v-select :enums="[{value: 'input', name: '文本框'}, {value: 'select', name: '下拉框'}, {value: 'switch', name: '开关'}]" v-model:value="detail.text_type" :defaultValue="detail.text_type = detail.text_type ? detail.text_type : 'select'" />
      </li>
      <li class="li">
        <span class="label">消息描述</span>
        <textarea placeholder="请输入描述说明" v-model="detail.description" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">语音</span>
        <div style="display: flex">
          <div style="flex: 1;">音频
            <span class="ml10" @click="onPlay">
              <i class="iconfont" :class="`icon-${isplay ? 'stop' : 'play1'}`" />
            </span>
          </div>
          <div class="cl-red pointer" style=" width: 60px; text-align: right" @click="upload.handleclick()">
            {{action == 'add' ? '上传' : '重新上传'}}
          </div>
        </div>
      </li>
      <li style="padding-left: 100px">
        <div class="plr15" style="background: #f8f8fa;">
          <div>
            <div>播报</div>
            <input type="checkbox" :value="detail.broadcast" :checked="detail.broadcast == '1' ? true: false" @change="handleChange($event, detail)" />
          </div>
          <div>
            <div>话术</div>
            <textarea placeholder="请输入播报话术" v-model="detail.speech" class="w-full"></textarea>
          </div>
        </div>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
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
      const {
        fid,
        name,
        text_type,
        description,
        broadcast,
        speech,
        remark
      } = detail.value

      const param: any = {
        fid: fid || props.data.fid,
        name,
        text_type,
        description,
        broadcast,
        speech,
        remark
      }

      if (props.action !== "add") { //  && props.param
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
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
