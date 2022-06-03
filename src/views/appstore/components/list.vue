<template>
<div style="background: #f9f9f9; padding: 5px;">
  <v-card :title="item.name" v-for="(item, index) in dataList" :key="index">
    <template v-slot:extra>
      <v-space>
        <v-switch :data="{ item, field: 'status', ...data }" :auth="auth.checked('edit')" /> 
        <Detail action='edit' :data="{ id: item.id, ...data }" :render="render" :auth="auth.checked('edit')" /> 
        <Popover content="更多" arrow="tb" offset="right" :move="-90" :keys="`popover-${item.id}`" v-if="auth.checked('del') || auth.checked('grade')" >
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
    <div class="clearfix">
      <div class="col-md-2">
        <img :src="item.image" style="width: 90%; height: 60px;">
      </div>
      <div class="col-md-10">
        <div>
          <div class="col-md-1">描述</div>
          <div class="col-md-11">{{item.description}}</div>
        </div>
        <div>
          <div class="col-md-1">权限</div>
          <div class="col-md-11">{{item.grade}}</div>
        </div>
      </div>
    </div>
  </v-card>
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
