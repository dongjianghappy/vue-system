<template>
<span @click="handleclick">专辑</span>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" action="add" title="专辑列表" :width="800" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div class="mb10">
      <span class="mr25">{{name}}的专辑</span>
      <AddAlbum :data="data" :render="init" />
    </div>
    <table width="100%" class="table-striped">
      <tr>
        <td class="col-md-2">顺序</td>
        <td class="col-md-8">专辑名称</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in detail" :key="index">
        <td>
          <v-quick :value="item.sort" :data="{ id: item.id, field: 'sort', coding: data.coding }" :auth="true" />
        </td>
        <td>
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding: data.coding }" :auth="true" />
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
import AddAlbum from './addAlbum.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    AddAlbum
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: "add"
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
        data: {
          coding: props.data.coding,
          page: 1,
          pagesize: 10,
          ...props.data
        }
      }).then((res: any) => {
        detail.value = res.result.list
      })
    }

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      handleclick,
      init,
      detail,
      drawer
    }
  }
})
</script>
