<template>
<v-button v-model:show="isShow">
  选择站点
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑友情链接' : '新增标签' " :width="350" :hasfooter="false">
  <template v-slot:content v-if="isShow">

    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 选择</td>
        <td class="col-md-2">网站名称 </td>
      </tr>
      <tr v-for="(item, index) in serverName" :key="index">
        <td>
          <v-checkbox :checkedList="checked" :data="{ id: item.value}" />
        </td>
        <td>
          {{item.name}}
        </td>
      </tr>
    </table>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch
} from '@/utils'
import {
  SERVER_NAME
} from '@/assets/enum'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Search',
  components: {
    Popover
  },
  props: {
    action: {
      type: String,
      default: "add"
    },
    checked: {
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
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const serverName: any = SERVER_NAME

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      isShow,
      detail,
      drawer,
      serverName,
    }
  }
})
</script>
