<template>
<v-button v-model:show="isShow" :disabled="true">
  页面设置
</v-button>
<Drawer v-model:show="isShow" title="页面管理" :top="64" :width="200" :auth="auth">
  <template v-slot:extra>
    <AddButton :data="data" :render="init" />
  </template>
  <template v-slot:content>

    <div class="channel-box">
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, index) in dataList" :key="index">
          <span class="label">
            {{item.name}}
            <AddButton :data="{id: item.id, ...data}" :render="init" action="edit" />
          </span>
          <v-switch :data="{ item, field: 'status', ...data }" className="right" :auth="true" />
        </li>
      </ul>
    </div>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  useStore
} from '@/utils'
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch
} from 'vue'
import AddButton from './addButton.vue'
import {
  Drawer
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    AddButton,
    Drawer
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    setRoute: {
      type: Function,
      default: () => {
        return
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore()

    const isShow: any = ref(false)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          page: 1,
          pagesize: 30,
          ...props.data
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    return {
      isShow,
      dataList,
      module,
      init,
    }
  }
})
</script>
