<template>
<span @click="handleclick">设置</span>
<Drawer ref="drawer" v-model:show="isShow" :action="action" title="用户设置" :data="data" api="userDetail" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">

    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">用户类型</span>
        <v-radiobutton name="ssss" v-model:checked="detail.grade" :enums="[{label: '访客', value: '0'},{label: '普通用户', value: '1'}, {label: '高级用户', value: '2'}, {label: 'VIP用户', value: '3'}, {label: '超级VIP', value: '4'}]" v-model:value="detail.area" />
      </li>
      <li class="li">
        <span class="label">角色管理</span>
        <v-select :enums="gradeList" v-model:value="detail.role" />
      </li>
      <li class="li">
        <span class="label">用户状态</span>
        <v-radio label="正常" name="status" value="0" v-model:checked="detail.status" />
        <v-radio label="禁言" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="封号" name="status" value="2" v-model:checked="detail.status" />
      </li>
    </ul>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'
import {
  Drawer
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer
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
    const detail: any = ref({})
    const drawer: any = ref(null)
    const gradeList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: "U0016",
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        const data: any = [{
          value: 0,
          name: "普通用户"
        }]
        res.result.list.map((item: any) => {
          data.push({
            value: item.id,
            name: item.name
          })
        })
        gradeList.value = data
      })
    }

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function submit(cancel: any) {
      const {
        account,
        role,
        grade,
        status
      } = detail.value
      const param = {
        uid: account,
        role,
        grade,
        status
      }
      store.dispatch('common/Fetch', {
        api: "updateUserInfo",
        data: {
          ...param
        }
      }).then(res => {
        props.render()
        cancel()
      })
    }

    return {
      isShow,
      handleclick,
      detail,
      drawer,
      gradeList,
      submit
    }
  }
})
</script>
