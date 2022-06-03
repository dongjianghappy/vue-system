<template>
<div class="mb30" style="display: flex">
  <div style="flex: 1" class="bg-white mr10 pl25">
    <div class="module-wrap mr10">
      <div class="module-head">
        <v-optionsbar title="页面权限设置">
          <template v-slot:extraright>
          </template>
        </v-optionsbar>
      </div>
      
      <div class="module-content plr15">
        <v-tree :dataList="pageList" :checkedList="checkedKeys" />
        <v-nodata :data="pageList" />
      </div>
    </div>
  </div>
  <div style="flex: 1" class="bg-white pl25">
    <div class="module-wrap">
      <div class="module-head">
        <v-optionsbar title="按钮权限设置">
          <template v-slot:extraright>
          </template>
        </v-optionsbar>
      </div>
      <div class="module-content plr15">
        <v-tree :dataList="buttonList" :checkedList="checkedKeys" />
        <v-nodata :data="buttonList" />
      </div>
    </div>
  </div>
</div>
<div class="fixed p15 ml25" style="background: rgb(255, 255, 255); border-top: 2px solid #f0f2f5; margin-right: 42px !important; display: flex; justify-content: flex-end; left: 200px; right: 0px; bottom: 0px; width: auto;">
  <button type="button" class="btn btn-default" @click="handelClick">保 存</button>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  codings,
  ref,
  useStore,
  useRoute,
  
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdd',
  components: {},
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute()
    const dataList: any = ref([]);
    const pageList: any = ref([])
    const buttonList: any = ref([])
    const checkedKeys: any = ref([])
    const {
      role: coding
    }: any = codings['user'];

    function loop(data: any, type: any, nodeKey: any) {
      return data.map((item: any) => {
        let title = "标题"

        if (item.type === '0') {
          title = item.title + '<span style="background: rgb(168, 207, 239); color: rgb(255, 255, 255); font-size: 12px; padding: 2px 5px; border-radius: 3px; margin-left: 10px; border: 1px solid rgb(64, 169, 255);">页面</span>'
        } else {
          title = item.title + '<span style="background: rgb(182, 219, 148); color: rgb(255, 255, 255); font-size: 12px; padding: 2px 5px; border-radius: 3px; margin-left: 10px; border: 1px solid rgb(36, 209, 45);">按钮</span>'
        }

        let isAbled = true
        let checkable = true
        if (type === 2) {
          if (item.type === '0') {
            isAbled = true
          } else {
            isAbled = false
          }
        }

        if (item.children) {
          return {
            checkable: checkable,
            disabled: type === 1 ? false : isAbled,
            title,
            key: item.key,
            children: loop(item.children, type, item.key),
          }
        }

        return {
          checkable: checkable,
          disabled: type === 1 ? false : isAbled,
          title,
          key: item.key,
        }
      })
    }

    function init() {
      store.dispatch('common/Fetch', {
        api: "rolegrade",
        data: {
          type: 0,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        pageList.value = loop(res.result.list, 1, '')

      })
      store.dispatch('common/Fetch', {
        api: "rolegrade",
        data: {
          type: 1,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        buttonList.value = loop(res.result.list, 2, '')

      })

      store.dispatch('common/Fetch', {
        api: "detail",
        data: {
          coding,
          id: route.query.id,
        }
      }).then(res => {
        checkedKeys.value = res.result.grade.split(',')
      })
    }

    function handelClick() {
      // proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: "update",
        data: {
          coding,
          id: route.query.id,
          grade: checkedKeys.value.join(),
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }
    onMounted(init)

    return {
      pageList,
      buttonList,
      checkedKeys,
      handelClick
    }
  }
})
</script>
