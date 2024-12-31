<template>
  <div>
    <Basic v-model:user="userInfo"
           :edit="edit" :auth="auth.checked('edit')" />
    <Contact v-model:user="userInfo"
             :edit="edit" :auth="auth.checked('edit')" />
    <Blog v-model:user="userInfo"
          :edit="edit" :auth="auth.checked('edit')" />
    <Industry v-model:user="userInfo"
              :edit="edit" />
    <Education v-model:user="userInfo"
               :edit="edit" :auth="auth.checked('edit')" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, getCurrentInstance, onMounted, computed } from 'vue'
import {useStore} from 'vuex'
import Basic from './components/basic.vue'
import Contact from './components/contact.vue'
import Blog from './components/blog.vue'
import Industry from './components/industry.vue'
import Education from './components/education.vue'

  const props: any = defineProps({
    type: {
      type: String,
      defult: "index"
    }
  })
  const {ctx, proxy}:any = getCurrentInstance();
  const store = useStore();
  const userInfo = computed(() => store.getters['user/userInfo']);
  const auth: any = proxy.$auth.init('basic')

    function init(){
      store.dispatch('user/UserBaiscInfo', {
      })
    }

    function edit(param: any){
      store.dispatch('common/Fetch', {
          api: "editUserInfo",
          data: {
            ...param
          }
      }).then(res => {
        proxy.$hlj.message(res.returnMessage)
        console.log("ss");
      })       
    }
    
    onMounted(init)
</script>
