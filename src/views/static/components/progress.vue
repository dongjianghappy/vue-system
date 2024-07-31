<template>
<span @click="handleclick(data)">更新</span>
<v-dialog v-model:show="isShow" ref="form" :style="{width: '520', height: '150'}" :hasfooter="false" :close="false" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="mb15">{{data.title}}{{msg.status}}</div>
    <div>
      <span v-if="msg.type === 'cat'">正在更新分类-{{msg.name}}</span>
      <v-progress :data="msg" />
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore
} from '@/utils'
export default defineComponent({
  name: 'v-Progress',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)

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
      console.log(prams);
      
      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          ...prams.data,
        }
      }).then(res => {
        const {
          type,
          bar,
          id,
          name,
          loop
        } = res.result

        msg.value.status = status
        msg.value.bar = bar
        msg.value.type = type
        msg.value.name = name

        if (res.result.again) {
          const {
            serve,
            action,
            model,
            method,
            fid
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
                fid,
                id,
                loop,
              },
            })
          } else {
            const param: any = {
                serve,
                action,
                model,
                id: res.result.outset,
                method,
                total: res.result.total
              }
            if(res.result.isChannel){
              param.isChannel = res.result.isChannel
            }

            run({
              title: prams.title,
              bar: res.result.bar,
              data: param,
            })
          }
        } else {
          setTimeout(() => {
            isShow.value = false
          }, 1000)
        }
      })
    }

    function handleclick(param: any) {
      if (param.data.serve === 'none') {
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
      isShow,
      handleclick,
      detail,
      drawer,
      msg
    }
  }
})
</script>
