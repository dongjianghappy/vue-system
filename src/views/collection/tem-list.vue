<template>
<div class="p25">
  <div class="module-wrap">
    <div class="module-head">
      <v-optionsbar title="友情链接">
        <template v-slot:extraright>
          扩展值
        </template>
      </v-optionsbar>
    </div>
    <div class="module-content plr15 font12">

      <table width="100%" class="table-striped table-hover col-left-23">
        <tr class="th">
          <td class="col-md-1">选择</td>
          <td class="col-md-7">标题</td>
          <td class="col-md-2">采集时间</td>
          <td class="col-md-1">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList" :key="index">
          <td></td>
          <td>
            {{item.title}}
          </td>
          <td>
           
          </td>
          <td>
            <span>编辑</span>
            <span>删除</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'

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
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "temCollectionList",
        data: {
          fid: 12,
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function edit(param: any) {

    }

    onMounted(init)

    return {
      dataList,
      edit

    }
  }
})
</script>
