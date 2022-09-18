<template>
<div>
  <div v-for="(item, index) in dataList" :key="index" class="mb5" style="border: 1px solid #eee; bacoground: #f8f8fa">
  <v-collapse :title="item.name" :iscollapse="true" :disableClick="true">
      <template v-slot:extra>
      <v-space>
        <v-switch :data="{ item, field: 'status', ...data }" :auth="auth.checked('edit')" /> 
        <Detail action='edit' :data="{ id: item.id, ...data }" :render="render" :auth="auth.checked('edit')" /> 
        <Popover content="更多" arrow="tb" offset="right" :move="-40" :keys="`popover-${item.id}`" v-if="auth.checked('del') || auth.checked('grade')" >
          <div class="p15 align_center" style="width: 80px; height: 100px">
            <ul class="font14" style="display: block">
              <li style="height: 32px">
                <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
              </li>
              <li style="height: 32px">
                <Buttondetail :data="{id: item.id}" :action="edit" :auth="auth.checked('grade')" />
              </li>
            </ul>
          </div>
        </Popover>
      </v-space>
    </template>
    <div style="display: flex">
      <div class="mr15" style="width: 200px; height: 80px">
        <img :src="item.image" style="width: 100%; height: 80px;">
      </div>
      <div style="flex: 1">
        <div>
          <sapn class="mr5">描述:</sapn>
          {{item.description}}
        </div>
        <div>
          <sapn class="mr5">权限:</sapn>
          {{item.grade}}
        </div>
      </div>
    </div>
    </v-collapse>
    </div>
  <v-nodata :data="dataList || []" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore
} from '@/utils'
import Detail from './detail.vue'
import Buttondetail from './buttondetail.vue'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Buttondetail,
    Popover
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: 0
    },
    tabsIndex: {
      type: String,
      default: 0
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => {
      return store.getters['setting/appstore'][`appstore${parseInt(props.tabsIndex)+1}`]
    });
    const param = {
      name: "",
      url: "",
      apply_checked: 1
    }
    const checkedList: any = ref([])

    return {
      dataList,
      checkedList,
      param
    }
  }
})
</script>

<style lang="less">
.collapse{
  background: #ddd;
  .collapse-head{
    background: #f8f8fa;
  }
  .collapse-list{
    background: #fff;
  }
}
</style>