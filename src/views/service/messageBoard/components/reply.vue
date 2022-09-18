<template>
<v-button v-model:show="isShow" :disabled="auth">回复</v-button>
<v-dialog v-model:show="isShow" ref="form" title="留言回复" :style="{width: 650, height: 500}" height="500px" :hasfooter="false" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <slot name="content">
      <div className="reply">
        <ul>
          <li>
            <div className="user-info">
              <v-avatar :data="detail" />
              {{detail.nickname}}
            </div>
            <div className="content">{{detail.content}}</div>
          </li>
          <li className="reply-list" v-for="(item, index) in detail.reply_list" :key="index">
            <div className="manager-info">
              <v-avatar :data="item" />
              {{item.username}}
            </div>
            <div className="content">{{item.content}}</div>
          </li>
        </ul>
      </div>
      <div>
        <textarea placeholder="回复留言" v-model="content" class="w-full"></textarea>
        <buttom class="btn btn-default" @click="submit">回复</buttom>
      </div>
    </slot>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'

export default defineComponent({
  name: 'v-Reply',
  props: {
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
  },
  emits: ['update:cate'],
  setup(props, context) {
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const content: any = ref("")
    const detail: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "viewMessageBoard",
        data: {
          id: props.data && props.data.item.id
        }
      }).then(res => {
        detail.value = res.result
      })
    }

    function submit(params: any) {
      store.dispatch('common/Fetch', {
        api: "replyMessageBoard",
        data: {
          fid: props.data && props.data.item.id,
          content: content.value
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
      })

    }

    return {
      isShow,
      submit,
      detail,
      content
    }
  }
})
</script>

<style scoped>
.current {
  background: #1890ff;
  border-radius: 2px;
  color: #fff;

}
</style>
