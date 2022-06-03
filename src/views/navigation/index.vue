<template>
  <div class="module-wrap">
    <div class="module-head">
      <v-optionsbar title="导航管理">
        
      </v-optionsbar>
    </div>
    <div class="module-content plr15 font12">

      <table width="100%" class="table-channel table-striped col-left-23">
        <tr v-for="(item, index) in channel" :key="index">
          <td class="col-md-2 bd0">
            <div class="card" style="height: 70px;">
              <div class="ant-card-body">{{item.name}}</div>
            </div>
          </td>
          <td class="col-md-3">
            <div class="card" style="height: 70px;">
              <div class="ant-card-body"><span class="quick-edit" style="width: 100%;">{{item.navname}}</span></div>
            </div>
          </td>
          <td class="col-md-4">
            <div class="card" style="height: 70px;">
              <div class="ant-card-body"><span class="quick-edit" style="width: 100%;">{{item.url}}</span></div>
            </div>
          </td>
          <td class="col-md-2">
            <div class="card" style="height: 70px;">
              <v-space>
                <span @click="handleclick(`/admin/navigation/main?channel=${item.id}&name=${item.name}`)">导航栏</span>
                <span @click="handleclick(`/admin/navigation/single?channel=${item.id}&name=${item.name}`)">单页</span>
              </v-space>
            </div>
          </td>
          <td class="col-md-1">
            <div class="card" style="height: 70px;">
              <div class="ant-card-body">
                <v-switch :data="{ item, field: 'status', coding }" />
              </div>
            </div>
          </td>
        </tr>
      </table>
      <v-nodata :data="channel" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useRouter
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const channel = computed(() => store.getters['common/channel']);
    const coding: any = proxy.$coding['navigation'].main;

    function init() {
      store.dispatch('common/Channel')
    }

    function edit(param: any) {
      store.dispatch('common/Fetch', {
        api: "EditUserInfo",
        data: {
          ...param
        }
      })
    }

    function handleclick(params: any) {
      router.push(params)
    }

    onMounted(init)

    return {
      coding,
      channel,
      edit,
      handleclick

    }
  }
})
</script>
