<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-write"></i>
</v-button>

<Drawer ref="drawer" v-model:show="isShow" :action="action" title="内容来源" :width="650" api="select" :data="data" :param="detail" :render="render" :hasfooter="isChoose" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="mb10" v-if="!isChoose">
      <AddButton :data="data" :render="init" />
    </div>
    <template v-if="isChoose">
      <table width="100%" class="table-striped table-hover col-left-23">
        <tr class="th">
          <td class="col-md-2">选择 </td>
          <td class="col-md-3">名称</td>
          <td class="col-md-7">来源地址</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" class="dragObj" :key="index" draggable="true" :index="index">
          <td>
            <input type="radio" name="name" v-model="item.id" @click="currentValue=item" />
          </td>
          <td>
            {{item.source_name}}
          </td>
          <td>
            {{item.source_url}}
          </td>
        </tr>
      </table>
    </template>
    <template v-else>
      <table width="100%" class="table-striped table-hover col-left-12">
        <tr class="th">
          <td class="col-md-3">选择 </td>
          <td class="col-md-7">名称</td>
          <td class="col-md-2">来源地址</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" class="dragObj" :key="index" draggable="true" :index="index">
          <td>
            <v-quick :value="item.source_name" :data="{ id: item.id, field: 'source_name', coding }" />
          </td>
          <td>
            <v-quick :value="item.source_url" :data="{ id: item.id, field: 'source_url', coding }" />
          </td>
          <td>
            <v-space>
              <span>
                <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
              </span>
              <span>
                <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
              </span>
            </v-space>
          </td>
        </tr>

      </table>
    </template>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  useStore
} from '@/utils'
import AddButton from './addButton.vue'
import {
  NAV_TYPE,
} from '@/assets/enum'
import {
  Drawer
} from '@/components/packages/index'
import List from "./components/list.vue"
import Detail from "./components/detail.vue"
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer,
    AddButton
  },
  props: {
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
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
    checkboxList: {
      type: Array,
      default: []
    },
    auth: {
      type: Boolean,
      default: false
    },
    isChoose: {
      type: Boolean,
      default: false
    },
  },
  emits: ['getSource'],
  setup(props, context) {
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const navType: any = NAV_TYPE
    const store = useStore();
    const aaa: any = ref([])
    const dataList: any = ref({})
    const index: any = ref("0")
    const currentValue: any = ref("")

    let menu: any = ref([{
        name: "公共标签",
        value: "appstore1"
      }, {
        name: "导航标签",
        value: "appstore1"
      },
      {
        name: "分类标签",
        value: "appstore2"
      },
      {
        name: "文档标签",
        value: "appstore2"
      }
    ])
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = await drawer.value.init({
          channel_id: props.data.channel_id,
          page: 1,
          pagesize: 25
        })
        dataList.value
        debugger
      }
    })

    function submit() {
      context.emit('getSource', currentValue.value)
    }

    return {
      isShow,
      index,
      detail,
      dataList,
      drawer,
      menu,
      navType,
      aaa,
      submit,
      currentValue
    }
  }
})
</script>
