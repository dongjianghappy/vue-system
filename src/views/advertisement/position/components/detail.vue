<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增广告位'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑广告位' : '新增广告位' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">广告位名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入广告名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">网站</span>
        <span class="mr15">{{detail.website_name}}</span>
        {{detail.website_id}}
        <v-choose :data="{item: detail, coding: codings.site.list, condition: {status: 1}}" v-model:checked="detail.website" type="radio" :disabled="action === 'edit' && detail.ad_id !== '0'" :message="action === 'edit' && detail.ad_id !== '0' && '已绑定广告不能更换站点'" @choose="choose" />
      </li>
      <li style="padding-left: 100px">
        <ul class="plr15" style="background: #f8f8fa;">
          <template v-if="site.list && site.list.length > 0">
            <li class="li" v-for="(item, index) in site.list" :key="index">
              <span class="label">{{item.name}}</span>
              <template v-for="(list, k) in item.list" :key="k">
                <span class="mr15">
                  <v-checkbox :checkedList="checkedList" :data="{ id: `${site.id}-${item.id}-${list.id}`}" />{{list.name}}</span>
              </template>
            </li>
          </template>
          <li class="ptb15" v-else>暂无页面</li>
        </ul>
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">引用标签</span>
        <input v-model="detail.label" type="text" placeholder="请输入dom元素id" class="input-sm input-150" /> (页面dom元素id)
      </li>
      <li class="li">
        <span class="label">启用</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea placeholder="请输入代码" v-model="detail.description" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  watch,
  codings
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
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const site: any = ref({})
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        if (detail.value.page) {
          checkedList.value = detail.value.page
        }
        detail.value.website_name = detail.value.website[0].name
        detail.value.website = detail.value.website[0].id
        getPosition()
      }
    })

    // 初始化
    function getPosition() {
      store.dispatch('common/Fetch', {
        api: "siteList",
        data: {
          website: detail.value.website
        }
      }).then(res => {
        site.value = res.result !== true ? res.result[0] : []
      })
    }

    function choose(param: any) {
      debugger
      const {
        data
      } = param
      detail.value.website = data.id
      detail.value.website_name = data.name
      getPosition()
    }

    function submit(params: any) {

      if (checkedList.value.length === 0) {
        proxy.$hlj.message({
          msg: "请选择页面"
        })
        return false
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          callback: 'bindAdPosition',
          ...detail.value,
          website: site.value.id,
          page: checkedList.value.join(',')
        }
      }).then(() => {
        props.render()
        params.message()
        params.cancel()
      })
    }

    return {
      codings,
      isShow,
      detail,
      drawer,
      submit,
      site,
      choose,
      checkedList
    }
  }
})
</script>
