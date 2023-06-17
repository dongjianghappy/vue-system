<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="歌曲管理">
      <template v-slot:extraright>
        <span>
          <v-popover content="<i class='iconfont icon-list' />风格" arrow="tb" offset="right" :move="-650" keys="cateList">
            <div class="p15" style="width: 750px; height: 300px;">
              <perfect-scrollbar>
                <div class="item_t" style="min-height: 120px">
                  <div v-for="(item, index) in cateList" :key="index">
                    <div @click="handleCate(item.id)">{{item.name}}</div>
                    <div id="goods-type-list" v-for="(list, i) in item.list" :key="i">
                      <div class="left"><a @click="handleCate(list.id)">{{list.name}}</a> </div>
                      <div class="right">
                        <a class="" v-for="(data, j) in list.list" :key="j" @click="handleCate(data.id)">{{data.name}}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </perfect-scrollbar>
            </div>
          </v-popover>
        </span>
        <v-condition name="语种" icon="web1" field="language" :enums="[{name: '华语', value: 'chinese'}, {name: '粤语', value: 'guangdong'},{name: '欧美', value: 'english'}, {name: '日语', value: 'Japanese'},{name: '韩语', value: 'korea'}, {name: '其他', value: 'other'}]" :render="init" />
        <Detail :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-2">歌曲</td>
        <td class="col-md-1">歌手</td>
        <td class="col-md-1">专辑</td>
        <td class="col-md-1">风格</td>
        <td class="col-md-1">试听</td>
        <td class="col-md-1">时长</td>
        <td class="col-md-1">大小</td>
        <td class="col-md-1">格式</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.title}}
          <span v-if="item.score.image">
            <v-thumbnail :data="item" :coding="coding.score" icon="img" :hasInfo="false" />
          </span>
          <!-- <span v-if="item.lrc_id !== 0">
            <v-thumbnail :data="item" :coding="coding.score" icon="img" :hasInfo="false" />
          </span> -->
        </td>
        <td>
          <ViewSinger :data="item" />
        </td>
        <td>
          <ViewAlbum :data="item" />
        </td>
        <td>
          <v-category title="选择风格" :name="item.parent ? item.parent : '选择风格'" :data="{item, coding}" :isUpdate="true" :isMore="true" type="text"></v-category>
        </td>
        <td><v-audio :data="{...item, index, number: dataList.list.length}" /></td>
        <td> {{durationTrans(item.duration)}}</td>
        <td> {{`${(item.size / 1024 / 1024).toFixed(2)}MB`}}</td>
        <td> {{item.format}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.art}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: coding.art }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="init" :auth="auth" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  channels,
  durationTrans,
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
import ViewAlbum from './components/viewAlbum.vue'
import ViewSinger from './components/viewSinger.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    ViewAlbum,
    ViewSinger
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['channel/musicList']);
    const coding: any = channels().coding;
    const checkedList: any = ref([])
    const cateList: any = ref([])

    function init(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)
      store.dispatch('channel/musicListAction', {
        data: {
          coding: coding.art,
          kind: 'music',
          ...params
        }
      })
    }

    function getCate() {
      store.dispatch('channel/cateListAction', {
        module: 'music',
        data: {
          coding: coding.cate
        }
      }).then(res => {
        cateList.value = res.result
      })
    }
    function handleCate(param: any) {
      init({
        fid: `|${param}|`,
      })
    }

    onMounted(()=>{
       getCate()
       init()
    })

    return {
      coding,
      dataList,
      checkedList,
      cateList,
      init,
      durationTrans,
      handleCate
    }
  }
})
</script>
