<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-group" />
</v-button>
<v-drawer v-model:show="isShow" title="模块和单页搜索引擎管理" :style="{width: '700'}" :hasfooter="false">
  <template v-slot:extra>
    <Setting :data="{coding}" :render="init" />
  </template>
  <template v-slot:content>
    <div class="ptb5 plr10">模块</div>
    <div class="mb25 clearfix">
      <div class="col-md-4 p10" v-for="(item, index) in dataList.filter(item => item.type == '0')" :key="index">
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
    <div class="ptb5 plr10">单页</div>
    <div>
      <div class="col-md-4 p10" v-for="(item, index) in dataList.filter(item => item.type == '1')" :key="index">
        <div class="blog-wrap flex p10 radius-4" style="background: rgb(247, 248, 250); align-items: center;">
          <div class="photos" style="width: 80px;">
            <span style="display: inline-block;">
            <div class="relative">
              <i class="iconfont font36" :class="`icon-${item.icon}`" />
              </div>
            </span>
          </div>
          <div style="flex: 1">
            <div class="mb10">{{item.name}}</div>
            <div>
              <Setting :data="{id: item.id, coding}" :render="init" />
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
    const coding = codings.modules
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
      props.router(param.value)
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
