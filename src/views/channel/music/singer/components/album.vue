<template>
<div style="overflow: auto;">
  <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList.list" :key="index">

    <div class="thumbnail p10 relative" style="background: rgb(255, 255, 255); overflow: hidden;">
      <v-thumbnail :data="item" :coding="data.coding.art" :type="type" :getNeighbor="getNeighbor" />
      <div class="caption relative" style="padding: 10px 0px; height: 40px;">
        <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display: block !important;">{{item.title}}{{item.parent ? `(${item.parent})` : ""}} <i class="iconfont icon-top cl-red" v-if="item.istop === '1'" /></span>
      </div>
      <div class="relative" style="border-top: 1px dotted rgb(234, 234, 234); padding: 10px 0px; height: 40px; height: 53px; line-height: 34px;">
        <v-avatar :data="item" />{{item.nickname}}
        <span class="right">
          <v-popover content="操作" arrow="tb" offset="right" :move="-30" :keys="`static_${index}`">
            <ul class="font14 p15" style="display: block">
              <li>
                <v-button @onClick="handleClick(item)" :disabled="true" v-else>
                  编辑
                </v-button>
              </li>
              <li>
                <v-confirm name="删除" :data="{id: item.id, coding: data.coding.art, operating: 'remove' }" type="text" api="removeAndRestore" :render="render" operating="delete" :auth="true"></v-confirm>
              </li>
              <li>
                <v-confirm name="置顶" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: data.coding.art }" type="text" api="changeData" :render="render" operating="setTop" :auth="true"></v-confirm>
              </li>
            </ul>
          </v-popover>
        </span>
      </div>
    </div>
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
  channels,
  useRouter
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  setDevtoolsHook
} from '@vue/runtime-core';
export default defineComponent({
  name: 'HomeViewdd',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "image"
    },
    isPersonal: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter()
    const coding: any = channels().coding.art;
    const checkedList: any = ref([])
    const showFlag = ref(false)
    const index: any = ref(0)
    const currentData: any = ref({})
    const currentImg: any = ref()

    const dataList: any = computed(() => {
      return store.getters[`channel/${props.data.module}`]['articleList']
    });

    function showImg(param: any, i: any) {
      index.value = i
      currentData.value = param
      debugger
      currentImg.value = param.image[0]
      showFlag.value = !showFlag.value
    }

    function prevOrNext(param: any) {

      let i = dataList.value.list.findIndex((item: any) => item.id === currentData.value.id)
      if (param === 'prev') {
        index.value = i - 1
        currentData.value = dataList.value.list[i - 1]
      } else {
        index.value = i + 1
        currentData.value = dataList.value.list[i + 1]
      }
      currentImg.value = currentData.value.image[0]
    }

    function handleClick(params: any) {
      let url = `/admin/${props.data.module}/list/edit`
      if (params !== 'add') {
        url = url + `?id=${params.id}`
      }

      router.push(url)
    }

    function getNeighbor() {
      
      store.dispatch('common/Fetch', {
        api: "getNeighbor",
        data: {
          coding: coding,
          id: props.data.id
        }
      }).then(res => {
        debugger
        // detail.value = res.result
      })
    }

    return {
      coding,
      checkedList,
      dataList,
      showFlag,
      index,
      currentImg,
      currentData,
      showImg,
      handleClick,
      prevOrNext,
      getNeighbor
    }
  }
})
</script>
