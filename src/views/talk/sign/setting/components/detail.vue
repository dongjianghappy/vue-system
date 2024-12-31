<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "新增内容"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑内容' : '新增内容' " :data="data" :render="render" :submit="submit">
  <template v-slot:extra>
    <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
      <input type="checkbox" v-model="detail.status" :checked="detail.status" class="mr5" style="float: left;"><span>显示</span>
    </label>
  </template>    
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img" uploadtype="sign" @imgList="image" :style="'width: 135px'" />
        </div>
      </li>
      <li class="li">
        <span class="label">文案绑定</span>
        <v-choose :data="{coding: codings.sign_sentence}" v-model:checked="detail.bind" @choose="choose" />
      </li>
      <li class="li" v-if="detail.bind && detail.bind.length">
        <div class="cl-999 p10" style=" background: #f8f8fa;">
          <div class="mb10" v-for="(item, index) in detail.bind" :key="index">{{item.name}}
            <i class="iconfont icon-close font12" @click="handleDelete(index)"></i>
          </div>
        </div>
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
  codings,
  useProps
} from '@/utils'

  const props: any = defineProps(useProps)
    const store: any = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    const img: any = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        if(!detail.value.bind){
          detail.value.bind = []
        }
      }
    })

    // 监听图片上传
    function image(a: any) {
      debugger
      img.value = a
    }
    
    function choose(param: any) {
      const {
        data
      } = param
      
      let index = detail.value.bind.findIndex((item: any) => item.id === data.id)
      if (index === -1) {
        detail.value.bind.push({
          id: data.id,
          name: data.content
        })
      } else {
        detail.value.bind.splice(index, 1)
      }
    }

    function handleDelete(index: any){
      detail.value.bind.splice(index, 1)
    }

    function submit(params: any) {
      let arr = []
      for (let i = 0; i < detail.value.bind.length; i++) {
        arr.push(detail.value.bind[i].id)
      }

      const {
        id,
        name,
        file,
        positioning,
        grade,
        style,
        description,
        status
      } = detail.value

      const param: any = {
        name,
        positioning,
        grade,
        img: img.value,
        file,
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
          bind: arr.join(',')
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }
</script>
