<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="数据库">
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <ul class="form-wrap-box" v-if="dataList">
      <li class="li mb15" v-for="(item, index) in dataList" :key="index">
        <span class="label">
          {{item.name}}
        </span>
        <v-switch :data="{ item, field: 'status' }" :param="{db: item.mysqldb}" api="changeMysql" className="right" @toggle="toggle" :auth="true" />
      </li>
    </ul>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
  useStore,
} from '@/utils'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'MysqlView',
  components: {
    List,
    List2
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);

    function init() {
      store.dispatch('common/Fetch', {
        api: "mysqldb",
      }).then(res => {
        dataList.value = res.result
      })
    }

    function toggle() {
      init()
      proxy.$hlj.message({
        msg: "数据库切换成功，正在退出，请重新登录！"
      })
      VueEvent.emit("reload");
    }
    onMounted(init)

    return {
      dataList,
      toggle
    }
  }
})
</script>
