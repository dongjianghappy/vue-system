<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增广告'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑广告' : '新增广告' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入广告名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">展示站点</span>
        <span class="mr15">{{site.name}}</span>
        <ChooseSite :data="{id: data.website}" :render="init" v-model:checked="site" type="radio" @onClick="()=>detail.position = []" />
      </li>
      <li style="padding-left: 100px" v-if="site.id">
        <ul class="p15" style="background: #f8f8fa;">
          <template v-if="positionList.length > 0">
            <template v-for="(item, k) in positionList" :key="k">
              <li class="vertical">
                <div class="label">
                  <v-checkbox :checkedList="detail.position" :data="{ id: item.id}" :auth="item.ad_id !== '0' && item.ad_id !== detail.id" /> {{item.name}}
                  <span class="ml15 cl-999 font12">页面id标签: {{item.label}}</span>
                </div>
                <div class="pl20 cl-999">
                  {{item.explain}}
                </div>
              </li>
            </template>
          </template>
          <li class="ptb15" v-else>暂无页面</li>
        </ul>
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">来源</span>
        <v-select :enums="sourceType" v-model:value="detail.source" :defaultValue="detail.source = detail.source ? detail.source : '5'" />
      </li>
      <li class="li">
        <span class="label">价格</span>
        <input v-model="detail.price" type="text" placeholder="请输入价格" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-radiobutton name="ssss" v-model:checked="detail.type" :enums="[{label: '图片', value: 'img'}, {label: '文字', value: 'text'}, {label: '代码', value: 'code'}]" v-model:value="detail.area" />
      </li>

      <li style="padding-left: 100px" v-if="detail.type === 'text'">
        <ul class="plr15" style="background: #f8f8fa;">
          <li class="li">
            <span class="label">链接</span>
            <textarea placeholder="请输入http://链接" v-model="detail.url" class="w-full h50"></textarea>
          </li>
          <li class="li">
            <span class="label">内容</span>
            <textarea placeholder="请输入内容" v-model="detail.content" class="w-full"></textarea>
          </li>
        </ul>
      </li>
      <li style="padding-left: 100px" v-else-if="detail.type === 'code'">
        <ul class="plr15" style="background: #f8f8fa;">
          <li class="li">
            <span class="label">代码</span>
            <textarea placeholder="请输入代码" v-model="detail.code" class="w-full"></textarea>
          </li>
        </ul>
      </li>
      <li style="padding-left: 100px" v-else>
        <ul class="plr15" style="background: #f8f8fa;">
          <li class="li">
            <span class="label">链接</span>
            <textarea placeholder="请输入http://链接" v-model="detail.url" class="w-full h50"></textarea>
          </li>
          <li class="li">
            <span class="label">宽度</span>
            <input v-model="detail.width" type="text" placeholder="请输入宽度" class="input-sm input-150" /> (px)
          </li>
          <li class="li">
            <span class="label">高度</span>
            <input v-model="detail.height" type="text" placeholder="请输入高度" class="input-sm input-150" /> (px)
          </li>
          <li class="li">
            <span class="label">图片</span>
            <SpaceModal v-model:image="detail.image">
              <span class="right">选择图片</span>
            </SpaceModal>
            <textarea placeholder="图片地址展示" v-model="detail.image" class="w-full" disabled></textarea>
          </li>
          <li class="li">
            <img width="398" height="150" :src="detail.image" alt="">
          </li>
        </ul>
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
} from '@/utils'
import ChooseSite from '../../links/components/chooseSite.vue'
import {
  LINK_TYPE,
  SERVER_NAME
} from '@/assets/enum'
import SpaceModal from '../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChooseSite,
    SpaceModal
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
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const sourceType: any = LINK_TYPE
    const serverName: any = SERVER_NAME
    const checkedList: any = ref([])
    const positionChecked: any = ref([])
    const store = useStore()
    const positionList = ref([])
    const site: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        checkedList.value = detail.value.website ? detail.value.website.split(",") : []
        getPosition({
          page: 1
        })
      }
    })

    // 监听
    watch([site], async (newValues, prevValues) => {
      getPosition({
        page: 1
      })

    })

    // 初始化
    function getPosition(params: any) {
      const sssss: any = {
        page: 1,
        pagesize: 100
      }

      Object.assign(sssss, params)
      store.dispatch('common/Fetch', {
        api: "getAdPosition",
        data: {
          website: site.value && site.value.id || props.data.website,
          ad_id: props.data.id,
          ...sssss
        }
      }).then(res => {
        positionList.value = res.result !== true ? res.result : []
      })
    }

    function submit(params: any) {
      const position_id: any = []

      // 已选的广告位匹配当前广告或者未选的广告位才追加到position_id数组中
      positionList.value.map((item: any) => {
        if(item.ad_id === detail.value.id || item.ad_id === '0'){
          position_id.push(item.id)
        }
      })

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          callback: 'bindAd',
          ...detail.value,
          position: detail.value.position && detail.value.position.length > 0 ? detail.value.position.join(',') : "",
          website: site.value.id,
          position_id: position_id.length > 0 ? position_id.join(',') : ""
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
      checkedList,
      positionList,
      positionChecked,
      submit,
      site
    }
  }
})
</script>
