<template>
<v-button v-model:show="isShow" :disabled="auth">
  Ai写作
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" title="Ai写作" :style="{width: 450}" confirmName="粘贴" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div>
      <div style="flex: 1">
        <textarea placeholder="请输入指令" v-model="title" class="w-full"></textarea>
      </div>
      <iframe src="https://yiyan.baidu.com/chat/ODgwNzIzMjQ4OjQ4MjY0ODI5MDE=" style=" width: 100%; height: 500px"></iframe>
      <!-- <div class="mb15" style="display: flex">
        <div style="flex: 1">
          <input v-model="detail.name" type="text" placeholder="请输入指令" class="input-sm input-full" :style="[detail.style]" />
        </div>
        <div><span>提交</span></div>
      </div>
      <div>
        
      </div> -->
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
} from '@/utils'
  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Boolean,
      default: false
    }
  })

  const emit: any = defineEmits(['editorAi'])
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const title: any = ref('')

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        title.value = `写一篇关于标题为《${props.data.title ? props.data.title : '文章标题'}》文章，内容600字以上，摘要200子以下，内容提到${props.data.tag ? props.data.tag : '文章提到词语'}`
      }
    })

    function submit(cancel: any) {
      document.addEventListener('click', () => {
        navigator.clipboard.readText().then((text: any) => {
          emit('editorAi', text)
          isShow.value = false        
        }).catch((err: any) => {
          console.log(err);
        })
      })
    }
</script>
