<template>
<div class="bg-white">
  <v-collapse title="数据库">
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, index) in dataList" :key="index">
          <span class="label">
            {{item.name}}
          </span>
          <v-switch :data="{ item, field: 'status' }" :param="{db: item.mysqldb}" api="changeMysql" className="right" @toggle="toggle" :auth="true" />
        </li>
      </ul>
    </v-collapse>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  watch,
  onMounted,
  useRouter,
} from '@/utils'
import {
  useStore
} from 'vuex'
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
    const router = useRouter();
    const dataList = ref([]);
    let menu: any = ref([{
        name: "数据库列表",
        value: "appstore1"
      },
      {
        name: "备份管理",
        value: "appstore2"
      }
    ])

    let type: any = ref(1)

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
      menu,
      toggle
    }
  }
})
</script>
