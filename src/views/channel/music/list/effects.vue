<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="音效素材">
      <template v-slot:extraright>
        <Popover content="<i class='iconfont icon-time' />时长" arrow="tb" offset="right" :move="-250" keys="calendar">
          <div class="align_center" style="width: 300px; height: 150px;">
            <a class="col-md-3 p10" @click="handleDuration(item.value)" v-for="(item, index) in durationList" :key="index">
              <div class="cl">
                {{item.name}}
              </div>
            </a>
          </div>
        </Popover>
        <Detail :coding="coding" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-3">名称</td>
        <td class="col-md-1">分类</td>
        <td class="col-md-1">试听</td>
        <td class="col-md-1">时长</td>
        <td class="col-md-1">大小</td>
        <td class="col-md-1">格式</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.title}}
        </td>
        <td>
          <v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding}" :isUpdate="true" type="text"></v-category>
        </td>
        <td><Audio :data="{...item, index, number: dataList.list.length}" /></td>
        <td> {{durationTrans(item.duration)}}</td>
        <td> {{`${(item.size / 1024 / 1024).toFixed(3)}MB`}}</td>
        <td> {{item.format}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{id: item.id}" :coding="coding" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
            <Popover content="更多" arrow="tb" offset="right" :move="-650" :keys="`static_${index}`">
              <div class="p15 font14" style="width: 700px;">
                <table width="100%" class="table-striped table-hover">
                  <tr>
                    <td class="col-md-1">ID</td>
                    <td class="col-md-2">编号</td>
                    <td class="col-md-1">播放</td>
                    <td class="col-md-1">浏览</td>
                    <td class="col-md-1">评论</td>
                    <td class="col-md-1">点赞</td>
                    <td class="col-md-1">收藏</td>
                    <td class="col-md-1">下载</td>
                    <td class="col-md-1">发布者</td>
                    <td class="col-md-2">操作</td>
                  </tr>
                  <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.play}}</td>
                    <td>{{item.visit}}</td>
                    <td>{{item.comment}}</td>
                    <td>{{item.praise}}</td>
                    <td>{{item.collect}}</td>
                    <td>{{item.download}}</td>
                    <td>{{item.nickname}}</td>
                    <td>
                      <v-space>
                        <a target="_blank">预览</a>
                        <span @click="handleUpdate(item)">生成静态</span>
                      </v-space>
                    </td>
                  </tr>
                </table>

              </div>
            </Popover>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" />
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
  durationTrans
} from '@/utils'
import {
  useStore
} from 'vuex'
import Popover from '@/components/packages/popover/index.vue';
import Detail from './components/detail.vue'
import Audio from '../player/audio.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Popover,
    Detail,
    Audio
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['channel/musicList']);
    const coding: any = channels().coding;
    const checkedList: any = ref([])
    const durationList: any = [{
        value: '',
        name: '所有'
      }, {
        value: '00:00',
        name: '00:00'
      },
      {
        value: '00:01',
        name: '00:01'
      },
      {
        value: '00:02',
        name: '00:02'
      },
      {
        value: '00:03',
        name: '00:03'
      },
      {
        value: '00:04',
        name: '00:04'
      },
      {
        value: '00:05',
        name: '00:05'
      },
      {
        value: '00:06',
        name: '00:06'
      },
      {
        value: '00:07',
        name: '00:07'
      },
      {
        value: '00:08',
        name: '00:08'
      },
      {
        value: '00:09',
        name: '00:09'
      },
      {
        value: '00:10',
        name: '00:10'
      },
      {
        value: '00:11',
        name: '00:11'
      },
      {
        value: '00:12',
        name: '00:12'
      },
      {
        value: '00:13',
        name: '00:13'
      },
      {
        value: '00:14',
        name: '00:14'
      },
      {
        value: '00:15',
        name: '00:15'
      }
    ]

    function init(param: any = {}) {

      const sssss: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(sssss, param)
      store.dispatch('channel/musicListAction', {
        api: "articleList",
        data: {
          coding: coding.art,
          kind: 'effects',
          ...sssss
        }
      })
    }

    function handleDuration(param: any) {
      init({
        time: param,
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init,
      durationTrans,
      durationList,
      handleDuration
    }
  }
})
</script>
