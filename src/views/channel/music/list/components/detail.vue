<template>
<v-button v-model:show="isShow">
  <template v-if="name">{{name}}</template>
  <template v-else>
    <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "上传音频"}}
  </template>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑音频' : '上传音频'" drafts="true" :data="{...data, coding: data.coding.art}" api="articleDetail" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <audio ref="show_video" :src="fileInfo.fileUrl || detail.file" type="video/mp4">
    </audio>
    <div class="pt50" style="text-align: center;" v-show="action === 'add' && !file">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="music" v-model:file="fileInfo" :uploadtype="kind === 'music' ? 'music' : 'sound'" format=".mp3, .wav" />
    </div>
    <div v-if="action === 'edit' || file">
    <v-tabs :tabs="tabsDetail" method="click">
      <template v-slot:extra>
        <Extra :data="detail" :channel="data.channel" :action="action" />
      </template>
      <template v-slot:content1>
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
          <span class="label">tag标签</span>
          <v-tag v-model:tags="detail.tag" />
        </li>
        <li class="li">
          <span class="label">{{kind === 'music' ? '所属风格' : '所属分类'}}</span>
          {{detail.parent}}
          <v-category :name="kind === 'music' ? '所属风格' : '所属分类'" :data="{item: detail, coding: data.coding.cate}" :isMore="true" type="text"></v-category>
        </li>
        <li class="li" v-if="kind === 'music'">
          <span class="label">语种</span>
          <v-radiobutton name="language" v-model:checked="detail.language" :enums="[{label: '华语', value: 'chinese'}, {label: '粤语', value: 'guangdong'},{label: '欧美', value: 'english'}, {label: '日语', value: 'Japanese'},{label: '韩语', value: 'korea'}, {label: '其他', value: 'other'}]" />
        </li>    
        <li class="li" v-if="kind === 'music'">
          <span class="label">乐器</span>
          <v-radiobutton name="musical_instrument" v-model:checked="detail.musical_instrument" :enums="[{label: '吉他', value: '0'}, {label: '架子鼓', value: '1'}, {label: '钢琴', value: '2'}]" />
        </li>    
        <li style="padding-left: 100px" v-if="kind === 'music'">
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
        <li class="li">
          <span class="label">聚合标签</span>
          <div>
            <v-checkboxgroup :tagList="flagList" :checked="detail.flags" />
          </div>
        </li>
      </ul>
      </template>
      <template v-slot:content2>
        <Customize :data="detail" :dataList="columnsList" />
      </template>
    </v-tabs>
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  computed,
  watch,
  durationTrans,
  useProps
} from '@/utils'
import { customize11, checkbox, channleSubmit } from '@/utils/fn'
import {
  tabsDetail
} from '@/assets/const/index'
import Customize from '../../../components/customize.vue'
import Extra from '../../../components/extra.vue'
  const props: any = defineProps(useProps)
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
    const flagList: any = ref([])
    const customizeDetail: any = ref({})
    const columnsList: any = ref([])
    const page = computed(() => store.getters['common/page']);

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        // 初始化数据
        detail.value = await drawer.value.init()
        // 获取聚合标签
        flagList.value = await checkbox({store})
        // 自定义字段数据获取
        const columns: any = await customize11({
          store,
          channel_id: props.data.channel.id
        })
        customizeDetail.value = columns.customizeDetail
        columnsList.value = columns.list
        
        let style = JSON.parse(detail.value.style || '{}')
        detail.value.style = style instanceof Object ? style : {}

        fileInfo.value = {}
        file.value = ""
        isplay.value = false
      }
    })

    // 监听
    watch([() => fileInfo.value.fileUrl], async (newValues: any, prevValues) => {
      setTimeout(() => {
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
      const {
        singer_id,
        album_id,
        lrc_id,
        score_id,
        language,
        musical_instrument,
        format,
        duration,
        time,
        size
      } = detail.value

      channleSubmit({
        store,
        props,
        detail: detail.value,
        customizeDetail: customizeDetail.value,
        data: {
          singer_id,
          album_id,
          lrc_id,
          score_id,
          language: language || 'chinese',
          musical_instrument: musical_instrument || '0',
          format,
          duration,
          time,
          size
        },
        callback: () => {
          props.render({
            page: page.value
          })
          isShow.value = false
        }
      })
    }
</script>
