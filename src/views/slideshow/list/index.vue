<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="轮播图管理">
      <template v-slot:extraright>
        <v-space>
          <Detail :data="{ coding }" :render="init" :auth="auth.checked('add')" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15 font12">
    <div v-for="(item, index) in dataList" :key="index" style="overflow: auto;">
      <div class="col-md-3">
        <SpaceModal>
          <img :src="item.image" width="250" height="100" alt="">
        </SpaceModal>
      </div>
      <div class="col-md-6">
        <div><span class="ant-input-group-wrapper" style="width: 450px;"><span class="ant-input-wrapper ant-input-group"><span class="ant-input-group-addon">图片地址</span><input type="text" class="ant-input" v-model="item.image"></span></span></div>
        <div style="margin-top: 5px;"><span class="ant-input-group-wrapper" style="width: 450px;"><span class="ant-input-wrapper ant-input-group"><span class="ant-input-group-addon">连接地址</span><input type="text" class="ant-input" v-model="item.url"></span></span></div>
        <div style="margin-top: 5px;"><span class="ant-input-group-wrapper" style="width: 450px;"><span class="ant-input-wrapper ant-input-group"><span class="ant-input-group-addon">文字说明</span><input type="text" class="ant-input" v-model="item.description"></span></span></div>
      </div>
      <div class="col-md-2" style="display: flex; justify-content: space-around; align-items: center;">
        <v-switch :data="{ item, field: 'checked', coding }" :auth="auth.checked('edit')" />
      </div>
      <div class="col-md-1" style="display: flex; justify-content: space-around; align-items: center;">
        <v-buttonmove :data="{dataList: moveItem, item: data, index}" />
      </div>
    </div>
    <v-nodata :data="dataList || []" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRoute,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import SpaceModal from '../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    SpaceModal
  },
  props: {},
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['slideshow'].art;
    const dataList: any = ref([])

    function init() {
      const {
        fid
      }: any = route.query
      store.dispatch('common/Fetch', {
        api: "slideshowList",
        data: {
          fid
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      auth: proxy.$auth.init('slideshow/list')
    }
  }
})
</script>
