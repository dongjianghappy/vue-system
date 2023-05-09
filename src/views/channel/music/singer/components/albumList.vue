<template>
<span @click="handleclick">专辑</span>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" action="add" title="专辑管理" :width="800" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div class="mb10">
      <span class="mr25">{{name}}的专辑</span>
      <AddAlbum :data="data" :render="init" />
    </div>
    <div style="overflow: auto;">
  <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in detail" :key="index">

    <div class="thumbnail p10 relative" style="background: rgb(255, 255, 255); overflow: hidden;">
      <v-thumbnail :data="item" :coding="data.coding.art" :type="type" :getNeighbor="getNeighbor" />
      <div class="caption relative" style="padding: 10px 0px; height: 40px;">
        <span>{{item.name}}</span>
        <span>
          <AddAlbum action="edit" :data="{id: item.id, coding: data.coding}" :render="init" />
        </span>
      </div>
    </div>
  </div>

</div>
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
