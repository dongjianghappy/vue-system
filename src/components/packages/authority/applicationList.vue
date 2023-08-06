<template>
<ul>
  <li class="li mb15" v-for="(item, index) in dataList" :key="index">
    <span class="label">
      {{item.name}}
    </span>
    <v-switch v-if="type==='manage'" :data="{ item: item, field: 'status', coding: codings.appstore }" className="right" :auth="true" />
    <v-switch v-else :data="{ item: item, field: 'authority', ...data }" :param="{uid: data.uid, field: item.value}" api="setUserFunctionAuthority" :msg="message" className="right" :auth="true" />
  </li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  codings
} from '@/utils'
import AddPage from './addPage.vue'
import AddModule from './addModule.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    AddPage,
    AddModule
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ""
    },
    dataList: {
      type: Object,
      default: () => {
        return []
      }
    },
    index: {
      type: String,
      default: "0"
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()

    function handelExpand(param: any) {
      param.extand = !param.extand
    }

    function handleDefault(param: any) {
      store.dispatch('common/Fetch', {
        api: 'setDefault',
        data: {
          id: param.id,
          fid: param.fid
        }
      }).then(res => {})
    }

    function message(message: any) {
      proxy.$hlj.message({
        msg: message
      })
    }
    return {
      codings,
      handelExpand,
      handleDefault,
      message
    }
  }
})
</script>

<style scoped>
.extand {
  display: none;
}
</style>
