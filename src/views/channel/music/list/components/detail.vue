<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "上传音频"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑音频' : '上传音频' " :data="{...data, coding: coding.art}" api="articleDetail" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <audio ref="show_video" :src="fileInfo.fileUrl || detail.file" type="video/mp4">
    </audio>
    <div class="pt50" style="text-align: center;" v-show="action === 'add' && !file">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="music" v-model:file="fileInfo" uploadtype="music" format=".mp3, .wav" />
    </div>
    <div v-if="action === 'edit' || file">
     
      <div class="mt25 mb25" style="border-bottom: 1px solid #eee; line-height: 25px;">
        <div style="display: flex">
          <div style="flex: 1;">文件名: {{fileInfo.name || detail.song_name}} <span class="ml5">{{fileInfo.size  || `${(detail.size / 1024 / 1024).toFixed(3)}MB`}}</span>
            <span class="ml10" @click="onPlay">
              <i class="iconfont" :class="`icon-${isplay ? 'stop' : 'play1'}`" />
            </span>
          </div>
          <div class="cl-red pointer" style=" width: 60px; text-align: right" @click="upload.handleclick()">重新上传</div>
        </div>
        <div v-if="Object.keys(fileInfo).length > 0">
          <v-progress :data="fileInfo" />
        </div>
      </div>
      <ul class="form-wrap-box">
        <li class="li clearfix">
          <span class="label">音频名称</span>
          <input v-model="detail.title" type="text" placeholder="请输入音频名称" class="input-sm input-full" />
        </li>
        <li class="li">
          <span class="label">是否显示</span>
          <v-radio label="是" name="checked" value="1" v-model:checked="detail.checked" />
          <v-radio label="否" name="checked" value="0" v-model:checked="detail.checked" />
        </li>
        <li class="li">
          <span class="label">tag标签</span>
          <v-tag v-model:tags="detail.tag" />
        </li>
        <li class="li">
          <span class="label">所属分类</span>
          {{detail.parent}}
          <v-category name="选择分类" :data="{item: detail, coding: coding.cate}" type="text"></v-category>

        </li>
        <li class="li">
          <span class="label">类型</span>
          <v-radiobutton name="kind" v-model:checked="detail.kind" :enums="[{label: '音效', value: 'effects'}, {label: '歌曲', value: 'music'}]" />
        </li>
        <li style="padding-left: 100px" v-if="detail.kind === 'music'">
          <ul class="plr15" style="background: #f8f8fa;">
            <li class="li">
              <span class="label">歌手</span>
              <span class="mr15">{{singer.name}}</span>
              <Choose title="选择歌手" :data="data" v-model:checked="singer" type="radio" :render="init" />
            </li>
            <li class="li">
              <span class="label">专辑</span>
              <span class="mr15">{{special.name}}</span>
              <Choose title="选择专辑" :data="data" v-model:checked="special" type="radio" :render="init" />
            </li>
            <li class="li">
              <span class="label">歌词</span>
              <span class="mr15">{{lrc.name}}</span>
              <Choose title="选择歌词" :data="data" v-model:checked="lrc" type="radio" :render="init" />
            </li>
          </ul>
        </li>
        <li class="li">
          <span class="label">音效描述</span>
          <textarea placeholder="请输入单页摘要" v-model="detail.summary" class="w-full"></textarea>
        </li>
      </ul>
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
  durationTrans
} from '@/utils'
import Choose from '../../../../links/components/chooseSite.vue'
import SpaceModal from '../../../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Choose,
    SpaceModal
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
    coding: {
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
    const detail: any = ref({})
    const file: any = ref("")
    const fileInfo: any = ref({})
    const show_video: any = ref(null)
    const singer: any = ref("")
    const special: any = ref("")
    const lrc: any = ref("")
    const isplay: any = ref(false)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        fileInfo.value = {}
        detail.value = await drawer.value.init()
        file.value = ""
        isplay.value = false
      }
    })

    // 监听
    watch([() => fileInfo.value.fileUrl], async (newValues: any, prevValues) => {
      setTimeout(() => {
        debugger
        detail.value.title = fileInfo.value.name.substring(0, fileInfo.value.name.lastIndexOf("."))
        detail.value.format = fileInfo.value.format
        detail.value.duration = fileInfo.value.duration
        detail.value.time = durationTrans(fileInfo.value.duration)
        detail.value.size = fileInfo.value.progresstotal
        isplay.value = false
      }, 10)
    })

    function dataURLtoFile(dataBase64: any, filename: any) {
      const arr = dataBase64.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n: any = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {
        type: mime
      });
    }
    
    function onPlay(){
      isplay.value = !isplay.value
      show_video.value.play()
      if (isplay.value) {
        show_video.value.play()
      } else {
        show_video.value.pause()
      }
    }

    function submit(params: any) {
      debugger
      const {
        id,
        fid,
        title,
        kind,
        summary,
        tag,
        format,
        duration,
        time,
        size,
        checked
      } = detail.value
      const param: any = {
        fid,
        title,
        kind: kind || 'effects',
        summary,
        tag: tag ? tag.join(',') : "",
        format,
        duration,
        time,
        size,
        checked
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'updateArticle' : 'insertArticle',
        data: {
          coding: props.coding.art,
          ...param,
        }
      }).then(() => {
        props.render()
        params.message()
        params.cancel()
      })
    }

    return {
      isShow,
      detail,
      drawer,
      upload,
      file,
      fileInfo,
      show_video,
      singer,
      special,
      lrc,
      submit,
      onPlay,
      isplay
    }
  }
})
</script>

function dataURLtoFile(dataBase64: string, arg1: string) {
  throw new Error('Function not implemented.')
}

function dataURLtoFile(dataBase64: string, arg1: string) {
  throw new Error('Function not implemented.')
}
