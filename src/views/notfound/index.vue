<template>
<div class="p25">
  <v-basicinfo v-model:data="dataList" :edit="edit" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  components: {},
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['website/webinfo']);

    function init() {
      store.dispatch('website/BasicInfo', {
        coding: "P0000"
      })
    }

    function edit(param: any){
      
      store.dispatch('common/Fetch', {
          api: "updateInfo",
          coding: "P0000",
          data: {
            id: 123
          }
      }).then(res => {
        
      })       
    }

    onMounted(init)

    return {
      dataList,
      edit

    }
  }
})
</script>

