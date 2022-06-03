<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="模型管理">
      <template v-slot:extraright>
        扩展值
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-3 pl25">频道名称</td>
        <td class="col-md-2">频道ID</td>
        <td class="col-md-1">识别id</td>
        <td class="col-md-3">附加表</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>{{item.name}}</td>
        <td>
          {{item.id}}
        </td>
        <td>
          {{item.module}}
        </td>
        <td>addon_{{item.module}}</td>
        <td>
          <span @click="handleclick(item)">字段管理</span>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList || []" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useStore,
  useRouter
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdd',
  components: {},
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "anpassen"
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleclick(params: any) {
      router.push(`/admin/customize/list?id=${params.id}`)
    }

    onMounted(init)

    return {
      dataList,
      handleclick
    }
  }
})
</script>
