<template>
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
        <BasicInfo :data="item" />
        <!-- <v-avatar :data="item" :condition="{tag: item.role !== '0', value: '员'}"></v-avatar>
        <div class="pl5" style="flex: 1; height: 32px; line-height: 32px; display: inline-block;">
          {{item.nickname}}
          <span>
            <i class="iconfont icon-spread" :class="item.active === '1' ? 'cl-5bc0de' : ''" @click="handleClick(item)" />
          </span>
        </div> -->
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
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore,
} from '@/utils'
import BasicInfo from './basicInfo.vue'
import Detail from './detail.vue'
import {
  BANNED_TYPE,
} from '@/assets/enum'
  const props: any = defineProps({
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
  })
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

    function handleClick(param: any){
      store.dispatch('common/Fetch', {
        api: "activeUser",
        data: {
          uid: param.account
        }
      }).then((res: any) => {
        props.render()
      })
    }
</script>
