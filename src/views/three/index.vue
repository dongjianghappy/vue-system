<template>
<div><Setting :auth="false" /></div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings
} from '@/utils'
import {
  ChartLine
} from '@/components/packages/chart/index'
import Setting from './components/setting.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChartLine,
    Setting
  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const coding = codings
    const user: any = computed(() => store.getters['basic/userDefault'].user || {});
    const hours: any = computed(() => {
      let aaa = store.getters['basic/userDefault'].year || {}
      return {
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          series: [
            [...(aaa.register) || []],
          ]
        },
        options: {
          title: ["2020年用户注册量"],
          height: 300
        }
      }

    });

    const register: any = computed(() => {
      let aaa = store.getters['basic/userDefault'].week || {}
      debugger
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.register) || []]
          ]
        },
        options: {
          background: "#e12d6c",
          title: ["一周注册量"],
          height: 300
        }
      }
    });

    // 初始化
    function init() {
      store.dispatch('basic/UserDefault')
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(init)
    return {
      coding,
      user,
      // order,
      hours,
      register,
      handleclick
    }
  }
})
</script>
