<template>
<span @click="handleclick" v-if="type === 'all'" class="pointer">
  <i class="iconfont iconslide" :class="expand ? 'icon-jianhao' : 'icon-anonymous-iconfont'"></i>
  {{expand ? '展开' : '收缩'}}</span>
<i v-else class="iconfont iconslide" :class="data.isShow ? 'icon-jianhao' : 'icon-anonymous-iconfont'" @click="handleclick({data, id: data.id})"></i>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    type: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const expand: any = ref(false)
    function handleclick() {
      // 全部展开收缩
      if (props.type === 'all') {
        expand.value = !expand.value
        const loop = (data: any) => {
          return data.map((item: any) => {
            item.isShow = !item.isShow;
            if (item.list) {
              loop(item.list);
            }
          });
        };

        loop(props.data);
      } else {
        const {
          data
        }: any = props
        data.isShow = !data.isShow;
      }
    }
    return {
      expand,
      handleclick
    }
  }
})
</script>
