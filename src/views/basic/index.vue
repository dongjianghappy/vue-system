<template>
<div class="module-wrap">
  <!-- <div class="module-head">
    <v-optionsbar title="站点信息">
      <template v-slot:extraright v-if="auth.checked('add')">
        <v-space>
          <Detail :data="{ coding: coding.config }" :render="init" />
          <v-setting :data="{channel_id: 0, coding: coding.channel_config}" :auth="auth.checked('display')" />
        </v-space>
      </template>
    </v-optionsbar>
  </div> -->
  <div class="module-content plr15">
    <v-tabs :tabs="website" :isEmit="true">
      <template v-slot:extra v-if="auth.checked('add')">
        <v-space>
          <Detail :data="{ coding: coding.config }" :render="init" />
          <v-setting :data="{website, coding: coding.channel_config}" />
        </v-space>
      </template>
      <template v-slot:content1>
        <List :data="{id: website[0] && website[0].value}" />
      </template>
      <template v-slot:content2>
        <List :data="{id: website[0] && website[1].value}" />
      </template>
      <template v-slot:content3>
        <List :data="{id: website[0] && website[2].value}" />
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  codings,
  ref
} from '@/utils'
import Detail from './components/detail.vue'
import List from './list.vue'
export default defineComponent({
  name: 'Baisc',
  components: {
    List,
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings;
    const store = useStore();
    const website: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: 'U0520007'
        }
      }).then((res: any) => {
        website.value = []
        res.result.reverse();
        res.result.map((item: any) => {
          if(item.domain === 'localhost'){
            return
          }
          website.value.push({
            name: item.name,
            value: item.id
          })
        })
      })
    }


    onMounted(init)

    return {
      coding,
      init,
      website,
      auth: proxy.$auth.init('basic')
    }
  }
})
</script>
