<template>
<v-button v-model:show="isShow" :disabled="true">
  {{name}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${name}`" :style="{width: '450'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div class="bg-eee p15">
      <div class="mb25 clearfix">
        <div class="col-md-4">
          <v-statisticcard name="累计IP" :value="statistics.total_ip || 0" />
        </div>
        <div class="col-md-4">
          <v-statisticcard
            name="昨日IP"
            :value="(statistics.yesterday && statistics.yesterday.ip) || 0"
          />
        </div>
        <div class="col-md-4">
          <v-statisticcard
            name="今日IP"
            :value="(statistics.today && statistics.today.ip) || 0"
          />
        </div>
      </div>
      <div class="mb25 clearfix">
        <div class="col-md-4">
          <v-statisticcard name="累计览量" :value="statistics.total_visit || 0" />
        </div>
        <div class="col-md-4">
          <v-statisticcard
            name="昨日览量"
            :value="(statistics.yesterday && statistics.yesterday.pv) || 0"
          />
        </div>
        <div class="col-md-4">
          <v-statisticcard
            name="今日览量"
            :value="(statistics.today && statistics.today.pv) || 0"
          />
        </div>
      </div>

      <div class="bg-white mb25 p15" v-if="engine.length > 0">
        <div v-for="(item, index) in engine" :key="index" class="mb10">
          {{item.name}}: {{item.num}}
        </div>
      </div>
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
} from '@/utils'


  const props: any = defineProps({
    name: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const isShow: any = ref(false)
    const statistics: any = ref({})
    const engine: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'WebsiteStatistics',
        data: {
          website: props.data.website
        }
      }).then(res => {
        statistics.value = res.result.statistics
        engine.value = res.result.engine
      })
    }
</script>
