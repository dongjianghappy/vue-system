<template>
<span @click="handleclick">设置</span>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="用户设置" :top="64" :data="{uid: data.uid}" api="userDetail" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="mb15">
      <v-space>
        <span>用户状态: {{bannedType[detail.status]}}
          <SetBan :data="detail" /></span>
        <span>
          <v-authority name="用户权限" title="权限管理" :data="{uid: data.uid, coding: data.coding.config}" :auth="true" /></span>
        <span><a :href="`/admin/personal?uid=${detail.account}`" target="_brank">查看</a></span>
      </v-space>
    </div>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">用户类型</span>
        <v-radiobutton name="ssss" v-model:checked="detail.grade" :enums="[{label: '普通用户', value: '0'},{label: '普通会员', value: '1'}, {label: '高级会员', value: '2'}, {label: 'VIP会员', value: '3'}, {label: '超级VIP', value: '4'}]" />
      </li>
      <li class="li">
        <span class="label">角色管理</span>
        <v-select :enums="gradeList" v-model:value="detail.role" />
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
import SetBan from './setBan.vue'
import {
  BANNED_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    SetBan
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
    const bannedType: any = BANNED_TYPE
    const drawer: any = ref(null)
    const detail: any = ref({})
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
          coding: props.data.coding.role
        }
      }).then(res => {
        const data: any = [{
          value: 0,
          name: "普通用户"
        }]
        res.result.map((item: any) => {
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

    function submit(params: any) {
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
      })
    }

    return {
      isShow,
      handleclick,
      detail,
      drawer,
      gradeList,
      submit,
      bannedType
    }
  }
})
</script>
