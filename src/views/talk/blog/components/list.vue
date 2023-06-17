<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">博客名称</td>
        <td class="col-md-5">博客地址</td>
        <td class="col-md-1">访问</td>
        <td class="col-md-2">加入时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.nickname}}
        </td>
        <td>
          {{item.url}}
        </td>
        <td>
          {{item.visit}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', ...data }" :auth="true" />
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
  useStore
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
    dataList: {
      type: Function,
      default: () => {
        return
      }
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
  }
})
</script>
