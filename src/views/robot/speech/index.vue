<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="话术管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-10">话术</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>{{item.name}}</td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding }" :render="init" :auth="true" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  useRouter,
  codings
} from '@/utils'
import Detail from './components/detail.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const coding: any = "Q0016";
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "speech",
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any) {
router.push(`/admin/robot/intention/speech?id=${param.id}`)
    }

    onMounted(init)

    return {
      coding,
      init,
      dataList,
      handleClick

    }
  }
})
</script>
