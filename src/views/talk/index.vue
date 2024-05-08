<template>
<div class="mb10 col-md-10" style="overflow: auto;">
  <div class="mb10" style="overflow: auto;">
    <div class="col-md-3" style="padding-right: 8px;">
      <div>
        <v-statisticcard name="用户量" :value="user.total || 0" />
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
      <div class="col-md-6">
        <v-statisticcard name="今日登录" :value="user.total || 0" />
      </div>
      <div class="col-md-6">
        <v-statisticcard name="当前在线" :value="user.today || 0" />
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
      <v-statisticcard name="普通会员" value="2,836" />
    </div>
    <div class="col-md-3" style="padding-left: 8px;">
      <v-statisticcard name="高级会员" value="2,836" />
    </div>
  </div>
  <div class="mb10" style="overflow: auto;">
    <div class="col-md-9" style=" padding-right: 8px;">
      <div class="module-wrap">
        <div class="module-content plr15" style="height: 370px">
          <ChartLine :chartData="hours.data" :chartOptions="hours.options" />
        </div>
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px;">
      <div class="module-wrap">
        <div class="module-content plr15" style="height: 370px">
          <ChartLine :chartData="register.data" :chartOptions="register.options" />
        </div>
      </div>
    </div>
  </div>
</div>
<div class="col-md-2" style="overflow: auto;">

  <div style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        设置
        <v-switch :data="{ item: {}, field: 'status', coding: 'O0000' }" className="right" :auth="auth" />
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ul class="form-wrap-box">
          <li class="li mb10"><span class="label">模块展示</span>
            <span class="right">
              <v-authority name="设置" title="权限管理" type="manage" :data="{coding: coding.talk.config}" :auth="true" />
            </span>
          </li>
          <li class="li mb10"><span class="label">用户设置</span>
            <span class="right">
              <UserSetting :auth="true" :data="{coding: coding.user}" />
            </span>
          </li>
          <li class="li mb10"><span class="label">查询设置</span>
            <span class="right">
              <HighQualityUser :auth="true" :data="{coding: coding.user}" />
            </span>
          </li>
        </ul>
      </div>
    </div>

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
  useStore,
  codings
} from '@/utils'
import {
  ChartLine
} from '@/components/packages/chart/index'
import UserSetting from '@/components/packages/setting/userSetting1.vue'
import HighQualityUser from '@/components/packages/setting/highQualityUser.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChartLine,
    UserSetting,
    HighQualityUser
  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const coding = codings
    const user: any = computed(() => store.getters['basic/userDefault'].user || {});
    const hours: any = computed(() => {
      let aaa = store.getters['basic/userDefault'].year || {}
      return {
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          series: [
            [...(aaa.register) || []],
          ]
        },
        options: {
          title: ["2020年用户注册量"],
          height: 300
        }
      }

    });

    const register: any = computed(() => {
      let aaa = store.getters['basic/userDefault'].week || {}
      debugger
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.register) || []]
          ]
        },
        options: {
          background: "#e12d6c",
          title: ["一周注册量"],
          height: 300
        }
      }
    });

    // 初始化
    function init() {
      store.dispatch('basic/UserDefault')
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(init)
    return {
      coding,
      user,
      // order,
      hours,
      register,
      handleclick
    }
  }
})
</script>
