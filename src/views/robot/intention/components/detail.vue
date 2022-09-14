<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'add' : 'edit'}`" />{{action === 'edit'? '编辑': '添加意图库'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑意图库' : '添加意图库' " :submit="submit" :submitApi="{insert: 'createVote', update: 'updateVote'}" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">意图库编码</span>
        <input v-model="detail.code" type="text" placeholder="请输入意图库编码" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">意图库名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入意图库名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">话术</span>
        <textarea v-model="detail.speech" placeholder="请输入话术，多个话术请用英文逗号','分开" class="input-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  LINK_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {

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
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const sourceType: any = LINK_TYPE
    const List: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        let result = await drawer.value.init()
        detail.value = result
        List.value = result.list || []
      }
    })

    // 确认按钮
    function submit(params: any) {
      const {
        id,
        code,
        name,
        speech,
      } = detail.value

      const param: any = {
        code,
        name,
        speech,
        coding: 'Q0015',
      }
      if (props.action === "edit") {
        param.id = id
      }
      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          ...param
        }
      }).then(res => {
        props.render()
        params.message()
      })
    }

    return {
      isShow,
      List,
      detail,
      drawer,
      sourceType,
      submit
    }
  }
})
</script>
