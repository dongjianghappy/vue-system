<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '编辑': '新增勋章'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑勋章' : '新增勋章'" :data="data" :style="{width: '450'}" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">勋章名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入策略名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">条件</span>
        <input v-model="detail.award_condition" type="text" placeholder="请输入周期" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">勋章说明</span>
        <textarea v-model="detail.description" placeholder="请输入金币说明" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">图标</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, coding: data.coding}" :dataList="detail.img" uploadtype="medal" @imgList="image" maxLength="1" :style="'width: 135px'" />
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
  useProps
} from '@/utils'

  const props: any = defineProps(useProps)
    const store: any = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
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

    function submit(params: any) {

      const {
        id,
        fid,
        name,
        award_condition,
        description
      } = detail.value

      const param: any = {
        fid: fid || props.data.fid,
        name,
        img: img.value,
        award_condition,
        description,
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
</script>
