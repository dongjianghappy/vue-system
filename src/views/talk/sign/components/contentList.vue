<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="内容句子">
      <template v-slot:extraright>
        <Detail action='add' :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-10">内容</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :index="index">
        <td>
          {{item.content}}
        </td>
        <td>
          <v-space>
            <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  ref,
  codings
} from '@/utils'
import Detail from './detail.vue'
export default defineComponent({
  name: 'ListView',
  components: {
    Detail
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
  },
  setup(props, context) {
    const param = {
      name: "",
      url: "",
      apply_checked: 1
    }

    const store = useStore();
    const coding = codings.sign_sentence
    const dataList: any = ref([])

    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      dataList,
      coding,
      init,
      param,
      defaultTheme
    }
  }
})
</script>
