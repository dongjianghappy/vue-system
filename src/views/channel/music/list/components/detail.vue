<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "上传音频"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑音频' : '上传音频' " :data="{...data, coding: data.coding.art}" api="articleDetail" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <audio ref="show_video" :src="fileInfo.fileUrl || detail.file" type="video/mp4">
    </audio>
    {{data.coding}}
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
          <span class="label">所属风格</span>
          {{detail.parent}}
          <v-category name="选择风格" :data="{item: detail, coding: coding.cate}" :isMore="true" type="text"></v-category>

        </li>
        <li class="li" v-if="detail.kind === 'music'">
          <span class="label">语种</span>
          <v-radiobutton name="language" v-model:checked="detail.language" :enums="[{label: '华语', value: 'chinese'}, {label: '粤语', value: 'guangdong'},{label: '欧美', value: 'english'}, {label: '日语', value: 'Japanese'},{label: '韩语', value: 'korea'}, {label: '其他', value: 'other'}]" />
        </li>    
        <li class="li" v-if="detail.kind === 'music'">
          <span class="label">乐器</span>
          <v-radiobutton name="musical_instrument" v-model:checked="detail.musical_instrument" :enums="[{label: '吉他', value: '0'}, {label: '架子鼓', value: '1'}, {label: '钢琴', value: '2'}]" />
        </li>       
        <li class="li">
          <span class="label">类型</span>
          <v-radiobutton name="kind" v-model:checked="detail.kind" :enums="[{label: '歌曲', value: 'music'}, {label: '音效', value: 'effects'}]" />
        </li>
        <li style="padding-left: 100px" v-if="detail.kind === 'music'">
          <ul class="plr15" style="background: #f8f8fa;">
            <li class="li">
              <span class="label">歌手</span>
              <span class="mr15">{{detail.singer}}</span>
              <v-choose title="选择歌手" :data="{ item: detail, field: 'singer', coding: data.coding.singer }" v-model:checked="detail.singer_id" @choose="chooseSinger" type="radio" />
            </li>
            <li class="li">
              <span class="label">专辑</span>
              <span class="mr15">{{detail.album}}</span>
              <v-choose title="选择专辑" :data="{ item: detail, field: 'album', coding: data.coding.album, condition: {singer_id: detail.singer_id} }" v-model:checked="detail.album_id" @choose="chooseSinger" type="radio" :disabled="detail.singer_id ==='0'" />
            </li>
            <li class="li">
              <span class="label">歌词</span>
              <span class="mr15">{{detail.lrc}}</span>
              <v-choose title="选择歌词" :data="{ item: detail, field: 'lrc', coding: data.coding.lrc, condition: {namess: detail.name} }" v-model:checked="detail.lrc_id" @choose="chooseSinger" type="radio" />
            </li>
            <li class="li">
              <span class="label">歌谱</span>
              <span class="mr15">{{detail.score}}</span>
              <v-choose title="选择歌谱" :data="{ item: detail, field: 'score', coding: data.coding.score, condition: {namess: detail.name} }" v-model:checked="detail.score_id" @choose="chooseSinger" type="radio" />
            </li>
          </ul>
        </li>     
        <li class="li">
          <span class="label">音频描述</span>
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
import SpaceModal from '../../../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
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

    function chooseSinger(param: any){
      const {field, data} = param
      if(field === 'singer'){
        detail.value.singer_id = data.id
        detail.value.singer = data.name
      }else if(field === 'album'){
        detail.value.album_id = data.id
        detail.value.album = data.name
      }else if(field === 'lrc'){
        detail.value.lrc_id = data.id
        detail.value.lrc = data.name
      }else if(field === 'score'){
        detail.value.score_id = data.id
        detail.value.score = data.name
      }
    }

    function submit(params: any) {
      debugger
      const {
        id,
        fid,
        singer_id,
        album_id,
        lrc_id,
        score_id,
        title,
        kind,
        language,
        musical_instrument,
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
        singer_id,
        album_id,
        lrc_id,
        score_id,
        title,
        kind: kind || 'effects',
        language: language || 'chinese',
        musical_instrument: musical_instrument || '0',
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
      isplay,
      chooseSinger
    }
  }
})
</script>
