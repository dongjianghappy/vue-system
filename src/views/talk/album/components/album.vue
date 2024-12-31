<template>
<div class="module-wrap">
  <div class="module-content p20">
    <div style="height: 165px; overflow: hidden;">
      <div class="mb15 font14">{{title}}
        <span class="right">
          <v-space>
            <v-search field="uid" placeholder="用户账号查询" :render="init" />
            <v-toggle />
            <span class="mt5">
              <!-- <More action="add" :data="{coding: 'U0700037'}" :render="init" /> -->
            </span>
          </v-space>
        </span>
      </div>
      <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
        <div class="p15 align_center h80" @click="handleClick(item)" style=" background: var(--card-background); border-radius: 8px;">
        </div>
        <div class="ptb10 font6">
          {{item.name}}
          <span class="right" v-if="item.id && item.id != 'custom'">
            <!-- <More action="edit" :data="{id: item.id, coding: 'U0700037'}" :render="init" /> -->
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
    codings,
  defineProps,
  onMounted,
  ref,
  useStore
} from '@/utils'
import More from './more.vue'

  const props: any = defineProps({
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
  })
    const store = useStore()
    const coding: any = codings.talk.album.list
    const dataList: any = ref([])

    function init(param: any = {}) {
      dataList.value = []
      store.dispatch('common/Fetch', {
        api: 'customGroup',
        data: {
          coding,
          ...param 
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
        id: param.id
      })
    }
    onMounted(() => {
      init()
    })
</script>
