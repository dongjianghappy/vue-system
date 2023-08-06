<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="组管理">
      <template v-slot:extraright>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15 clearfix">
    <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
      <v-cards>
        <template v-slot:content>
          <v-img />
          {{item.name}}
        </template>
      </v-cards>
    </div>
    <v-loading :loading="loading" :dataList="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  useStore,
  codings
} from '@/utils'
import {
  SERVER_NAME
} from '@/assets/enum'
import Detail from './detail.vue'
export default defineComponent({
  name: 'ListView',
  components: {
    Detail,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
    siteEnum: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const coding: any = codings
    const store = useStore();
    const dataList: any = ref([])

    const checkedList: any = ref([])


    // 初始化
    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: "customGroup",
        data: {
          coding: props.data.coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      dataList,
      checkedList
    }
  }
})
</script>
