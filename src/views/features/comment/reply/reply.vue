<template>
<v-button v-model:show="isShow" :disabled="auth">回复({{data.reply}})</v-button>
<v-drawer v-model:show="isShow" ref="form" :title="`评论回复`" :style="{width: 800}" :hasfooter="false" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <slot name="content">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-2">用户</td>
          <td class="col-md-4">回复内容</td>
          <td class="col-md-3">回复时间</td>
          <td class="col-md-1">状态</td>
          <td class="col-md-2">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>
            <v-avatar :data="item" />{{item.nickname}}
          </td>
          <td>{{item.content}}</td>
          <td>
            {{item.times}}
          </td>
        <td></td>
        <td>
          <v-space>
            <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"  ></v-confirm>
            <Praise :data="{...item, coding}" />
          </v-space>
        </td>
        </tr>
      </table>
    </slot>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  useStore,
  watch,
  codings
} from '@/utils'
import Praise from '../../praise/list.vue'
  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Boolean,
      default: false
    }
  })
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const coding: any = codings.talk.comment.reply;
    const content: any = ref("")
    const dataList: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
       init()
      }
    })

    function init(){
      store.dispatch('common/Fetch', {
        api: "commentReplyList",
        data: {
          coding,
          artid: props.data.id
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleDelete(param: any) {
      store.dispatch('common/Fetch', {
        api: "delete",
        data: {
          coding,
          id: param.id
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "删除成功"
        })
        init()
      })
    }
</script>
