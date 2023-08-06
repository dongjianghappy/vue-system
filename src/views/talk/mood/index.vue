<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="心情管理">
      <template v-slot:extraright>
        <Detail :data="{coding: coding.cate}" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div v-for="(item, index) in dataList" :key="index" class="mb5" style="border: 1px solid #eee; bacoground: #f8f8fa">
      <v-collapse :title="item.name" :disabled="true">
        <template v-slot:extra>
           <Detail action="edit" :data="{id: item.id, coding: coding.cate }" :render="init" :auth="true" />
           <Detail1 action="add" :data="{fid: item.id, coding: coding.art}" :render="init" />
        </template>
        <div class="clearfix">
          <div class="col-md-1" style="padding: 10px;" v-for="(list, i) in item.list" :key="i">
            <div class="mood relative" :style="{background: list.color}">
              <List :data="{...list}" />
              <span style="position: absolute; bottom: -25px; right: 0px; padding-top: 25px;">
              <Detail1 action="edit" :data="{id: list.id, coding: coding.art }" :render="init" :auth="true" />
              </span>
            </div>
          </div>
        </div>
      </v-collapse>
    </div>
    <v-nodata :data="dataList" />
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
import List from './list/index.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Detail1,
    List
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = ref([]);
    const coding: any = proxy.$coding['user'].mood;
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
