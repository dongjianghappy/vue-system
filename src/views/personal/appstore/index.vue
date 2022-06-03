<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="频道管理">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-md-2" v-for="(item, index) in channel" :key="index" style="padding-right: 8px; padding-bottom: 8px;">
      <v-cards :data={...item} :name="item.name" value="描述" click="查看" className="channel-bg" @onClick="handelRouter" />
    </div>
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
  useStore,
  useRouter,
  useRoute
} from '@/utils'
export default defineComponent({
  name: 'HomeViewdd',
  components: {

  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const route = useRoute();
    const dataList = computed(() => store.getters['talk/praise']);
    const channel = computed(() => store.getters['user/channel']);
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])

    function init() {
      store.dispatch('talk/praiseAction')
    }

    function handelRouter(data: any){
      router.push(`/admin/personal/${data}?uid=${route.query.uid}`)
    }

    onMounted(init)

    return {
      coding,
      channel,
      dataList,
      checkedList,
      handelRouter,
      init
    }
  }
})
</script>

<style scoped>
.channel-bg{
  background: #eee;
}
</style>