<template>
<span @click="handleclick">收藏夹</span>
<v-drawer ref="drawer" v-model:show="isShow" title="收藏夹" :style="{width: 200}" :hasfooter="false">
  <template v-slot:extra>
    <Created :data="data" :render="init" />
  </template>
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li mb15" v-for="(item, index) in detail" :key="index">
        <span class="label">
          {{item.name}}
          <Created :data="{id: item.id, ...data}" :render="init" action="edit" />
        </span>
      </li>
    </ul>
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
import Created from './created.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Created
  },
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
        api: "favorites",
        data: {
          ...props.data
        }
      }).then((res: any) => {
        detail.value = res.result
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
