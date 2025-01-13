<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增内容"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑内容' : '新增内容'" :style="{width: 500}" :data="{...data, coding: data.coding}" :param="detail" :render="render" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
        <input type="checkbox" v-model="detail.checked" :checked="detail.checked" class="mr5" style="float: left;"><span>显示</span>
      </label>
    </v-space>
  </template>   
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">标题</span>
        <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
      </li>
      <li class="li">
        <span class="label">日期</span>
        <div class="flex">
          <div style="flex: 1">
            <input v-model="detail.start_date" type="text" placeholder="请输入开始日期" class="input-sm input-150" />
          </div>
          <div style="flex: 1">
            <input v-model="detail.end_date" type="text" placeholder="请输入结束日期" class="input-sm input-150" />
          </div>
        </div>
      </li>
      <li class="li">
        <span class="label">tag标签</span>
        <v-tag v-model:tags="detail.tag" />
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">图片</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding.art}" :dataList="detail.img || []" uploadtype="commonSense" @imgList="image" :style="'width: 135px'" />
      </li>
      <li class="li">
        <span class="label">内容</span>
        <v-editor v-model:contentsss="detail.markdown" :detail="detail" />
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  ref,
  useStore,
  watch,
  useProps
} from '@/utils'
const props: any = defineProps(useProps)
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
        if (props.action === 'edit') {
          let style = JSON.parse(detail.value.style || '{}')
          detail.value.style = style instanceof Object ? style : {}
        } else {
          detail.value.style = {}
        }
      }
    })

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function submit(params: any) {
      const {
        id,
        fid,
        title,
        markdown,
        tag,
        start_date,
        end_date,
        checked
      } = detail.value
      
      const param: any = {
        fid: fid || props.data.fid,
        title,
        content: markdown ? marked.parse(markdown) : "",
        markdown,
        tag: tag ? tag.join(',') : "",
        start_date,
        end_date,
        checked,
        img: img.value
      }
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
        params.message()
        params.cancel()
      })
    }
</script>
