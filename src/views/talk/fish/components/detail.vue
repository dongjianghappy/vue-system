<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "添加鱼种类"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑鱼种类' : '新增鱼种类' " :data="data" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">新增鱼种类</span>
        <input v-model="detail.name" type="text" placeholder="请输入鱼种类" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">图片名称</span>
        <input v-model="detail.image" type="text" placeholder="请输入图片名称" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">消耗能量</span>
        <input v-model="detail.energy" type="text" placeholder="请输入能量值" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">周期</span>
        <input v-model="detail.cycle" type="text" placeholder="请输入周期" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">产生金币</span>
        <input v-model="detail.coin" type="text" placeholder="请输入金币" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea v-model="detail.description" placeholder="请输描述" class="w-full"></textarea>
      </li> 
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  codings,
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'

export default defineComponent({
  name: 'v-Detail',
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
    const coding: any = codings
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function submit(params: any) {

      const {
        id,
        name,
        sort,
        image,
        energy,
        cycle,
        coin,
        description,
        status
      } = detail.value

      const param: any = {
        name,
        sort,
        image,
        energy,
        cycle,
        coin,
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
      coding,
      isShow,
      drawer,
      detail,
      submit
    }
  }
})
</script>
