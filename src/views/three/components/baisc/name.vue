<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="{...data, coding: data.coding.config_type}" :title="action === 'add' ? '新增物体' : '编辑物体'" :style="{width: '520', height: '300'}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.name" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.value" placeholder="请输入字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input type="text" v-model="detail.sort" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
    </ul>
  </template>
</v-dialog>
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
  components: {

  },
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
    const dialog: any = ref(null)
    const detail: any = ref({})
    const sceneList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        getScene()
        detail.value = await dialog.value.init()
      }
    })

    function getScene(){
      store.dispatch('common/Fetch', {
        data: {
          coding: props.data.coding.scene,
        }
      }).then(res => {

        let arr: any = [{
          value: 0,
          name: '所有星球'
        }]
        res.result.forEach((item: any) => {
          arr.push({
            value: item.id,
            name: item.name
          })
        })

        sceneList.value = arr
      })
    }

    function submit(cancel: any) {
      const {
        fid,
        name,
        value,
        sort,
      } = detail.value

      const param: any = {
        fid: fid || props.data.fid,
        name,
        value,
        sort,
      }

      if (props.action !== "add") { //  && props.param
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data.coding.config_type,
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
      dialog,
      submit,
      sceneList
    }
  }
})
</script>
