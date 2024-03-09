<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">用户</td>
        <td class="col-md-2">内容</td>
        <td class="col-md-1">收藏</td>
        <td class="col-md-1">转载</td>
        <td class="col-md-1">评论</td>
        <td class="col-md-1">点赞</td>
        <td class="col-md-2">发布时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.nickname}}
        </td>
        <td>
          <span v-html="item.summary"></span>
          <span v-if="item.type === 'img'">
            <v-thumbnail :data="item" :coding="coding.art" icon="img" :hasInfo="false" />
          </span>
          <span v-if="item.type === 'video'">
            <v-thumbnail :data="item" :coding="coding.art" icon="video" type="Video" />
          </span>
        </td>
        <td>{{item.collect}}</td>
        <td>{{item.forwarding}}</td>
        <td>{{item.comment}}</td>
        <td>{{item.praise}}</td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', ...data }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, ...data }" :render="render" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList || []" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
  codings
} from '@/utils'
export default defineComponent({
  name: 'HomeViewdd',
  components: {

  },
  props: {
    data: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const coding = codings.talk
    const dataList = computed(() => {
      return store.getters['talk/talkList1']|| []
    });

    const checkedList: any = ref([])

    return {
      coding,
      dataList,
      checkedList
    }
  }
})
</script>
