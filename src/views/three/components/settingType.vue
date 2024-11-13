<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'add' ? '设置类型' : ''}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="{...data, coding: data.coding.config_type}" :title="action === 'add' ? '新增设置类型' : '编辑设置类型'" :style="{width: '520', height: '400'}" :confirm="true" :cancel="true" @submit="submit">
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
        <span class="label">是组</span>
        <v-radiobutton name="group" v-model:checked="detail.isgroup" :enums="[{label: '是', value: '1'}, {label: '否', value: '0'}]" />
      </li>
      <li class="li">
        <span class="label">场景</span>
        <v-select :enums="sceneList" v-model:value="detail.scene" :defaultValue="detail.scene = detail.scene ? detail.scene : '0'" />
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
        name,
        value,
        sort,
        scene,
        isgroup
      } = detail.value

      const param: any = {
        name,
        value,
        sort,
        scene,
        isgroup
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
