<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="自定义">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList" :key="index">
    <v-thumbnail :data="item" />
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
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
import List from './components/list.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
List
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])
    const albumList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'photoList',
        data: {
          uid: "110506372"
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      albumList,
      init
    }
  }
})
</script>
