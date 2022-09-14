<template>
<v-button v-model:show="isShow" :disabled="auth" >权限</v-button>
<v-drawer ref="drawer" v-model:show="isShow" action="edit" title="权限设置" :data="data" api="userGrade" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <table width="100%" class="table-striped col-left-12">
      <tr class="th">
        <td class="col-md-2">应用名称</td>
        <td class="col-md-3">描述</td>
        <td class="col-md-1">访客</td>
        <td class="col-md-1">普通用户</td>
        <td class="col-md-1">高级用户</td>
        <td class="col-md-1">VIP</td>
        <td class="col-md-1">超级VIP</td>
      </tr>
      <tr v-for="(item, index) in detail" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.description}}</td>
        <td>
          <v-switch :data="{ item, field: 'visitors', coding }" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'ordinary_member', coding }" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'senior_member', coding }" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'vip_member', coding }" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'super_vip_member', coding }" />
        </td>
      </tr>
    </table>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  codings
} from '@/utils'
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
    },
        auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const coding: any = codings['user'].grade;
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      coding,
      isShow,
      detail,
      drawer
    }
  }
})
</script>
