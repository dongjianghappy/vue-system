<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? "编辑": "新增分类"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑分类' : '新增分类' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="menu" method="click">
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">分类名称</span>
            <input v-model="detail.name" type="text" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">分类连接</span>
            <input v-model="detail.url" type="text" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">所属分类</span>
            {{detail.parent}}
            <v-category name="选择分类" :data="{detail, coding}" type="text" api="delete"></v-category>
          </li>
          <li class="li">
            <span class="label">顺序</span>
            <input v-model="detail.sort" type="text" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">显示</span>
            <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
            <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
          </li>
          <li class="li">
            <span class="label">类型</span>
            <select class="w-full" v-model="detail.navtype">
              <option v-for="(item, index) in navType" :key="index" :value="item.value">
                {{item.name}}
              </option>
            </select>
          </li>
          <li class="li">
            <span class="label">聚合标签</span>
            <v-checkboxgroup :tagList="checkboxList" />
          </li>
        </ul>
      </template>
      <template v-slot:content2>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">SEO标题</span>
            <input v-model="detail.seotitle" type="text" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">关键词</span>
            <input v-model="detail.keyword" type="text" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">描述</span>
            <textarea v-model="detail.keyword"></textarea>
          </li>
        </ul>
      </template>
    </v-tabs>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  NAV_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
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
    checkboxList: {
      type: Array,
      default: []
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
    const drawer: any = ref(null)
    const navType: any = NAV_TYPE
    const store = useStore();
    const detail: any = ref({})

    let menu: any = ref([{
        name: "分类信息",
        value: "appstore1"
      },
      {
        name: "页面信息",
        value: "appstore2"
      }
    ])
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
      menu,
      navType
    }
  }
})
</script>
