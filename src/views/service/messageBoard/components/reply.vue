<template>
<v-button v-model:show="isShow" :disabled="auth">回复({{data.reply}})</v-button>
<v-dialog v-model:show="isShow" ref="form" :title="`恢回复${detail.nickname}的留言`" :style="{width: 650, height: 500}" height="500px" :hasfooter="false" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <slot name="content">
      <div className="reply">
        <ul>
          <li class="list">
            <div className="user-info">
              <img :src="detail.photos" onerror="this.src='/images/head_normal_100.png'" style=" width: 32px; height: 32px; border-radius: 50%;">
            </div>
            <div className="content">{{detail.content}}</div>
          </li>
          <li className="reply-list" v-for="(item, index) in detail.list" :key="index">
            <div className="content">
              <i class="iconfont icon-close font12" @click="handleDelete(item)" />
              {{item.content}}</div>
            <div className="manager-info">
              <img :src="item.photos" onerror="this.src='/images/head_normal_100.png'" style=" width: 32px; height: 32px; border-radius: 50%;">
            </div>
          </li>
        </ul>
      </div>
      <div>
        <textarea placeholder="回复留言" v-model="content" class="w-full"></textarea>
        <div class="align_right">
          <button class="btn btn-default" @click="submit">回复</button>
        </div>
      </div>
    </slot>
  </template>
</v-dialog>
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
  const props: any = defineProps({
    name: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
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
    const coding: any = codings.service.message_board.reply;
    const content: any = ref("")
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
       init()
      }
    })

    function init(){
      store.dispatch('common/Fetch', {
        api: "messageBoardReply",
        data: {
          coding,
          id: props.data.id
        }
      }).then(res => {
        detail.value = res.result
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

    function submit(params: any) {
      store.dispatch('common/Fetch', {
        api: "replyMessageBoard",
        data: {
          fid: props.data && props.data.id,
          content: content.value
        }
      }).then(res => {
        content.value = ""
        proxy.$hlj.message({
          msg: "提交成功"
        })
        init()
      })

    }
</script>
