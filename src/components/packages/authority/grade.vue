<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont icon-grade" />
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :data="data.grade" :title="`${data.name}权限`" :style="{width: 600, height: 200}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <table class="table-striped col-left-12">
      <tr class="th">
        <td class="col-md-1">访客<i class="iconfont icon-dagou" :class="data.channel_grade.visitors === '1' ? 'cl-green': 'cl-ccc'" /></td>
        <td class="col-md-1">普通用户<i class="iconfont icon-dagou" :class="data.channel_grade.ordinary_member === '1' ? 'cl-green': 'cl-ccc'" /></td>
        <td class="col-md-1">高级用户<i class="iconfont icon-dagou" :class="data.channel_grade.senior_member === '1' ? 'cl-green': 'cl-ccc'" /></td>
        <td class="col-md-1">VIP<i class="iconfont icon-dagou" :class="data.channel_grade.vip_member === '1' ? 'cl-green': 'cl-ccc'" /></td>
        <td class="col-md-1">超级VIP<i class="iconfont icon-dagou" :class="data.channel_grade.super_vip_member === '1' ? 'cl-green': 'cl-ccc'" /></td>
      </tr>
      <tr v-for="(item, index) in data.grade" :key="index">
        <td>

          <v-switch :data="{ item: {...item, id: data.id}, field: 'visitors', coding }" api="setAuthority" @toggle="getValue" :auth="data.channel_grade.visitors === '1' ? true : false" />
        </td>
        <td>
          <v-switch :data="{ item: {...item, id: data.id}, field: 'ordinary_member', coding }" api="setAuthority" @toggle="getValue" :auth="data.channel_grade.ordinary_member === '1' ? true : false" />
        </td>
        <td>
          <v-switch :data="{ item: {...item, id: data.id}, field: 'senior_member', coding }" api="setAuthority" @toggle="getValue" :auth="data.channel_grade.senior_member === '1' ? true : false" />
        </td>
        <td>
          <v-switch :data="{ item: {...item, id: data.id}, field: 'vip_member', coding }" api="setAuthority" @toggle="getValue" :auth="data.channel_grade.vip_member === '1' ? true : false" />
        </td>
        <td>
          <v-switch :data="{ item: {...item, id: data.id}, field: 'super_vip_member', coding }" api="setAuthority" @toggle="getValue" :auth="data.channel_grade.super_vip_member === '1' ? true : false" />
        </td>
      </tr>
    </table>
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

export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    coding: {
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

    function getValue() {
      props.render()
    }

    return {
      isShow,
      detail,
      dialog,
      getValue
    }
  }
})
</script>
