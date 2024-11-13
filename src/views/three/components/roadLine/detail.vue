<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="路线" :style="{width: '350'}" :data="data" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.name" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea placeholder="请输入模型描述" v-model="detail.description" class="w-full" ></textarea>
      </li>
      <li class="li">
        <span class="label">坐标</span>
        <div class="p15" style="background: #f8f8fa">
          <div class="flex align_center">
            <div class="pr5" style="flex: 1">x坐标</div>
            <div class="pr5" style="flex: 1">y坐标</div>
            <div class="pr5" style="flex: 1">z坐标</div>
            <div style="width: 25px"><i class="iconfont icon-anonymous-iconfont" @click="handleAdd(detail.points)" /></div>
          </div>
          <div class="flex" v-for="(item, index) in detail.points" :key="index">
            <div class="pr5" style="flex: 1"><input type="text" v-model="item.x" class="input-sm input-full" /></div>
            <div class="pr5" style="flex: 1"><input type="text" v-model="item.y" class="input-sm input-full" /></div>
            <div class="pr5" style="flex: 1"><input type="text" v-model="item.z" class="input-sm input-full" /></div>
            <div style="width: 25px"><i class="iconfont icon-recycle" @click="handleRemove(detail.points, index)" /></div>
          </div>
        </div>
      </li>
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
import {
  tabsSetting
} from '@/assets/const'
export default defineComponent({
  name: 'v-Search',
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
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        if(props.action === 'add'){
          detail.value.points = []
        }
      }
    })

    function handleAdd(param: any){
      param.push({
        x: 0,
        y: 0,
        z: 0
      })
    }

    function handleRemove(param: any, index: any){
      param.splice(index, 1)
    }

    function submit(cancel: any) {
      const {
        scene_id,
        name,
        points,
        description,
        status
      } = detail.value

      
      const param: any = {
        scene_id: scene_id || props.data.scene_id,
        name,
        points: points.length > 0 ? JSON.stringify(points) : '',
        description,
        status
      }

      if (props.action !== "add") {
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      tabsSetting,
      detail,
      drawer,
      handleAdd,
      handleRemove,
      submit
    }
  }
})
</script>
