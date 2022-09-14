<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'add' : 'edit'}`" />{{action === 'edit'? '编辑': '新增机器人'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑机器人' : '新增机器人' " :submit="submit" :submitApi="{insert: 'createVote', update: 'updateVote'}" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">机器人名称</span>
        <div>
          <input v-model="detail.name" type="text" placeholder="请输入投票名称" class="input-sm input-full" />
        </div>
      </li>
      <li class="li">
        <span class="label">意图库</span>
        <div>
          <v-select :enums="speech_lib" v-model:value="detail.speech_lib" :defaultValue="detail.speech_lib = detail.speech_lib ? detail.speech_lib : ''" />
        </div>
      </li>

      <li class="li">
        <span class="label">机器人描述</span>
        <div>
          <textarea placeholder="请输入投票说明" v-model="detail.summary" class="w-full"></textarea>
        </div>
      </li>
      <li class="li">
        <span class="label">流程图</span>
        <span @click="handleGraph(item)">编辑</span>
      </li>
    </ul>
    <Graph v-model:show="showGraph" :data="{coding: 'Q0014', detailApi: 'detail', updateApi: 'updateRobot', ...detail}" v-if="showGraph" />
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore,
  onMounted
} from '@/utils'
import {
  LINK_TYPE,
} from '@/assets/enum'
// import Graph from '../../graph/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    // Graph
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
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const showGraph = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const sourceType: any = LINK_TYPE
    const List: any = ref([])
    const speech_lib: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        let result = await drawer.value.init()
        detail.value = result
        List.value = result.list || []
      }
    })

    function handleGraph(param: any) {
      showGraph.value = true
    }

    // 确认按钮
    function submit(params: any) {
      const {
        id,
        fid,
        name,
        speech_lib,
        summary
      } = detail.value

      const param: any = {
        fid,
        name,
        speech_lib,
        summary,
      }

      if (props.action === "edit") param.id = id

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'updateRobot' : "insertRobot",
        data: {
          ...param
        }
      }).then(res => {
        props.render()
        params.message()
      })
    }

    onMounted(() => {
      store.dispatch('common/Fetch', {
        api: "speechLib",
      }).then(res => {
        let arr = res.result.map((item: any) => {
          return {
            name: item.name,
            value: item.code
          }
        })
        speech_lib.value = arr
      })

    })

    return {
      isShow,
      showGraph,
      speech_lib,
      List,
      detail,
      drawer,
      sourceType,
      submit,
      handleGraph
    }
  }
})
</script>
