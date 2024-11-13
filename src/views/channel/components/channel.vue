<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-app" />
</v-button>
<v-drawer v-model:show="isShow" title="频道管理" :style="{width: '700'}" :hasfooter="false">
  <template v-slot:extra>
    <Setting :data="{coding}" :render="init" />
  </template>
  <template v-slot:content>
    <div class="clearfix">
      <div class="col-md-4 p10" v-for="(item, index) in dataList" :key="index">
        <div class="blog-wrap flex p10 radius-4" style="background: rgb(247, 248, 250); align-items: center;">
          <div class="photos" style="width: 80px;">
            <span style="display: inline-block;">
            <div class="relative">
              <i class="iconfont font36" :class="`icon-${item.icon}`" @click="handleRouter(item)" />
              </div>
            </span>
          </div>
          <div style="flex: 1">
            <div class="mb10">{{item.name}}</div>
            <div>
              <Setting action="edit" :data="{id: item.id, coding}" :render="init" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  codings,
  useStore
} from '@/utils'
import Setting from './setting.vue'

export default defineComponent({
  name: 'v-Search',
  components: {
    Setting
  },
  props: {
      router: {
      type: Function,
      default: () => {
        return
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore()
    const coding = codings.channel
    const isShow: any = ref(false)
    const currentValue: any = ref("manage")
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleRouter(param: any) {
      props.router(param.module)
    }
    
    return {
      isShow,
      coding,
      currentValue,
      dataList,
      module,
      init,
      handleRouter
    }
  }
})
</script>
