<template>
<v-basicinfo v-model:dataList="dataList" :edit="edit" title="基本信息" :auth="auth" />
<!-- <v-basicinfo v-model:dataList="dataList.logo" :edit="edit" title="网站LOGO" :auth="auth" />
<v-basicinfo v-model:dataList="dataList.custom" :edit="edit" title="自定义管理" :isDelete="true" :render="init" :data="{coding: coding.config}" :auth="auth" /> -->
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  codings,
  ref
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'Baisc',
  components: {
    Detail
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings;
    const store = useStore();
    const website: any = ref([])

    const dataList = computed(() =>  store.getters['website/webinfo'])

    // const dataList = computed(() => {
    //   const list = store.getters['website/webinfo']
    //   const baisc = list.filter((item: any) => item.isdelete === '1' && item.name !== 'logo')
    //   const logo = list.filter((item: any) => item.isdelete === '1' && item.name === 'logo')
    //   const custom = list.filter((item: any) => item.isdelete === '0')
    //   return {
    //     baisc,
    //     logo,
    //     custom
    //   }
    // });

    function init() {
      store.dispatch('website/BasicInfo', {
        website: props.data.id,
        coding: coding.config
      })
    }

    function edit(param: any) {
      let params: any = {}
      param.map((item: any) => {
        params[item.name] = item.value
      })

      store.dispatch('common/Fetch', {
        api: "updateInfo",
        data: {
          coding: coding.config,
          ...params
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
      })
    }

    onMounted(init)

    return {
      coding,
      website,
      dataList,
      init,
      edit,
      auth: proxy.$auth.init('basic')
    }
  }
})
</script>
