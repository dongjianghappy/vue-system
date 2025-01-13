<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="贡献">
      <template v-slot:extraright>
        <v-space>
          <v-search field="uid" placeholder="用户账号查找" :render="init" />
          <v-condition name="年份" :defaultValue="{value: '2025', name: '2025'}" icon="sort" field="year" :enums="yaerList" :render="init" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="pl10">
      <span class="mr5">Less</span>
      <span class="inline mr5 calendar-graph-day"></span>
      <span class="inline mr5 calendar-graph-day calendar-graph-day-1"></span>
      <span class="inline mr5 calendar-graph-day calendar-graph-day-2"></span>
      <span class="inline mr5 calendar-graph-day calendar-graph-day-3"></span>
      <span class="inline mr5 calendar-graph-day calendar-graph-day-4"></span>
      <span>More</span>
    </div>
    <div class="col-md-4 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p15" style=" background: var(--card-background); border-radius: 8px;">
        <div class="ptb10 font6">
          <div class="mb15 align_center">{{item.month}}月</div>
          <div>
            <template v-for="(list, i) in item.list" :key="i">
              <div class="inline mt5 ml5">
                <v-tooltip :content="`${list.date} ${list.num}条`" arrow="top" offset="right" :move="-45" :keys="`popover-img$-${index}`" type="hover">
                  <div class="inline calendar-graph-day" :class="bg(list.num)">
                  </div>
                </v-tooltip>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings
} from '@/utils'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = ref([]);
    const coding: any = codings.partner;
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('partner')

    const yaerList = [
      {
        value: '2024',
        name: '2024'
      }, 
      {
        value: '2023',
        name: '2023'
      }, 
      {
        value: '2022',
        name: '2022'
      }, {
        value: '2021',
        name: '2021'
      }, {
        value: '2020',
        name: '2020'
      }
    ]

    function init(param: any = "") {
      let date: any = new Date()

      const params: any = {
        year: date.getFullYear()
      }

      Object.assign(params, param)

      store.dispatch(`common/Fetch`, {
        api: "contribution",
        data: {
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    const bg = ((num: any) => {

      if (num == 1) {
        return "calendar-graph-day-1"
      } else if (num == 2) {
        return "calendar-graph-day-2"
      } else if (num == 3) {
        return "calendar-graph-day-3"
      } else if (num > 4) {
        return "calendar-graph-day-4"
      }
    })

    onMounted(() => {
      init()
    })
</script>
