<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "新增背景"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑背景' : '新增背景' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">头像背景</span>
        <span @click="clickAdd"><i class="iconfont icon-anonymous-iconfont" style="font-size: 18px !important"></i></span>
      </li>
      <li class="pt5" style="padding-left: 100px;">
        <div class="mb5 p10" style="background: #f8f8fa; overflow: auto;" v-for="(item, index) in img" :key="index">
          <div class="col-md-10"><img :src="item" style="width: 100%" onerror="this.src='/images/slideshow.png'"></div>
          <div class="col-md-2">
            <v-space>
              <v-croppingbackground kind="head_background" @submit="(e) => chooseImg(e, index)" />
              <span><i class="iconfont icon-mail" title="设置封面" @click="handleCover(item)"></i></span>
              <span><i class="iconfont icon-recycle" @click="clickRemove(index)"></i></span>
            </v-space>
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
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})
    const fileList: any = ref([])
    const img: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        img.value = detail.value.img
      }
    })

    function chooseImg(param: any, index: any) {
      img.value[index] = param
    }

    function clickAdd() {
      img.value.push("")
    }

    function clickRemove(index: any) {
      img.value.splice(index, 1)
    }

    // 设置封面
    function handleCover(param: any) {

      const arr = param.split("/")

      store.dispatch('common/Fetch', {
        api: 'setCover',
        data: {
          coding: props.data.coding,
          id: props.data.id,
          cover: arr[arr.length - 1]
        }
      }).then((res: any) => {
        if (res) {
          props.render()
        }
      })
    }

    function submit(params: any) {

      const {
        id,
        name,
        head_background,
        home_background,
        status
      } = detail.value

      const param: any = {
        name,
        head_background,
        img: img.value ? `|${img.value.join("|")}|` : "",
        status,
        coding: props.data.coding
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'updateBackground' : 'insertBackground',
        data: {
          ...param,
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    function choose(param: any){
      const {field, data} = param
      detail.value.fid = data.id
      detail.value.parent = data.name
    }
    
</script>
