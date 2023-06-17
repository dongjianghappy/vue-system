<template>
<div class="mask" :class="{'fixed': isMove}" v-show="isMove"></div>
<div class="module-wrap" :class="{'z-index': isMove}">
  <div class="module-head">
    <v-optionsbar :title="`${slideshow} - 轮播图`">
      <template v-slot:extraleft>
        <span class="pointer" style="margin-top: 1px;" @click="handleClick">返回</span>
      </template>
      <template v-slot:extraright>
        <v-space>
          <span @click="handleSave" class="pointer"><i class="iconfont icon-mail"></i>保存</span>
          <v-buttonmoves v-model:move="isMove" :auth="true" />
          <Detail :data="{ coding }" :render="init" :auth="auth.checked('add')" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15 font12">
    <div :draggable="isMove" :index="`0_${index}`" v-for="(item, index) in dataList" :key="index" class="mb10" style="background: #f8f8fa;">
      <div class="p10 font14" style="border-bottom: 1px solid #eee; overflow: auto;">
        <div class="col-md-10 bold" style="height: 19px">
          {{item.title}}</div>
        <div class="col-md-2 align_right">
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <v-switch :isbutton="false" :data="{ item, field: 'checked', coding }" :auth="auth.checked('edit')" />
            <!-- <v-buttonmove :data="{dataList, moveItem: item, index}" /> -->
          </v-space>
        </div>
      </div>
      <div class="p10" style=" overflow: auto;">
        <div class="col-md-3">
          <SpaceModal>
            <img :src="item.image" width="265" height="105">
          </SpaceModal>
        </div>
        <div class="col-md-5">
          <div class="imgInfo">
            <div class="label">图片地址</div>
            <div class="content"><input v-model="item.image" type="text" placeholder="请输入图片地址" class="input-sm input-full" /></div>
          </div>
          <div class="imgInfo">
            <div class="label">连接地址</div>
            <div class="content"><input v-model="item.url" type="text" placeholder="请输入连接地址" class="input-sm input-full" /></div>
          </div>
          <div class="imgInfo">
            <div class="label">文字说明</div>
            <div class="content"><input v-model="item.description" type="text" placeholder="请输入文字说明" class="input-sm input-full" /></div>
          </div>
        </div>
        <div class="col-md-3" style="display: flex; justify-content: space-around; height: 105px; line-height: 105px;
    align-items: center;">

        </div>
        <div class="col-md-1">
          <div class="right" style="display: flex; justify-content: space-around; height: 105px; align-items: center; flex-direction: column; width: 60px">
            <!-- <v-buttonmove :data="{dataList: moveItem, item: data, index}" /> -->
          </div>
        </div>
      </div>
    </div>
    <v-nodata :data="dataList || []" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRoute,
  useRouter,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import SpaceModal from '../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    SpaceModal
  },
  props: {},
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    const coding: any = codings['slideshow'].art;
    const slideshow: any = route.query.name
    const dataList: any = ref([])
    const isMove: any = ref(false)

    function init() {
      const {
        fid
      }: any = route.query
      store.dispatch('common/Fetch', {
        api: "slideshowList",
        data: {
          fid
        }
      }).then(res => {
        dataList.value = res.result
        setTimeout(() => {
          proxy.$drag.init((res: any) => {

            const moveIndex = res.moveIndex.substring(2)
            const enterIndex = res.enterIndex.substring(2)

            const list = res.findex !== null ? dataList.value[res.findex].list : dataList.value

            const dragItem = list[moveIndex] // 拖拽列

            const item = list.splice(enterIndex, 1, dragItem)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
            list[moveIndex] = item;
            let form: any = []
            const loop = (data: any) => {
              return data.map((item: any, index: any) => {
                item.sort = 1 + index
                form.push({
                  id: item.id,
                  sort: item.sort,
                })
                if (item.list) {
                  loop(item.list)
                }
              })
            }

            loop(dataList.value)
            store.dispatch('common/Save', {
              data: {
                coding,
                data: JSON.stringify(form),
              }
            })
          })
        }, 3000)
      })
    }

    function handleClick() {
      router.push(`/admin/slideshow`)
    }

    function handleSave() {
      dataList.value.map((item: any, index: any) => item.sort = index + 1)

      store.dispatch('common/Save', {
        data: {
          coding,
          data: JSON.stringify(dataList.value),
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
      })
    }

    onMounted(init)

    return {
      coding,
      slideshow,
      dataList,
      handleClick,
      handleSave,
      isMove,
      init,
      auth: proxy.$auth.init('slideshow/list')
    }
  }
})
</script>

<style lang="less" scoped>
.imgInfo {
  display: flex;
  margin-bottom: 5px;

  &:nth-last-child(1) {
    margin-bottom: 0;
  }

  .label {
    width: 65px;
    line-height: 30px;
    font-size: 14px;
  }

  .content {
    flex: 1
  }
}
</style>
