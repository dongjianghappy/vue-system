<template>
  <div>
    <div class="p15">
    
        <span></span>

        <span class="upfile"
            style="width: 100px; height: 100px;"
            @click="handleclick">上传歌曲</span>

     
    </div> <input type="file"
           id="filElem"
           accept=".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic, .mp3, .mp4"
           multiple="multiple"
           class="FileUpload_file_27ilM"
           style="display: none"
           @change="getFile">
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
  components: {

  },
  props: {
    uploadtype: {
      type: String,
      default: 'weibo'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  emits: ['imgList'],

  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const filElem = ref("filElem")
    let imgList: any = ref([])
    const dragging = ref(null)
    const box: any = ref(0)

    function getFile() {
      let _obj: any = document.getElementById(filElem.value);
      // var fd = new imgList();

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
      //  e.currentTarget.children[1].style.display= "none"
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

      console.log(dst);

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
