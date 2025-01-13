<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "创建话题"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑话题' : '创建话题' " :data="data" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <span class="mt10">
        <VoteSetting :data="detail" type="activity" />
      </span>
      <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
        <input type="checkbox" v-model="data.status" :checked="data.status" class="mr5" style="float: left;"><span>显示</span>
      </label>
    </v-space>
  </template>  
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">话题名称</span>
        <div style="display: flex">
          <div style="flex: 1">
            <input v-model="detail.name" type="text" placeholder="请输入话题名称" class="input-sm input-full" :style="[detail.style]" />
          </div>
          <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
        </div>
      </li>
      <li class="li">
        <span class="label">话题类型</span>
        <v-select :enums="[{value: '1', name: '学生'}, {value: '2', name: '体育'}]" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '2'" />
      </li>
      <li class="li">
        <span class="label">缩略图</span>
        <div class="relative  bg-999" style=" width: 180px; height: 160px;">
          <img :src="detail.image" onerror="this.src='/images/slideshow.png'" style="width: 180px; height: 160px;" />
          <span class="absolute" style="bottom: 0px; right: 0; width: 16px; height: 16px; z-index: 10">
            <v-selectbackground kind="activity_photos" :mask="{ w: 500, h: 400, tb: 0, lr: 100 }" :data="{id: detail.id}" :size="{width: 400, height: 400}" />
          </span>
        </div>
        <!-- <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img || []" uploadtype="weibo" @imgList="image" :style="'width: 135px'" /> -->
      </li>
      <li class="li">
        <span class="label">背景图</span>
        <div class="relative  bg-999" style=" width: 100%; height: 160px;">
          <img :src="detail.image" onerror="this.src='/images/slideshow.png'" style="width: 180px; height: 160px;" />
          <span class="absolute" style="bottom: 0px; right: 0; width: 16px; height: 16px; z-index: 10">
            <v-selectbackground kind="activity_background" :mask="{ w: 1100, h: 280, tb: 80, lr: 0 }" :data="{id: detail.id}" :style="{width: 1170, height: 570}" :img="{width: 1440}" :size="{width: 1100, height: 200}" />
          </span>
        </div>
        <!-- <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img || []" uploadtype="weibo" @imgList="image" :style="'width: 135px'" /> -->
      </li>
      <li class="li">
        <span class="label">话题描述</span>
        <textarea placeholder="请输入话题描述" v-model="detail.summary" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
} from '@/utils'
import VoteSetting from '@/views/module/vote/components/setting.vue'
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
    },
    auth: {
      type: Boolean,
      default: false
    }
  })
    const store = useStore()
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

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function submit(cancel: any) {
      const {
        id,
        name,
        type,
        summary
      } = detail.value

      const param: any = {
        singer_id: props.data.singer_id,
        name,
        type,
        summary,
        img: img.value
      }
      debugger
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }
</script>
