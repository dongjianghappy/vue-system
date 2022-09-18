<template>
<span @click="handleclick">
  {{data.item.type === '1' ? "核心词" : data.item.type === '2' ? "目标词" : "长尾词"}}
</span>
<v-dialog v-model:show="isShow" ref="form" title="新增标签" :style="{width: '520', height: '200'}">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">属性类型</span>
        <v-radio label="核心词" name="type" value="1" v-model:checked="detail.type" />
        <v-radio label="目标词" name="type" value="2" v-model:checked="detail.type" />
        <v-radio label="长尾词" name="type" value="0" v-model:checked="detail.type" />
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@/utils'

export default defineComponent({
  name: 'v-DetailFlag',
  props: {
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
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      handleclick,
      detail,
      drawer
    }
  }
})
</script>
