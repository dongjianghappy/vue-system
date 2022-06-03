<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="心情管理">
      <template v-slot:extraright>
        <Detail />
        
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div v-for="(item, index) in dataList" :key="index">
      <div>{{item.name}} <span>
        <Detail />
        </span><span><i class="iconfont icon-add"></i><Detail1 /></span></div>
      <div class="clearfix">
          <div class="col-md-1" style="padding: 10px;">
            <div class="mood" style="position: relative;">开心 <span style="position: absolute; bottom: -25px; right: 0px; padding-top: 25px;"><span><i class="iconfont icon-edit"></i></span></span></div>
          </div>
          <div class="col-md-1" style="padding: 10px;">
            <div class="mood" style="position: relative;">工作 <span style="position: absolute; bottom: -25px; right: 0px; padding-top: 25px;"><span><i class="iconfont icon-edit"></i></span></span></div>
          </div>
        
      </div>
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
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
import Detail1 from './components/detail1.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Detail1
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = ref([]);
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'mood'
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>
