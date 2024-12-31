<template>
<v-button v-model:show="isShow" :disabled="auth">
  相关说明
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="相关说明" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.markdown" :data="detail" />
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  ref,
  watch,
  useStore,
  codings
} from '@/utils'
import SpaceModal from '../../space/components/modalSpace.vue'
  const props: any = defineProps({
    module: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    auth: {
      type: Boolean,
      default: false
    }
  })
    const store = useStore();
    const coding = codings.instructions
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init(){
      store.dispatch("common/Fetch", {
        api: 'getInstructions',
        data: {
          coding,
          module: props.module
        },
      }).then((res: any) => {
        detail.value = res.result
      })
    }

    function submit(params: any) {

      const {
        markdown
      } = detail.value
      
      store.dispatch('common/Fetch', {
        api: 'updateInstructions',
        data: {
          module: props.module,
          content: markdown ? marked.parse(markdown) : "",
          markdown,
        }
      }).then(() => {
        isShow.value = false
      })
    }
</script>
