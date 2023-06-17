<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增幻灯片"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑幻灯片' : '新增幻灯片' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">展示频道</span>
        <v-select :enums="channel" v-model:value="detail.channel_id" :defaultValue="detail.channel_id = detail.channel_id ? detail.channel_id : '5'" />
      </li>
      <li class="li">
        <span class="label">状态</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">宽高</span>
        <input v-model="detail.width" type="text" placeholder="请输入宽度" class="input-sm input-150" /><span class="mr25"> (宽)</span>
        <input v-model="detail.height" type="text" placeholder="请输入高度" class="input-sm input-150" /> (高)
      </li>
      <li class="li">
        <span class="label">滚动方向</span>
        <v-radio label="向左滑动" name="slidetype" value="rl" v-model:checked="detail.slidetype" />
        <v-radio label="向右滑动" name="slidetype" value="lr" v-model:checked="detail.slidetype" />
        <v-radio label="向上滑动" name="slidetype" value="bt" v-model:checked="detail.slidetype" />
        <v-radio label="向下滑动" name="slidetype" value="tb" v-model:checked="detail.slidetype" />
        <v-radio label="淡入浅出" name="slidetype" value="out" v-model:checked="detail.slidetype" />
      </li>
      <li class="li">
        <span class="label">焦点位置</span>
        <input v-model="detail.focus_right" type="text" placeholder="请输入焦点右侧距离" class="input-sm input-150" /><span class="mr25"> (right)</span>
        <input v-model="detail.focus_bottom" type="text" placeholder="请输入焦点底部距离" class="input-sm input-150" />(bottom)
      </li>
      <li class="li">
        <span class="label">时间</span>
        <input v-model="detail.time" type="text" placeholder="请输入时间" class="input-sm input-150" /> (毫秒)
      </li>
      <li class="li">
        <span class="label">速度</span>
        <input v-model="detail.speed" type="text" placeholder="请输入速度" class="input-sm input-150" /> (毫秒)
      </li>
      <li class="li">
        <span class="label">滑动类型</span>
        <v-radio label="焦点" name="btntype" value="focus" v-model:checked="detail.btntype" />
        <v-radio label="箭头" name="btntype" value="arrow" v-model:checked="detail.btntype" />
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea placeholder="请输入说明" v-model="detail.description" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  useStore
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  props: {
    action: {
      type: String,
      default: "add"
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
  setup(props, context) {
    const store: any = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const channel: any = computed(() => {
      let channelArr: any = []
      store.getters['user/channel'].map((item: any) => {
        channelArr.push({
          name: item.name,
          value: item.id
        })
      })
      return channelArr
    });
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      isShow,
      channel,
      drawer,
      detail
    }
  }
})
</script>
