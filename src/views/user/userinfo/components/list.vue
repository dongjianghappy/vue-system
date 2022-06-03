<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="用户管理">
      <template v-slot:extraright>
        <v-space>
          <v-search field="uid" placeholder="用户账号查找" :render="render" />
          <v-condition name="用户" field="grade" :enums="[{value: '0', name: '访客'},{value: '1', name: '普通用户'},{value: '2', name: '高级用户'},{value: '3', name: 'VIP用户'},{value: '4', name: '超级VIP'}]" :render="render" />
          <v-condition name="排序" field="sorter" icon="sort" :enums="[{value: 'recommend desc', name: '推送'}]" :render="render" />
        </v-space>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15" style="overflow: inherit;">
    <table width="100%" class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-3">用户</td>
        <td class="col-md-2">会员账号</td>
        <td class="col-md-1">类型</td>
        <td class="col-md-1">在线/天</td>
        <td class="col-md-2">注册日期</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td style="display: flex">
          <div class="relative" style=" width: 32px; height: 32px; border-radius: 50%; overflow: hidden; display: inline-block;">
            <img :src="item.photos" class="mr10" style="width: 32px; height: 32px;">
            <span class="absolute font12 cl-red" style="background: #fff; right: 0; bottom: 0px" v-if="item.role !== '0'">
              员
            </span>
          </div>
          <div class="pl5" style="flex: 1; height: 32px; line-height: 32px; display: inline-block;">
            {{item.nickname}}
          </div>
        </td>
        <td>
          {{item.account}}
        </td>
        <td>{{gradeEnum[item.grade]}}</td>
        <td>{{item.online}}</td>
        <td>{{item.register_time}}</td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{uid: item.account, coding: 'P0005' }" :render="render" />
            </span>
            <span><a :href="`/admin/personal?uid=${item.account}`" target="_brank">查看</a></span>
            <Popover content="更多" arrow="tb" offset="right" :move="-650" :keys="`static_${index}`">
              <div class="font14" style="width: 650px">
                <table width="100%" class="table-striped table-hover">
                  <tr>
                    <td class="col-md-1">用户类型</td>
                    <td class="col-md-1">用户状态</td>
                    <td class="col-md-1">生日</td>
                    <td class="col-md-1">所在地</td>
                    <td class="col-md-1">邮箱</td>
                    <td class="col-md-1">电话</td>
                  </tr>
                  <tr>
                    <td>{{item.grade}}</td>
                    <td>{{bannedType[item.status]}}<SetBan :data="item" /></td>
                    <td>{{item.year}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.phone}}</td>
                  </tr>
                </table>
              </div>
            </Popover>
            <span>
              <v-confirm icon="mail" :data="{uid: item.account}" :className="item.recommend === '1' ? 'cl-5bc0de' : ''" type="text" api="push" :render="render" operating="push"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    <v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.pages, page: dataList.page ||  1, pagesize: 25}" :sorceData="dataList" :render="render" />
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
import Popover from '@/components/packages/popover/index.vue';
import AddButton from './setGrade.vue'
import SetBan from './setBan.vue'
import Detail from './detail.vue'
import {
  BANNED_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Popover,
    AddButton,
    SetBan
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
    const store = useStore()
    const checkedList: any = ref([])
    const bannedType: any = BANNED_TYPE
    const gradeEnum: any = {
      0: "访客",
      1: "普通用户",
      2: "高级用户",
      3: "VIP用户",
      4: "超级VIP",

    }
    const dataList = computed(() => {
      return store.getters['user/userList']
    });
    return {
      checkedList,
      dataList,
      bannedType,
      gradeEnum
    }
  }
})
</script>
