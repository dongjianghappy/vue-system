<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="项目信息 * 进行中">
      <template v-slot:extraright>
        <Detail action="edit" :data="{ id: detail.id, coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr50">
    <div class="item-wrap">
      <div class="item-list">
        <div class="label">项目名称：</div>
        <div class="content">{{detail.name}}</div>
      </div>
      <div class="item-list">
        <div class="label">话题：</div>
        <div class="content">{{detail.talk_name}}</div>
      </div>      
      <div class="item-list">
        <div class="label">有效时间：</div>
        <div class="content">{{detail.start_time}} 至 {{detail.last_time}}</div>
      </div>
      <div class="item-list">
        <div class="label">投票权限：</div>
        <div class="content">{{detail.grade}}</div>
      </div>
      <div class="item-list">
        <div class="label">投票说明</div>
        <div class="content">{{detail.content}}</div>
      </div>
      <div class="item-list">
        <div class="label">投票人数：</div>
        <div class="content">{{detail.votenum}}</div>
      </div>
    </div>
    <div class="item-wrap">
      <div class="item-list">
        <div class="label">标题</div>
        <div class="content">{{detail.votetitle}}</div>
      </div>
      <div class="item-list">
        <div class="label">投票种类</div>
        <div class="content">{{detail.choose}}</div>
      </div>
      <div class="item-list">
        <div class="label">票数</div>
        <div class="content">{{detail.vote}}票 (每人)</div>
      </div>
      <div class="item-list" v-for="(item, i) in detail.list" :key="i">
        <div class="label">{{item.votetitle}}</div>
        <div class="content">
          <v-progress :data="item" />
        </div>
        <div class="right">{{item.vote}}票</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useStore,
  useRoute
} from '@/utils'
import Detail from '../components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([])
    const detail: any = ref({})
    const route = useRoute();

    function init() {
      store.dispatch('common/Fetch', {
        api: "selectVoteList",
        data: {
          id: route.query.id,
        }
      }).then(res => {
        detail.value = res.result
      })
    }

    onMounted(init)

    return {
      dataList,
      detail,
      init
    }
  }
})
</script>
