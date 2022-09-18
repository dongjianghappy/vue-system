<template>
<v-button v-model:show="isShow" :disabled="auth">
  站点设置
</v-button>
<v-drawer v-model:show="isShow" title="展示设置" :style="{width: data.channel_id === 0 ? '245' : '500'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    <AddButton :data="data" :render="init" />
  </template>
  <template v-slot:content>
    <div class="channel-box" v-if="data.channel_id === 0">
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, index) in dataList" :key="index">
          <span class="label">
            {{item.name}}
            <AddButton :data="{id: item.id, ...data}" :render="init" action="edit" />
          </span>
          <v-switch :data="{ item, field: 'index_page', ...data }" className="right" :auth="true" />
        </li>
      </ul>
    </div>
    <table width="100%" class="table-striped table-hover col-left-1" v-else>
      <tr class="th">
        <td class="col-md-4">名称</td>
        <td class="col-md-2">首页 </td>
        <td class="col-md-2">栏目页</td>
        <td class="col-md-2">详情页</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
          <AddButton :data="{id: item.id, ...data}" :render="init" action="edit" />
        </td>
        <td><v-switch :data="{ item, field: 'index_page', ...data }" className="right" :auth="true" /></td>
        <td><v-switch :data="{ item, field: 'list_page', ...data }" className="right" :auth="true" /></td>
        <td><v-switch :data="{ item, field: 'detail_page', ...data }" className="right" :auth="true" /></td>
      </tr>
    </table>
  </template>
</v-drawer>
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
export default defineComponent({
  name: 'v-Search',
  components: {
    AddButton
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
          sorter: 'sort asc',
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
