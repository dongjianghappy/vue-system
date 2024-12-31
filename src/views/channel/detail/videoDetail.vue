<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "上传视频"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑视频' : '上传视频' " :data="{...data, coding: data.coding.art}" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="pt50" style="text-align: center;" v-show="action === 'add' && !file">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="vidoe" v-model:file="fileInfo" uploadtype="music" format=".mp4" />
    </div>
    <div v-if="action === 'edit' || file">
    <v-tabs :tabs="tabsDetail" method="click">
          <template v-slot:extra>
            <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
              <input type="checkbox" v-model="detail.checked" :checked="detail.checked" class="mr5" style="float: left;"><span>显示</span>
            </label>
            <!-- <span class="mr10"><button class="btn btn-default btn-primary" @click="handleUpdate(detail)">生成静态</button></span>
            <span><a class="btn btn-default btn-primary" :href="`http://www.${channelData.server}/${channelData.module}/${detail.id}.html`" target="_blank">预览</a></span> -->
          </template>
          <template v-slot:content1>
          <div class="mt25" style="border-bottom: 1px solid #eee; line-height: 25px;">
            <div style="display: flex">
              <div>文件名: {{fileInfo.name}} <span class="ml5">{{fileInfo.size}}</span></div>
              <div style="flex: 1; text-align: right" @click="upload.handleclick()">重新上传</div>
            </div>
            <div>
              <v-progress :data="fileInfo" />
            </div>
          </div>
          <div style="display: flex">
            <div style="width: 50%; height: 300px; text-align: center; background: #000;">
              <video ref="show_video" controlslist="nodownload" controls="" autoplay loop name="media" style="width: inherit; height: inherit;">
                <source :src="fileInfo.fileUrl || detail.video" type="video/mp4">
              </video>
            </div>
            <div style="flex: 1; height: 300px; text-align: center; background: #000;">
              <img :src="fileInfo.cover || detail.cover" alt="" style="height: inherit">
            </div>
          </div>
          <ul class="form-wrap-box">
            <li class="li clearfix">
              <span class="label">标题</span>
              <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" />
            </li>
            <li class="li">
              <span class="label">标签</span>
              <v-tag v-model:tags="detail.tag" />
            </li>
            <li class="li">
              <span class="label">所属分类</span>
              {{detail.parent}}
              <v-category name="选择分类" :data="{item: detail, coding: data.coding.cate}" type="text"></v-category>
            </li>
            <li class="li">
              <span class="label">视频描述</span>
              <textarea placeholder="请输入单页摘要" v-model="detail.summary" class="w-full"></textarea>
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
  watch,
  computed,
  channels,
  useProps
} from '@/utils'
import { customize11, checkbox, channleSubmit } from '@/utils/fn'
import {
  tabsDetail
} from '@/assets/const/index'
import Customize from '../components/customize.vue'
  const props: any = defineProps(useProps)
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    const file: any = ref("")
    const fileInfo: any = ref({})
    const show_video: any = ref(null)
    const flagList: any = ref([])
    const customizeDetail: any = ref({})
    const columnsList: any = ref([])
    const channelData: any = channels();
    const page = computed(() => store.getters['common/page']);

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        flagList.value = await checkbox({store}) // 获取聚合标签
        // 自定义字段数据获取
        const columns: any = await customize11({
          store,
          channel_id: channelData.id
        })
        customizeDetail.value = columns.customizeDetail
        columnsList.value = columns.list
        file.value = ""
      }
    })

    // 监听
    watch([() => fileInfo.value.fileUrl], async (newValues: any, prevValues) => {
      show_video.value.load()
      setTimeout(() => {
        detail.value.title = fileInfo.value.name.substring(0, fileInfo.value.name.lastIndexOf("."))
        detail.value.duration = show_video.value.duration
        detail.value.size = fileInfo.value.progresstotal

        const canvas = document.createElement('canvas');
        canvas.width = 250;
        canvas.height = 500;
        const ctx: any = canvas.getContext('2d');
        ctx.drawImage(show_video.value, 0, 0, 250, 500);
        const dataBase64 = canvas.toDataURL('image/png'); // 完成base64图片的创建
        fileInfo.value.cover = dataBase64;
        if (dataBase64) {
          const imgFile = dataURLtoFile(dataBase64, `${new Date().getTime()}.png`);
        }
      }, 1000)
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


    function submit(params: any) {
      channleSubmit({
        store,
        props,
        detail: detail.value,
        cover: fileInfo.value.cover,
        customizeDetail: customizeDetail.value,
        callback: () => {
          props.render({
            page: page.value
          })
          isShow.value = false
        }
      })
    }
</script>
