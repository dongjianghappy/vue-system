<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsTalkTheme" :className="{'con': 'tabs-content'}" type="vertical">
    <template v-slot:content1>
      <Theme :render="init" :data="{coding: coding.theme}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <Effects :render="init" :data="{coding: coding.effects}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content3>
      <Background :render="init" :data="{coding: coding.theme_background}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content4>
      <AvatarPendant :render="init" :data="{coding: coding.avatar_pendant}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content5>
      <Pendant :render="init" :data="{coding: coding.pendant}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content6>
      <MouseEffects :render="init" :data="{coding: coding.mouse_effects}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content7>
      <Cursor :render="init" :data="{coding: coding.cursor}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content8>
      <RelatedBackground :render="init" :data="{coding: coding.related_background}" :type='tabsIndex' :dataList="dataList" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  useRoute,
  useStore,
  codings
} from '@/utils'
import {
  tabsTalkTheme
} from '@/assets/const'
import Theme from './theme/index.vue'
import Effects from './effects/index.vue'
import Background from './background/index.vue'
import AvatarPendant from './avatarPendant/index.vue'
import Pendant from './pendant/index.vue'
import MouseEffects from './mouseEffects/index.vue'
import Cursor from './cursor/index.vue'
import RelatedBackground from './related_background/index.vue'

export default defineComponent({
  name: 'IndexView',
  components: {
    Theme,
    Effects,
    Background,
    AvatarPendant,
    Pendant,
    MouseEffects,
    Cursor,
    RelatedBackground
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings.user
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/talk/theme') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init(param: any = {}) {
      debugger
      let code = coding.theme
      if (tabsIndex.value === '1') {
        code = coding.effects
      } else if (tabsIndex.value === '2') {
        code = coding.theme_background
      } else if (tabsIndex.value === '3') {
        code = coding.avatar_pendant
      } else if (tabsIndex.value === '4') {
        code = coding.pendant
      } else if (tabsIndex.value === '5') {
        code = coding.mouse_effects
      } else if (tabsIndex.value === '6') {
        code = coding.cursor
      } else if (tabsIndex.value === '7') {
        code = coding.related_background
      }

      

      store.dispatch('common/Fetch', {
        api: 'theme',
        data: {
          coding: code,
          ...param
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      tabsTalkTheme,
      coding,
      tabsIndex,
      init,
      dataList
    }
  }
})
</script>

<style lang="less">
.tabs-content {
  background: none !important;
}
</style>
