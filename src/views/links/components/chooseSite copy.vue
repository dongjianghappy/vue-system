<template>
<span @click="handleChoose" class="pointer">
  {{title}}
</span>
<v-drawer ref="drawer" v-model:show="isShow" action="add" :title="title" :style="{width: 350}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 选择</td>
        <td class="col-md-2">网站名称 </td>
      </tr>
      <template v-if="dataList.length > 0">
        <tr v-for="(item, index) in dataList" :key="index">
          <td>
            {{checked}}
            <label class="relative mr25" style="display: inline-block; line-height: 18px;" v-if="type === 'radio'">
              <input type="radio" name="website" :value="item.id" :checked="checked.id === item.id" class="mr5" style="float: left" @change="handleclick(item.id)" />
            </label>
            <v-checkbox :checkedList="checked" :data="{ id: item.id}" v-else />
          </td>
          <td>
            {{item.name}}
          </td>
        </tr>
      </template>
    </table>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  onMounted
} from '@/utils'
export default defineComponent({
  name: 'v-ChooseSite',
  props: {
    title: {
      type: String,
      default: "请选择"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    checked: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "checkbox"
    },
    message: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  emits: ['update:checked', 'onClick'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const dataList: any = ref([])

    //初始页面
    function init() {
      store.dispatch('common/Fetch', {
        api: "siteList"
      }).then(res => {
        dataList.value = res.result
        let arr = dataList.value.filter((item: any) => item.id === props.data.id)
        if (arr) {
          context.emit(`update:checked`, arr[0] || {})
        }
      })
    }

    function handleChoose() {
      if (props.disabled) {
        proxy.$hlj.message({
          msg: props.message
        })
        return false
      }
      isShow.value = true
    }

    function handleclick(value: any) {
      let arr = dataList.value.filter((item: any) => item.id === value)
      if (arr) {
        context.emit('onClick', true)
        context.emit(`update:checked`, arr[0] || {})
      }
    }

    onMounted(init)
    return {
      isShow,
      drawer,
      handleclick,
      handleChoose,
      dataList,
    }
  }
})
</script>
