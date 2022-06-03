<template>
<span class="relative">
  <!-- <span class="pointer" @click="handelClick">
    搜索
  </span> -->
  <div class="search absolute" style="top: 10px; right: 10px">
    <div class="searchinput" style="line-height: 30px;">
      <input type="text" :placeholder="placeholder" v-model="content" @keypress.enter="search">
    </div>
    <div class="searchbtn" style="padding: 1px; line-height: 30px;">
      <a style="padding:0px" @click="search"><i class="iconfont icon-search"></i></a>
    </div>
  </div>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate
} from 'vue-router'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    field: {
      type: String,
      default: "title"
    },
    placeholder: {
      type: String,
      default: "关键词搜索"
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const isSearch: any = ref(false)
    const content: any = ref("")

    function search() {
     debugger
      const aaaa: any = {}
      aaaa[props.field] = content.value
      debugger
      props.render({
        ...aaaa
      })
    }

    function handelClick() {
      isSearch.value = !isSearch.value
    }
    return {
      search,
      isSearch,
      content,
      handelClick
    }
  }
})
</script>
