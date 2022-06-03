<template>
<span @click="handleclick(data)">更新</span>
<Dialog v-model:show="isShow" ref="form" width="520px" height="150px" :hasfooter="false" :close="false" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="mb15">{{data.title}}{{msg.status}}</div>
    <div>
      <span v-if="msg.type === 'cat'">正在更新分类-{{msg.name}}</span>
      <v-progress :data="msg" />
    </div>
  </template>
</Dialog>
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
  Dialog
} from '@/components/packages/index'
import {
  TEXT_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog
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
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const textType = TEXT_TYPE

    const msg: any = ref({
      visible: false,
      title: '',
      status: '进行中',
      type: '',
      name: '',
      bar: 0,
      serve: 'localhost',
    })

    function run(prams: any) {
      debugger

      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          ...prams.data,
        }
      }).then(res => {

        msg.value.status = res.result.status
        msg.value.bar = res.result.bar
        msg.value.type = res.result.type
        msg.value.name = res.result.name

        const {
          type,
          bar,
          id,
          name,
          loop
        } = res.result

        if (res.result.again) {
          const {
            serve,
            action,
            model,
            method
          } = prams.data

          // 分类
          if (type === 'cat') {
            run({
              title: prams.title,
              bar: res.result.bar,
              data: {
                serve,
                model,
                action,
                id,
                loop,
              },
            })
          } else {
            run({
              title: prams.title,
              bar: res.result.bar,
              data: {
                serve,
                action,
                model,
                id: res.result.outset,
                method,
                total: res.result.total,
              },
            })
          }
        } else {
          setTimeout(() => {
            isShow.value = false
          }, 2000)
        }

      })
    }

    function handleclick(param: any) {
      if(param.data.serve === 'none'){
        proxy.$hlj.message({
          msg: "请选选择服务器"
        })
        return
      }
      msg.value.title = "标题"
      msg.value.status = "请稍等..."
      msg.value.bar = "0"
      msg.value.visible = true
      isShow.value = !isShow.value
      run(param)
    }

    return {
      textType,
      isShow,
      handleclick,
      detail,
      drawer,
      msg
    }
  }
})
</script>
