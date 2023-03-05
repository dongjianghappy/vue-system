<template>
<div>
  <div class="ablumimg p15">
    <ul v-if="file === 'image'">
      <li v-for="(item, index) in imgList" :key="index" style="width: 100px; height: 100px;" draggable="true" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
        <img draggable="true" :src="item.src" v-if="item.status ==='complete'" />
        <div class="load1" v-else>
          <div class="loader">Loading...</div>
        </div>
        <div class="cover" style="top: 0; display: none;"><i class="iconfont icon-close removeimg" @click="remove(index)"></i></div>
      </li>
      <li class="upfile" style="width: 100px; height: 100px;" @click="handleclick"><i class="iconfont icon-add"></i></li>
    </ul>
    <div style="display: inline-block" v-else-if="file === 'music'">
      <div style="display: inline-block; border-radius: 60px;
    background: #f8f8fa; width: 80px; height: 80px;  line-height: 85px;"><i class="iconfont icon-upload-file font32" /></div>
      <div>拖拽音频到此处或点击上传</div>
      <button class="btn btn-default w-full" @click="handleclick">上传音频</button>
    </div>
    <div style="display: inline-block" v-else>
      <div style="display: inline-block; border-radius: 60px;
    background: #f8f8fa; width: 80px; height: 80px;  line-height: 85px;"><i class="iconfont icon-upload-file font32" /></div>
      <div>拖拽视频到此处或点击上传</div>
      <button class="btn btn-default w-full" @click="handleclick">上传视频</button>
    </div>

  </div> <input type="file" id="filElem" :accept="format" multiple="multiple" class="FileUpload_file_27ilM" style="display: none" @change="getFile">
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'v-Upload',
  props: {
    file: {
      type: String,
      default: 'image'
    },
    uploadtype: {
      type: String,
      default: 'weibo'
    },
    format: {
      type: String,
      default: '.jpg, .jpeg, .bmp, .gif, .png, .heif, .heic, .mp4, .mp3'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  emits: ['imgList', 'update:haschoose', 'update:file'],

  setup(props, context) {
    const store = useStore();
    const filElem = ref("filElem")
    let imgList: any = ref([])
    const dragging = ref(null)
    const box: any = ref(0)

    function getFile() {
      let _obj: any = document.getElementById(filElem.value);
      context.emit('update:haschoose', _obj.files)
      for (let i = 0; i < _obj.files.length; i++) {
        imgList.value.push({
          src: _obj.files[i].name,
          status: "upload"
        })

        let fd = new FormData()
        fd.append('upload' + i, _obj.files[i])
        debugger
        store.dispatch('common/uploadImg', {
          uploadtype: props.uploadtype,
          dir: props.data.dir,
          upload: true,
          data: fd,
          progress: (e: any) => {
            debugger
            let url = URL.createObjectURL(_obj.files[i])
            let element = new Audio(url)
            // element.id="id_123123123"
            let format = _obj.files[i].name.split('.')[1]
            element.addEventListener('loadedmetadata', () => {
              // time = Math.round(element.duration * 100) / 100
              
              context.emit('update:file', {
              name: _obj.files[i].name,
              fileUrl: url,
              cover: "",
              format: format, // 格式
              duration: element.duration,
              progresstotal: e.total,
              bar: (e.loaded * 100) / e.total,
              size: `${(e.total / 1024 / 1024).toFixed(3)}MB`,
              loaded: `${(e.loaded / 1024 / 1024).toFixed(3)}MB`
            })
            })

            
          }
        }).then(res => {
          let aaa: any = imgList.value.filter((item: any) => item.status === "upload")
          aaa[0].status = "complete"
          aaa[0].src = res[0].img

          context.emit('imgList', img(imgList.value))
        })
      }
    }

    function img(data: any) {
      let abc = ""
      if (data.length) {
        abc = "|"
        for (let i = 0; i < data.length; i++) {
          let v = data[i].src.split("/");
          debugger
          v = v[v.length - 1].split(".")[0] + "|"
          abc += v
        }
      }
      return abc;
    }

    function handleclick() {
      let _obj: any = document.getElementById(filElem.value);
      _obj.dispatchEvent(new MouseEvent('click'))
    }

    function handleDragStart(e: any, item: any) {
      dragging.value = item
    }

    function handleDragEnd(e: any, item: any) {
      dragging.value = null
      document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
    }

    function handleDragOver(e: any) {
      e.dataTransfer.dropEffect = 'move'
    }

    function handleDragEnter(e: any, item: any) {
      e.dataTransfer.effectAllowed = 'move'
      if (item === dragging.value) {
        return
      }
      const newItems = [...imgList.value]
      const src = newItems.indexOf(dragging.value)
      const dst = newItems.indexOf(item)

      if (box.value !== dst) {
        document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
      }

      document.querySelectorAll('ul>li')[dst].setAttribute("class", "current")
      box.value = dst
      newItems.splice(dst, 0, ...newItems.splice(src, 1))
      imgList.value = newItems
      context.emit('imgList', img(imgList.value))
    }

    function remove(index: any) {
      imgList.value.splice(index, 1)
      context.emit('imgList', img(imgList.value))
    }
    return {
      handleclick,
      getFile,
      imgList,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      remove
    }
  }
})
</script>

<style scoped>
.current {
  padding: 2px;
  border: 2px dashed #fff;
}
</style>
