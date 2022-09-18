<template>
<span v-if="type === 'all'" @click="handleclick" class="pointer">
  <i class="iconfont iconslide" :class="expand ? 'icon-jianhao' : 'icon-anonymous-iconfont'"></i>
  {{expand ? '展开' : '收缩'}}</span>
<i v-else @click="handleclick({data, id: data.id})" class="iconfont iconslide" :class="data.isShow ? 'icon-jianhao' : 'icon-anonymous-iconfont'"></i>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-ButtonExpand',
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
  setup(props, context) {
    const expand: any = ref(false)

    function handleclick() {
      if (props.type === 'all') {
        const loop = (data: any) => {
          return data.map((item: any) => {
            item.isShow = !item.isShow;
            if (item.list) {
              loop(item.list);
            }
          });
        };
        loop(props.data);
        expand.value = !expand.value
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
