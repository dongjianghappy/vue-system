<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="用户管理" @onClick="handleShow">
      <template v-slot:extraleft>
        <span @click="handleShow(1)">日期查看</span>
      </template>
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
    <div v-if="view === 0">
      <table class="table-striped table-hover col-left-2">
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
            <v-avatar :data="item" :condition="{tag: item.role !== '0', value: '员'}"></v-avatar>
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
                <Detail action="edit" :data="{uid: item.account, coding: data.coding }" :render="render" />
              </span>
              <v-popover content="更多" arrow="tb" offset="right" :move="-650" :keys="`static_${index}`">
                <div class="font14" style="width: 650px">
                  <table class="table-striped table-hover">
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
                      <td>{{bannedType[item.status]}}</td>
                      <td>{{item.year}}</td>
                      <td>{{item.address}}</td>
                      <td>{{item.email}}</td>
                      <td>{{item.phone}}</td>
                    </tr>
                  </table>
                </div>
              </v-popover>
              <span>
                <v-confirm icon="mail" :data="{uid: item.account}" :className="item.recommend === '1' ? 'cl-5bc0de' : ''" type="text" api="push" :render="render" operating="push"></v-confirm>
              </span>
            </v-space>
          </td>
        </tr>
      </table>
      <v-nodata :data="dataList.list" />
      <div class="mt15 align_right">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />
      </div>
    </div>
    <v-calendar @changeMonth="changeMonth" :style="{height: '145px'}" v-else>
      <template v-slot:default="row">
        <template v-for="(item, index) in calendarData" :key="index">
          <div style="display: flex; flex-wrap:wrap; position: absolute; width: 100%; bottom: 0px; top: 25px; padding: 10px" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">
            <div class="col-md-4" style="height: 32px;" v-for="(list, i) in item.list.slice(0, 5)" :key="i"><img :title="`${list.nickname}(${list.account})`" :src="list.photos" style="border-radius: 50px; width: 32px; height: 32px;"></div>
            <div class="col-md-4" style=" height: 32px; line-height: 32px; display: inline-block;">
              <div style="background: #ddd; border-radius: 50px; width: 32px; height: 32px;" v-if="item.list.length > 5">{{item.num}}</div>
            </div>
          </div>
        </template>
      </template>
    </v-calendar>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
} from '@/utils'
import Detail from './detail.vue'
import {
  BANNED_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'HomeViewdd',
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
      0: "普通用户",
      1: "普通会员",
      2: "高级会员",
      3: "VIP会员",
      4: "超级VIP"
    }
    const dataList = computed(() => {
      return store.getters['user/userList']
    });
    const view: any = ref(0)
    const calendarData: any = ref([])

    function init(param: any) {
      store.dispatch('common/Fetch', {
        api: "Calendar",
        data: {
          ...param
        }
      }).then((res: any) => {
        calendarData.value = res.result
      })
    }

    function handleShow(data: any) {
      view.value = data
      if (data === 1) {
        let date: any = new Date()
        init({
          year: date.getFullYear(),
          month: date.getMonth() + 1
        })
      }
    }

    function changeMonth(data: any) {
      init({
        year: data.fullYear,
        month: data.month
      })
    }

    return {
      checkedList,
      dataList,
      calendarData,
      bannedType,
      gradeEnum,
      view,
      handleShow,
      changeMonth
    }
  }
})
</script>
