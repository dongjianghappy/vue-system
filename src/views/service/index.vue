<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="联系信息">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <v-basicinfo v-model:dataList="dataList.baisc" :edit="edit" title="基本信息" />
    <v-basicinfo v-model:dataList="dataList.custom" :edit="edit" title="自定义管理" :isDelete="true" :render="init" :data="{coding: coding}" :auth="true" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from '../basic/components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {Detail},
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
    const coding = codings.service.contact
    const dataList = computed(() => {
      const list = store.getters['website/contact']
      const baisc = list.filter(
        (item: any) => item.isdelete === '1' && item.name !== 'logo'
      )
      const logo = list.filter(
        (item: any) => item.isdelete === '1' && item.name === 'logo'
      )
      const custom = list.filter((item: any) => item.isdelete === '0')
      return {
        baisc,
        logo,
        custom
      }
    });

    function init() {
      store.dispatch('website/BasicContact', {
        coding
      })
    }

    function edit(param: any) {
      let data: any = {}
      param.map((item: any) => {
        data[item.name] = item.value
      })
      debugger
      store.dispatch('common/Fetch', {
        api: "updateInfo",
        data: {
          coding,
          ...data
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      edit,
      init
    }
  }
})
</script>
