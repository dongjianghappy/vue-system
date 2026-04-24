<template>
<span @click="handleChoose" class="pointer">
  {{title}}
</span>
<v-drawer ref="drawer" v-model:show="isShow" action="add" :title="title" :style="{width: 350}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div>
      <div class="talk-search">
        <div class="search-box">
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="搜索用户" class="w-full" v-model="content" @input.enter="handleSearch">
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in dataList.list" :key="index" class="ptb10 flex" @click="handleClick(item)">
          <div class="nowrap" style="flex: 1">
            <v-avatar :data="item" />{{item.nickname}}
          </div>
          <div class="w80"><i class="iconfont icon-dagou" :class="{'cl-green': currentUser.account == item.account}" /></div>
        </li>
      </ul>
    </div>
    <div class="mt25 align_center" v-if="dataList.total > 10">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'

const props: any = defineProps({
  title: {
    type: String,
    default: "请选择"
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit: any = defineEmits(['chooseUser'])
const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const isShow: any = ref(false)
const drawer: any = ref(null)
const currentUser: any = ref({})
const content: any = ref("")
const dataList: any = ref([])

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    init()
  }
})

//初始页面
function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 10
  }

  Object.assign(params, param)

  store.dispatch('common/Fetch', {
    api: 'chooseUser',
    data: {
      ...params
    }
  }).then(res => {
    dataList.value = res.result || {}
  })
}

function handleSearch(){
  init({
    nickname: content.value
  })
}

// 按钮点击
function handleChoose() {
  isShow.value = true
}

function handleClick(param: any) {
  currentUser.value = param
  emit('chooseUser', {
    data: param
  })
}
</script>

<style lang="less" scoped>
.talk-search {
  display: flex;
  margin-bottom: 25px;
  .search-box {
    display: flex;
    flex: 1;
    background: var(--input-background);
    border-radius: 50px;
    height: 34px;
    padding: 0 10px;

    i {
      margin: 0;
      margin-right: 5px;
      padding-top: 7px;
      width: 25px;
      font-size: 22px;
    }

    input {
      background: none;
      max-width: 100%;
      border: 0;
      border-radius: 0;
      padding: 0;
      font-size: 14px;
    }
  }

  .search-button {
    width: 50px;
    line-height: 34px;
    text-align: center;
  }
}

.search-wrap {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--module-background);
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  width: 100%;
  height: auto;

  .label {
    .word {
      display: inline-block;
      border-radius: 4px;
      line-height: 16px;
      height: 25px;
      padding: 5px 10px;
      background: var(--label-background);
      margin-right: 10px;
      margin-bottom: 10px;
      color: #999;

      &:hover {
        background: var(--link-hover-background);
      }
    }
  }
}
</style>