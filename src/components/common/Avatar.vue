<template>
<img :src="data.photos" class="mr10" style="width: 32px;
    height: 32px;
    border-radius: 50%;
    float: left">
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed
} from 'vue'
import {
  getUid
} from '@/utils'
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate
} from 'vue-router'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    photos: {
      type: String,
      default: "http://127.0.0.1//user/110506372/photos/110506372.png"
    }
  },
  emits: ['onClick'],
  setup(props, context) {

    return {

    }
  }
})
</script>
