<template>
<div class="module-wrap">
  <div class="module-content plr15">
    <v-tabs :tabs='[{
        name: "频道特权"
      },
      {
        name: "应用特权"
      },
      {
        name: "功能特权"
      }
    ]' method="click">
      <template v-slot:extra>
        <Detail :data="{ coding }" :render="init" :auth="true" />
      </template>

      <template v-slot:content1>
        <List index="1" />
      </template>
      <template v-slot:content2>
        <List index="2" />
      </template>
      <template v-slot:content3>
        <List index="3" />
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
  ref,
  useStore,
  codings
} from '@/utils'
import List from './components/list.vue'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    List,
    Detail
  },
  setup(props, context) {
    const coding: any = codings.user.privilege;

    return {
      coding
    }
  }
})
</script>
