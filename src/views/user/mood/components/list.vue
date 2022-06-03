<template>
  <div class="p25">用户类别
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, computed } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
setup(props,context) {
  const {ctx, proxy}:any = getCurrentInstance();
  const store = useStore();
  const userInfo = computed(() => store.getters['user/userInfo']);

    function init(){
      store.dispatch('user/UserBaiscInfo', {
      })
    }

    function edit(param: any){
      store.dispatch('common/Fetch', {
          api: "EditUserInfo",
          data: {
            ...param
          }
      }).then(res => {
        proxy.$hlj.message(res.returnMessage)
        console.log("ss");
      })       
    }
    
    onMounted(init)

  return {
    userInfo,
    edit
    
  }
}  
})
</script>
