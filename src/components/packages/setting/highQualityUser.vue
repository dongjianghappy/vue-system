<template>
<v-button v-model:show="isShow" :disabled="auth">
  查看
</v-button>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" action="add" title="优质用户推荐" :style="{width: '350'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <table class="table-striped">
      <tr>
        <td class="col-md-6">用户</td>
        <td class="col-md-6">会员账号</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td style="display: flex">
          <div style=" width: 32px; height: 32px; border-radius: 50%; overflow: hidden; display: inline-block;">
            <img :src="item.photos" class="mr10" style="width: 32px; height: 32px;">
          </div>
          <div class="pl5" style="flex: 1; height: 32px; line-height: 32px; display: inline-block;">
            {{item.nickname}}
          </div>
        </td>
        <td>
          {{item.account}}
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
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
export default defineComponent({
  name: 'v-Search',
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
    const dataList: any = ref([])
    const drawer: any = ref(null)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    // 初始化
    function init() {

      store.dispatch('user/userListAction', {
        data: {
          role: props.data.id,
          page: 1,
          pagesize: 25
        }
      }).then((res: any) => {
        dataList.value = res.result.list
      })
    }

    return {
      isShow,
      init,
      dataList,
      drawer
    }
  }
})
</script>
