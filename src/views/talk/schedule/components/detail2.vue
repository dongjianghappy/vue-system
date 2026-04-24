<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "添加种类"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑种类' : '新增种类' " :style="{width: '450'}" :data="data" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">种类名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入网站名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">所属日程</span>
        {{detail.parent}}
        <v-category name="选择日程" :data="{item: detail, ...data}" :isInt="true" type="text"></v-category>
      </li>
      <li class="li">
        <span class="label">图标</span>
        <input v-model="detail.icon" type="text" placeholder="请输入图标" class="input-sm input-150" />
        <input v-model="detail.color" type="text" placeholder="请输入颜色" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入emoji" class="input-sm input-150" />
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
        <span class="label">标记</span>
        <v-radiobutton name="method" v-model:checked="detail.flag" :enums="[{label: '无', value: ''}, {label: '新', value: 'new'}, {label: '热', value: 'hot'}]" />
      </li> 
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  codings
} from '@/utils'

  const props: any = defineProps({
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
  })
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

      let arr = []
      if(detail.value.form){
        for (let i = 0; i < detail.value.form.length; i++) {
          arr.push(detail.value.form[i].id)
        }
      }

      const {
        id,
        fid,
        name,
        value,
        sort,
        icon,
        color,
        flag,
        energy_id,
        description,
        sync,
        system
      } = detail.value

      const param: any = {
        fid,
        name,
        value,
        icon,
        sort,
        color,
        img: img.value,
        flag,
        energy_id,
        description,
        sync,
        system,
        coding: props.data.coding
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          ...param,
          form: arr.join(',')
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

    function chooseForm(param: any) {
      
      console.log("ccccccccccccc");
      
      const {
        data
      } = param

      let index = detail.value.form.findIndex((item: any) => item.id === data.id)
      if (index === -1) {
        detail.value.form.push({
          id: data.id,
          name: data.remark
        })
      } else {
        detail.value.form.splice(index, 1)
      }
    }
</script>
