<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增活动"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑活动' : '新增活动' " :data="{...data, coding: data.coding.activity}" :param="detail" :render="render" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
        <input type="checkbox" v-model="detail.status" :checked="detail.status" class="mr5" style="float: left;"><span>显示</span>
      </label>
    </v-space>
  </template>
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">标题</span>
        <div style="display: flex">
          <div style="flex: 1">
            <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
          </div>
          <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
        </div>
      </li>
      <li class="li">
        <span class="label">日期</span>
        <div class="flex">
          <div style="flex: 1">
            <input v-model="detail.start_time" type="text" placeholder="请输入开始时间" class="input-sm input-150" />
            <v-timepicker :data="detail" attr="start_time" />
          </div>
          <div style="flex: 1">
            <input v-model="detail.last_time" type="text" placeholder="请输入结束时间" class="input-sm input-150" />
            <v-timepicker :data="detail" attr="last_time" />
          </div>
        </div>
      </li>
      <li class="li">
        <span class="label">卡包</span>
        <span class="mr15">{{detail.card_holder_name}}</span>
        <v-choose :data="{item: detail, coding: data.coding.cardholder, condition: {status: 1}}" v-model:checked="detail.card_holder" type="radio" @choose="choose" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, coding: data.coding.activity}" :dataList="detail.img" uploadtype="huodong" @imgList="image" :style="'width: 135px'" />
        </div>
      </li>
    </ul>
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.markdown" :data="detail" />
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineProps,
  ref,
  useProps,
  useStore,
  watch,
} from '@/utils'

  const props: any = defineProps(useProps)
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
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

    function choose(param: any) {
      const {
        data
      } = param
      detail.value.card_holder = data.id
      detail.value.card_holder_name = data.name
    }    

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function submit(params: any) {
      const {
        id,
        title,
        markdown,
        card_holder,
        start_time,
        last_time,
        status
      } = detail.value
      const param: any = {
        title,
        img: img.value,
        content: markdown ? marked.parse(markdown) : "",
        markdown,
        card_holder,
        start_time,
        last_time,
        status
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding.activity,
          ...param
        }
      }).then(() => {
        props.render()
        params.message()
        params.cancel()
      })
    }
</script>
