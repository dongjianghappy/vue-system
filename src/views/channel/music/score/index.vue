<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="歌谱管理">
      <template v-slot:extraright>
        <v-toggledisplay v-model:toggle="toggleDisplay" />
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <Album :data="{coding}" :dataList="dataList" :render="init" v-if="toggleDisplay === 'album'" />
    <List :dataList="dataList" :render="init" v-else />
  </div>
</div>
<v-layer v-model:isShow="showFlag" :data="currentData" :index="index" :dataList="dataList.list" @prevOrNext="prevOrNext" :img="currentImg" v-if="showFlag" type="album" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  channels
} from '@/utils'
import {
  useStore
} from 'vuex'
import Album from './album.vue'
import List from './list.vue'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Album,
    List
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['channel/musicScore']);
    const coding: any = channels().coding.score;
    const checkedList: any = ref([])
    const toggleDisplay: any = ref("album")

    function init(param: any = {}) {
const params: any = {
        page: 1,
        pagesize: 12
      }

      Object.assign(params, param)

      store.dispatch('channel/musicScoreAction', {
        data: {
          coding,
          ...params
        }
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init,
      toggleDisplay
    }
  }
})
</script>
