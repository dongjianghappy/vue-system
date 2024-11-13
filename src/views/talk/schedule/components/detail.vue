<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "添加日程"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑日程' : '新增日程' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">日程名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入网站名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input v-model="detail.value" type="text" placeholder="请输入字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img" uploadtype="schedule" @imgList="image" :style="'width: 135px'" />
        </div>
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea v-model="detail.description" placeholder="请输描述" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">同步到动态</span>
        <v-radiobutton name="method" v-model:checked="detail.sync" :enums="[{label: '是', value: '1'}, {label: '否', value: '0'}]" />
      </li>
      <li class="li">
        <span class="label">能量绑定</span>
        <span class="mr15">{{detail.energy_name}}</span>
        <v-choose :data="{item: detail, coding: coding.energy}" v-model:checked="detail.energy_id" type="radio" @choose="choose" />
      </li>      
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  codings,
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'

export default defineComponent({
  name: 'v-Detail',
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
    const store: any = useStore()
    const coding: any = codings
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    const img: any = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function chooseColor(param: any) {
      detail.value.color = param.value
    }

    function submit(params: any) {

      const {
        id,
        name,
        value,
        energy_id,
        description,
        sync
      } = detail.value

      const param: any = {
        name,
        value,
        img: img.value,
        energy_id,
        description,
        sync,
        system: '1',
        coding: props.data.coding
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          ...param,
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    // 监听图片上传
    function image(a: any) {
      debugger
      img.value = a
    }

    function choose(param: any) {
      const {
        data
      } = param
      detail.value.energy_id = data.id
      detail.value.energy_name = data.name
    }      

    return {
      coding,
      isShow,
      drawer,
      upload,
      detail,
      image,
      chooseColor,
      submit,
      choose
    }
  }
})
</script>
