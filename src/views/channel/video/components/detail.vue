<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "上传视频"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑歌曲' : '上传视频' " :data="{...data, coding: coding.art}" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="pt50" style="text-align: center;" v-show="action === 'add' && !file">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="vidoe" v-model:file="fileInfo" uploadtype="music" format=".mp4" />
    </div>
    <div v-if="action === 'edit' || file">
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
          <span class="label">tag标签</span>
          <input v-model="detail.url" type="text" placeholder="请输入地址" class="input-sm input-full" />
        </li>
        <li class="li">
          <span class="label">所属分类</span>
          {{detail.parent}}
          <v-category name="选择分类" :data="{item: detail, coding: coding.cate}" type="text"></v-category>

        </li>
        <li class="li">
          <span class="label">是否显示</span>
          <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
          <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
        </li>
        <li class="li">
          <span class="label">视频描述</span>
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
} from '@/utils'
import SpaceModal from '../../../space/components/modalSpace.vue'
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

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
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
          debugger
          // if (response) {
          //   response(imgFile, dataBase64);
          // }
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

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'updateArticle' : 'insertArticle',
        data: {
          coding: props.coding.art,
          ...detail.value,
          cover: fileInfo.value.cover
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
      submit
    }
  }
})
</script>
