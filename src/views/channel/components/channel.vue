<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-app" />
</v-button>
<v-drawer v-model:show="isShow" title="频道管理" :style="{width: '700'}" :hasfooter="false">
  <template v-slot:extra>
    <v-space>
      <Instructions module="channel" />
      <Setting :data="{coding}" :render="init" />
    </v-space>
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

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  codings,
  useStore
} from '@/utils'
import Instructions from '../../links/components/instructions.vue'
import Setting from './setting.vue'

  const props: any = defineProps({
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
  })
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
</script>
