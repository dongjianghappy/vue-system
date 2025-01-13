<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增推广'}}
</v-button>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑推广' : '新增推广' " :data="data" :param="detail" :render="render">
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
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入推广名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">链接</span>
        <input v-model="detail.url" type="text" placeholder="请输入url地址" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-select :enums="SPREAD_TYPE" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '0'" />
      </li>
      <li class="li">
        <span class="label">区域</span>
        <v-select :enums="SPREAD_AREA" v-model:value="detail.area" :defaultValue="detail.area = detail.area ? detail.area : '0'" />
      </li>
      <li class="li">
        <span class="label">价格</span>
        <input v-model="detail.price" type="text" placeholder="请输入价格" class="input-sm input-150" />
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
        <span class="label">预览图</span>
        <SpaceModal v-model:image="detail.image">
          <span class="right">选择图片</span>
        </SpaceModal>
        <div>
          <img height="150" style="width: 100%" :src="detail.image" alt="">
        </div>
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea placeholder="请输入说明" v-model="data.content" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch
} from '@/utils'
import {
  SPREAD_TYPE,
  SPREAD_AREA
} from '@/assets/enum'
import SpaceModal from '../../space/components/modalSpace.vue'
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
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  })
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })
</script>
