<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-anonymous-iconfont" />导入表情
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑表情' : '导入表情' " :data="{id: data.id, coding: data.coding.art}" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">分类</span>
        <span class="mr15">{{detail.parent}}</span>
        <v-choose title="选择分类" :data="{ item: detail, field: 'fid', coding: data.coding.cate }" v-model:checked="detail.fid" @choose="choose" type="radio" />
      </li>
      <li class="li">
        <span class="label">文件目录名</span>
        <input v-model="detail.file_dir" type="text" placeholder="请输入表情文件目录名" class="input-sm input-200" />
        <span class="ml15" @click="handleClick">点击展示文件</span>
      </li>
      <li class="li" style="overflow: hidden;">
        <span class="label"></span>
        <div class="clearfix bg-eee" style=" height: auto">
          <div class="col-md-1 p5 relative" v-for="(item, index) in dataList" :key="index">
            <div class="p5">
              <div class="align_center">
                <img :src="item" v-if="item" style=" width: 24px; height: 24px;" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  components: {},
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
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    auth: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const dataList: any = ref([])
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function handleClick() {
      store.dispatch('common/Fetch', {
        api: 'getEmoticons',
        data: {
          file_dir: detail.value.file_dir || 'normal'
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function choose(param: any) {
      const {
        field,
        data
      } = param
      detail.value.fid = data.id
      detail.value.parent = data.name
    }

    function submit(params: any) {

      const {
        fid,
        file_dir
      } = detail.value

      const param: any = {
        fid,
        file_dir: file_dir || 'normal'
      }

      store.dispatch('common/Fetch', {
        api: 'importEmoticons',
        data: {
          ...param,
        }
      }).then(() => {
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      drawer,
      choose,
      dataList,
      handleClick,
      submit
    }
  }
})
</script>
