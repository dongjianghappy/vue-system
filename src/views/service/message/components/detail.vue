<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="">
      <template v-slot:extraleft>
        <span class="pointer mr10" style="margin-top: 1px;" @click="handleClick">返回上级</span>
        <span class="pointer mr10" @click="getNeighbor('prev')">上一条(未读)</span>
        <span class="pointer" @click="getNeighbor('next')">下一条(未读)</span>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr50 h500">
    <div class="ptb25" style="border-bottom: 1px dashed #ccc;">{{detail.title}}【{{detail.times}}】</div>
    <div class="ptb25">{{detail.content}}</div>
  </div>
</div>
</template>

<script lang="ts">
import {
  useRoute,
  useRouter
} from '@/utils';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  components: {},
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute()
    const router = useRouter()
    const detail: any = ref({})

    function init() {
      store.dispatch('common/Fetch', {
        api: "detail",
        data: {
          coding: "Q0006",
          id: route.query.id,
        }
      }).then(res => {
        debugger
        detail.value = res.result
      })
    }

function getNeighbor(type: any, callBack: any) {
      store.dispatch('common/Fetch', {
        api: "neighbor",
        data: {
          coding: "Q0006",
          type: type,
          id: detail.value.id || route.query.id
        }
      }).then(res => {
        debugger
        detail.value = res.result
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/service/message/${route.query.type}`)
    }

    onMounted(init)

    return {
      detail,
      getNeighbor,
      handleClick
    }
  }
})
</script>
