<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="导航管理" />
  </div>
  <div class="module-content plr15 font12">
    <table class="table-channel table-striped col-left-23">
      <tr v-for="(item, index) in channel" :key="index">
        <td class="col-md-2 bd0">
          <div class="card h70">
            <div class="ant-card-body">{{item.name}}</div>
          </div>
        </td>
        <td class="col-md-3">
          <div class="card h70">
            <div class="ant-card-body"><span class="quick-edit">{{item.navname}}</span></div>
          </div>
        </td>
        <td class="col-md-4">
          <div class="card h70">
            <div class="ant-card-body"><span class="quick-edit">{{item.url}}</span></div>
          </div>
        </td>
        <td class="col-md-2">
          <div class="card h70">
            <v-space>
              <span @click="handleclick('main',item)">导航栏</span>
              <span @click="handleclick('single', item)">单页</span>
            </v-space>
          </div>
        </td>
        <td class="col-md-1">
          <div class="card h70">
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
  onMounted,
  computed,
  useStore,
  useRouter,
  codings
} from '@/utils'

export default defineComponent({
  name: 'Navigation',
  setup(props, context) {
    const store = useStore();
    const router: any = useRouter();
    const channel = computed(() => store.getters['common/channel']);
    const coding: any = codings.navigation;

    function handleclick(type: any, params: any) {
      router.push(`/admin/navigation/${type}?channel=${params.id}&name=${params.name}`)
    }

    onMounted(() => {
      store.dispatch('common/Channel')
    })

    return {
      coding,
      channel,
      handleclick
    }
  }
})
</script>
