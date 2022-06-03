<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? '编辑': '新增广告'}}
</v-button>
<Drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑广告' : '新增广告' " :data="data" :param="detail" :render="render">
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
        <v-select :enums="serverName" v-model:value="detail.website" :defaultValue="detail.website = detail.website ? detail.website : 'localhost'" />
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
        <span class="label">显示页面</span>
        <v-select :enums="sourceType" v-model:value="detail.display" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-radiobutton name="ssss" v-model:checked="detail.type" :enums="[{label: '图片', value: 'img'}, {label: '文字', value: 'text'}, {label: '代码', value: 'code'}]" v-model:value="detail.area" />
      </li>
      <li class="li">
        <span class="label">链接</span>
        <textarea placeholder="请输入链接" v-model="data.content" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">内容</span>
        <textarea placeholder="请输入内容" v-model="data.content" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">价格</span>
        <input v-model="detail.price" type="text" placeholder="请输入价格" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">宽高</span>
        <input v-model="detail.width" type="text" placeholder="请输入宽度" class="input-sm input-150 mr10" />
        <input v-model="detail.height" type="text" placeholder="请输入高度" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <v-spacemodal>
          <div class="space-wrap" style="display: flex;">
            <div class="space-picture p10" style="background: rgb(250, 250, 250); flex: 2 1 0%; height: auto;">
              <div class="pointer"><img width="250" height="100" alt=""></div>
            </div>
            <div style="flex: 1 1 0%;">
              <div style="flex: 1 1 0%; display: flex; justify-content: center;">
                <div>
                  <div style="background: rgb(250, 250, 250); border: 2px dashed rgb(238, 238, 238); height: 150px; width: 150px; line-height: 150px; text-align: center;"><i class="iconfont icon-add font30"></i></div>
                </div>
              </div>
            </div>
          </div>
        </v-spacemodal>
      </li>
    </ul>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch
} from '@/utils'
import {
  LINK_TYPE,
  SERVER_NAME
} from '@/assets/enum'
import {
  Drawer
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer
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
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const sourceType: any = LINK_TYPE
    const serverName: any = SERVER_NAME

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      isShow,
      detail,
      drawer,
      sourceType,
      serverName
    }
  }
})
</script>
