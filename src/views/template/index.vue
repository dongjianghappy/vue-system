<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="模板管理">
      <template v-slot:extraleft>
        <Popover :content="`${module.name}模板`" arrow="tb" offset="right" :move="-10" :keys="`static111}`">
          <ul>

            <li class="font14" style="line-height: 35px;" @click="handleClicksss(data, i)" v-for="(data, i) in sorter" :key="i">{{data}}</li>
          </ul>
        </Popover>
      </template>
      <template v-slot:extraright>
        <span class="mr15" v-if="!isEdit">共有{{dataList.length}}个文件</span>
        <span @click="handelReturn">返回上级目录</span>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p0">
    <div v-if="!isEdit">
      <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
        <div class="card space-wrap relative align_center" @click="handleClick(item)">
          <div :class="`space-file`">
            <div>
              <img src="@/assets/image/file.jpg" alt="" v-if="item.type === 'folder'">
              <img src="@/assets/image/ie.png" alt="" v-else-if="item.type === 'htm'">
              <img src="@/assets/image/css_file.png" alt="" v-else-if="item.type === 'css'">
              <img src="@/assets/image/js.jpg" v-else alt="">
            </div>
            <div class="nowrap">{{item.name}}</div>
          </div>
        </div>

      </div>
    </div>
    <div class="p10" v-else>
      <textarea v-model="dataList.content" style="width: 100%; height: 600px" />
      <button class="btn btn-default">保存</button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  watch,
  getQuery,
  useRouter,
  useRoute
} from '@/utils'
import {
  useStore
} from 'vuex'
import Popover from '@/components/packages/popover/index.vue';
import EditFile from './components/editFile.vue';
import Button from '@/components/common/Button.vue';
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Popover,
    EditFile,
    Button
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    const dir: any = ref("")
    const router = useRouter();
    const route = useRoute();
    const sorter: any = {
      0: '公共',
      1: '资源',
      2: '资讯',
      3: '科技',
      4: '图片',
    }
    const module: any = ref({
      name: "公共",
      value: 0
    })
    const isEdit: any = ref(false)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/template') {
        init({
          dir: window.location.search.split('?')[1],
        })
      }
    })

    function init(param: any) {
      store.dispatch('common/Fetch', {
        api: "template",
        data: {
          ...param
        }
      }).then(res => {
        dataList.value = res.result.list || res.result
      })
    }

    function handleClicksss(name: any, value: any) {
      module.value.name = name
      module.value.value = value
      isEdit.value = false
      router.push(`/admin/template?channel=${value}`)
    }

    // 打开目录或打开文件
    function handleClick(param: any) {
      let prevArr = window.location.search.split('&')
      router.push(`/admin/template${prevArr[0]}${param.file}`)
      if (param.type !== 'folder') {
        isEdit.value = true
      }
    }

    // 返回上级目录;
    function handelReturn() {
      isEdit.value = false
      let prevArr = window.location.search.split('&')
      if (prevArr.length === 1) {
        return
      }
      prevArr.splice(prevArr.length - 1, 1) // 删除最后一个元素
      if (prevArr.length > 1) {
        let prevUrl = `folder=${prevArr[prevArr.length - 1].split('=')[1]}`
        prevArr.splice(prevArr.length - 1, 1)
        prevArr.push(prevUrl)
      }
      // this.setState({ isEdit: false })
      router.push(prevArr.join('&'))
    }

    onMounted(() => {
      if (JSON.stringify(getQuery()) === '{}') {
        router.push(`/admin/template?channel=0`)
        // this.props.history.push(`/admin/template?channel=0`)
      } else {
        const {
          channel,
          file
        } = getQuery()

        module.value.name = sorter[0]
        module.value.value = channel

        isEdit.value = file !== undefined ? true : false,

          init({
            dir: window.location.search.split('?')[1],
          })
      }

    })

    return {
      dataList,
      module,
      sorter,
      handleClicksss,
      handleClick,
      handelReturn,
      isEdit

    }
  }
})
</script>
