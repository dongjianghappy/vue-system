<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="密保问题">
     
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-2">
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td class="col-md-1">
          问题{{index+1}}
        </td>
        <td class="col-md-10">
          {{item.quetion}}
        </td>
        <td class="col-md-1">
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
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
import Detail from './components/detail.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = proxy.$coding['user'].security;
    const checkedList: any = ref([])

    function init() {
     store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      })
    }

    onMounted(init)
</script>
