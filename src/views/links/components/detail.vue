<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增友情'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑友情链接' : '新增友情链接' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">网站名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">url地址</span>
        <input v-model="detail.url" type="text" placeholder="请输入url地址" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">展示站点</span>
        <template v-for="(item, index) in serverName" :key="index">
          <span v-if="checkedList.indexOf(item.value) > -1" class="mr15">{{item.name}}</span>
        </template>
        <ChooseSite :data="data" :render="init" v-model:checked="checkedList" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">页面显示</span>
        <v-radio label="首页" name="display" value="1" v-model:checked="detail.display" />
        <v-radio label="全站" name="display" value="0" v-model:checked="detail.display" />
      </li>
      <li class="li">
        <span class="label">来源</span>
        <v-select :enums="sourceType" v-model:value="detail.source" :defaultValue="detail.source = detail.source ? detail.source : '5'" />
      </li>
      <li class="li">
        <span class="label">方式</span>
        <v-radiobutton name="method" v-model:checked="detail.method" :enums="[{label: '交换', value: '0'}, {label: '出售', value: '1'}]" v-model:value="detail.area" />
      </li>
      <li style="padding-left: 100px">
        <ul class="plr15" style="background: #f8f8fa;">
          <li class="li" v-if="detail.method === '1'">
        <span class="label">出售状态</span>
        <v-radio label="正常" name="sell" value="1" v-model:checked="detail.sell" />
        <v-radio label="过期" name="sell" value="0" v-model:checked="detail.sell" />
      </li>
      <li class="li" v-if="detail.method === '1'">
        <span class="label">出售次数</span>
        <input v-model="detail.webmaster" type="text" placeholder="请输入出售次数" class="input-sm input-150" />
      </li>
      <li class="li" v-if="detail.method === '1'">
        <span class="label">价格</span>
        <input v-model="detail.price" type="text" placeholder="请输入价格" class="input-sm input-150" />
      </li>
        </ul>
      </li>
      <li class="li">
        <span class="label">站点介绍</span>
        <textarea placeholder="请输入站点介绍" v-model="detail.content" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">站长</span>
        <input v-model="detail.webmaster" type="text" placeholder="请输入站长名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">联系方式</span>
        <input v-model="detail.contact" type="text" placeholder="请输入联系方式" class="input-sm input-full" />
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch
} from '@/utils'
import {
  LINK_TYPE,
  SERVER_NAME
} from '@/assets/enum'
import ChooseSite from './chooseSite.vue'
export default defineComponent({
  name: 'v-Detail',
  components: {
    ChooseSite
  },
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
    },
  },
  setup(props) {
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const sourceType: any = LINK_TYPE
    const serverName: any = SERVER_NAME
    const detail: any = ref({})
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        checkedList.value = detail.value.website ? detail.value.website.split(",") : []
      }
    })

    function submit(params: any) {
      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          ...detail.value,
          website: checkedList.value.join(',')
        }
      }).then(() => {
        props.render()
        params.message()
        params.cancel()
      })
    }

    return {
      isShow,
      detail,
      drawer,
      sourceType,
      serverName,
      submit,
      checkedList
    }
  }
})
</script>
