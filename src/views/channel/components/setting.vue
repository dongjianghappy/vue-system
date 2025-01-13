<template>
<v-button v-model:show="isShow" :disabled="auth">
  设置
  <!-- <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'write'}`" /> -->
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="频道设置" :style="{width: 500}" :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
        <input type="checkbox" v-model="detail.status" :checked="detail.status" class="mr5" style="float: left;"><span>显示</span>
      </label>
    </v-space>
  </template>  
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li clearfix">
        <span class="label">频道名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入频道名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input v-model="detail.module" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">图标</span>
        <input v-model="detail.icon" type="text" placeholder="请输入图标" class="input-sm input-150" />
        <input v-model="detail.color" type="text" placeholder="请输入颜色" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">展示站点</span>
        <span class="mr15">{{ detail.server_name }}</span>
        <v-choose
          :data="{
            item: detail,
            coding: codings.site.list,
            condition: { status: 1 },
          }"
          v-model:checked="detail.server"
          type="radio"
          @choose="choose"
        />
      </li>
      <li class="li clearfix">
        <span class="label">页面标题</span>
        <input v-model="detail.seotitle" type="text" placeholder="请输入频道页面标题" class="input-sm input-full mb10" />
        <input v-model="detail.behind_title" type="text" placeholder="请输入频道名称标题后缀" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">关键字</span>
        <v-tag v-model:tags="detail.keyword" />
      </li>
      <li class="li clearfix">
        <span class="label">描述</span>
        <textarea placeholder="请输入频道页面描述" v-model="detail.description" class="w-full mb10"></textarea>
        <textarea placeholder="描述后缀" v-model="detail.behind_description" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  watch,
  useStore,
  codings
} from '@/utils'
import {
  SERVER_NAME
} from '@/assets/enum'
  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    action: {
      type: String,
      default: "add"
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
    },
  })
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const serverName: any = SERVER_NAME
    const store = useStore();

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function chooseColor(param: any) {
      detail.value.color = param.value
    }

    function choose(param: any) {
      const { data } = param;
      detail.value.server = data.id;
      detail.value.server_name = data.name;
    }

    function submit(params: any) {
      const {
        name,
        icon,
        sort,
        color,
        server,
        status,
        seotitle,
        behind_title,
        keyword,
        description,
        behind_description
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "update",
        data: {
          coding: props.data.coding,
          id: props.data.id,
          name,
          icon,
          sort,
          color,
          server,
          status,
          seotitle,
          behind_title,
          keyword: keyword ? keyword.join(',') : "",
          description,
          behind_description
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
        props.render()
        isShow.value = false
      })
    }
</script>
