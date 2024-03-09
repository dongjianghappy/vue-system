<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "新增挂件"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑挂件' : '新增挂件' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">分类</span>
        <span class="mr15">{{detail.parent}}</span>
        <v-choose title="选择分类" :data="{ item: detail, field: 'fid', condition: {type: 'pendant'}, coding: 'U0700037' }" v-model:checked="detail.fid" @choose="choose" type="radio" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">Style属性</span>
        <textarea v-model="detail.style" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img" uploadtype="theme" @imgList="image" :style="'width: 135px'" />
        </div>
      </li>
      <!-- <li class="li" style="overflow: hidden;">
        <span class="label">挂件</span>
        <div class="clearfix bg-f7f8fa" style="height: auto">
          <div class="p10">系统挂件图标, 每个挂件只能绑定一次</div>
          <div class="col-md-2 p10 relative" v-for="(item, index) in fileList" :key="index">
            <img :src="item" @click="choose(item)" style="width: 100%; height: 80px" />
           <i class="iconfont icon-checkbox m0 cl-red" style="right: 10px; top: 10px; padding: 2px; z-index: 1;" v-if="item === detail.file"></i>
           </div>
        </div>
      </li> -->
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'

export default defineComponent({
  name: 'v-Detail1',
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
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})
    const img = ref("")
    const fileList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        // getPendant()
      }
    })

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function choose(param: any){
      const {field, data} = param
      detail.value.fid = data.id
      detail.value.parent = data.name
    }
    function submit(params: any) {

      const {
        id,
        fid,
        name,
        grade,
        style,
        description,
        status
      } = detail.value

      const param: any = {
        fid,
        name,
        grade,
        img: img.value,
        style,
        description,
        status,
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

    return {
      isShow,
      drawer,
      detail,
      image,
      submit,
      fileList,
      choose
    }
  }
})
</script>
