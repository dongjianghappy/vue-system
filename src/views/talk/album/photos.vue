<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="头像背景">
      <template v-slot:extraright>
        <v-search field="content" placeholder="用户账号查询" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <v-tabs :tabs="tabsTalkAlbum" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <List kind="photos" />

      </template>
      <template v-slot:content2>
        <List kind="head_background" />

      </template>
      <template v-slot:content3>
        <List kind="home_background" />
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore
} from '@/utils'
import {
  tabsTalkAlbum
} from '@/assets/const'
import List from './components/list.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['talk/collect']);
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])
    const albumList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'talkAlbum',
        data: {
          uid: "110506372"
        }
      }).then((res: any) => {
        albumList.value = res.result
      })
    }

    onMounted(init)
</script>
