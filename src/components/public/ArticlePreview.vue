<template>
<div style="position: fixed;
padding: 50px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; background: rgba(0,2,6,.85); display: flex;min-height: 100vh; z-index: 100000;" @click="handleclick">
  <div style="background: #fff; flex: 1; display: flex; flex-flow: column;">
    <div class="relative" style="flex: 1; overflow: auto;">
      <div style="background: #fff; width: 100%; height: 100%;" @click.stop @mouseup="handleMouseup">
        <div class="p25 mb15">摘要: {{data.summary}}</div>
        <div class="p25" v-html="data.content"></div>
      </div>

    </div>
  </div>
  <div class="relative" style=" background: #f3efef; width: 350px" @click.stop>
    <Article :data="data" :wordsList="wordsList" :render="render" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  selection
} from '@/utils'
import Article from '@/views/channel/article/components/layer/article.vue'
// import Comment from '@/views/index/components/TalkItem/layer/form.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Article,
    // Comment
  },
  props: {
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
    },
    img: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    isShow: Boolean // 以前是`value：String`
  },
  emits: ['update:isShow'],
  setup(props, context) {

    const {
      ctx
    }: any = getCurrentInstance();
    const currentImg = ref(props.img)
    const currentIndex = ref({
      total: props.data.image.length - 1,
      num: props.data.image.indexOf(props.img)
    })

    const wordsList: any = ref(props.data.words.split(",") || [])
    document.getElementsByTagName("html")[0].style.overflow = "hidden"

    function handleclick() {
      document.getElementsByTagName("html")[0].style.overflow = ""
      context.emit('update:isShow', false)
    }

    function showImg(img: any, index: any) {
      currentImg.value = img
      currentIndex.value.num = index
    }

    function toggle(num: any) {
      currentIndex.value.num += num
      currentImg.value = props.data.image[currentIndex.value.num]
    }

    function handleMouseup(e: any) {
      selection.mouseup(e, wordsList.value)
      // let Objiect = getSelectionContent(e)
      // let con = Objiect.selectedText
      // let i = Objiect.rangePos
      // let o: any = calculateStr(con)
      // if (76 >= o) {
      //   selectSearchShow(con, i, e.target)
      // }
    }

    function calculateStr(con: any) {

      let str = 0
      for (let i = 0; i < con.length; i++) {
        let text = con.charAt(i);
        if (null !== text.match(/[^\x00-\xff]/gi)) {
          str = str + 2

        } else {
          str = str + 1
        }

        if (str > 76) {
          break
        }

      }

      return str
    }

    function selectSearchShow(con: any, i: any, e: any) {
      if (con.length === 0) {
        return
      }

      if (wordsList.value.indexOf(con) === -1) {
        wordsList.value.push(con)
      }
    }

    function getSelectionContent(e: any) {
      let Obj: any = {}
      let text = window.getSelection()
      let ob: any = {}
      let i = "";

      if (text && 0 !== text.rangeCount) {
        Obj = text.getRangeAt(0)
        ob = Obj && Obj.getBoundingClientRect()
        i = text.toString()
      }
      return {
        rangePos: ob,
        selectedText: i
      }
    }

    return {
      handleclick,
      currentImg,
      currentIndex,
      showImg,
      toggle,
      handleMouseup,
      wordsList
    }
  }
})
</script>
