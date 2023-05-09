<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="话题">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <div v-for="(item, index) in albumList" :key="index" style="overflow: auto;">
      <div>{{item.month}}</div>
      <div>
        <div class="col-sm-6 col-md-2 p10" v-for="(img, i) in item.list" :key="i">
          <v-thumbnail :data="{image: [img]}" />
        </div>
      </div>
    </div>
    <v-nodata :data="albumList || []" />
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
import List from './components/list.vue'
import {
  useStore
} from 'vuex'
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
    const dataList = computed(() => store.getters['talk/collect']);
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])
    const albumList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'talkAlbum',
        data: {
          uid: "110506372"
        }
      }).then((res: any) => {
        albumList.value = res.result
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
