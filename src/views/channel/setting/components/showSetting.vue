<template>
<div>
  <v-draweraaaa title="展示设置" name='<i class="iconfont icon-shezhi pointer"></i>' :top="64" :width="245" :auth="auth">
    <template v-slot:content>
      <div class="channel-box">
        <ul class="form-wrap-box">
          <li class="li mb10"><span class="label">频道首页</span>
            <a class="right" :href="`${data.server}${data.module}`" target="_blank" data-v-0fdb3bde="">预览</a>
          </li>
          <li class="li mb10"><span class="label">友情链接</span>
            <v-switch :data="{ item: {}, field: 'status', coding: 'O0000' }" className="right" />
          </li>
          <li class="li mb10"><span class="label">广告</span>
            <v-switch :data="{ item: {}, field: 'status', coding: 'O0000' }" className="right" />
          </li>
          <li class="li mb10"><span class="label">展示设置</span>
            <v-switch :data="{ item: {}, field: 'status', coding: 'O0000' }" className="right" />
          </li>
        </ul>
      </div>
    </template>
  </v-draweraaaa>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    setRoute: {
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

    const isShow: any = ref(false)

    function handleRouter(param: any) {
      isShow.value = false
      props.setRoute({
        path: param,
        module: param
      })
    }

    return {
      isShow,
      module,
      handleRouter
    }
  }
})
</script>
