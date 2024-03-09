<template>
<div class="module-wrap">
  <div class="module-content p20">
    <div style="height: 165px; overflow: hidden;">
      <div class="mb15 font14">{{title}}
        <span class="right">
          <Detail action="add" :data="{coding: 'U0700037'}" :render="init" />
        </span>
      </div>

      <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
        <div class="p15 align_center h80" @click="handleClick(item)" style=" background: var(--card-background); border-radius: 8px;">
        </div>
        <div class="ptb10 font6">
          {{item.name}}
          <span class="right" v-if="item.id">
            <Detail action="edit" :data="{id: item.id, coding: 'U0700037'}" :render="init" /></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useStore
} from '@/utils'
import Detail from './detail_cate.vue'

export default defineComponent({
  name: 'v-Button',
  components: {
    Detail
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "theme"
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {

    const store = useStore()
    const dataList: any = ref([])

    function init() {
      dataList.value = []
      store.dispatch('common/Fetch', {
        data: {
          coding: "U0700037",
          type: props.type
        }
      }).then(res => {
        dataList.value = res.result
      }).finally(() => {
        dataList.value.unshift({
          name: '未分类'
        })
      })
    }

    function handleClick(param: any) {
      props.render({
        fid: param.id
      })
    }
    onMounted(() => {
      init()
    })

    return {
      dataList,
      init,
      handleClick
    }
  }
})
</script>
