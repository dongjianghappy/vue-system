<template>
<v-button v-model:show="isShow" :disabled="true">
  按钮
</v-button>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" action="add" :title="`${name}页面`" :width="800">
<template v-slot:extra>
    <Detail :data="data" :render="init" />
  </template>  
  <template v-slot:content v-if="isShow">
    <table class="table-striped">
      <tr>
        <td class="col-md-2">按钮名称</td>
        <td class="col-md-2">顺序</td>
        <td class="col-md-6">权限标记</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in detail" :key="index">
        <td>
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding: data.coding }" :auth="true" />
        </td>
        <td>
          <v-quick :value="item.sort" :data="{ id: item.id, field: 'sort', coding: data.coding }" :auth="true" />
        </td>
        <td>
          <v-quick :value="item.authority" :data="{ id: item.id, field: 'authority', coding: data.coding }" :auth="true" />
        </td>
        <td>
          <span>
            <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" operating="delete" :auth="true"></v-confirm>
          </span>
        </td>
      </tr>
    </table>
    <v-nodata :data="detail || []" />
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
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Detail
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
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
    }
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    // 初始化
    function init() {
      store.dispatch('common/Fetch', {
        api: "routerSelect",
        data: {
          ...props.data
        }
      }).then((res: any) => {
        detail.value = res.result
      })
    }
    return {
      isShow,
      init,
      detail,
      drawer
    }
  }
})
</script>
