<template>
<span @click="handleclick">{{data.album}}</span>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" action="add" title="" :width="800" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div class="user-info-wrap">
      <div class="user-info-photos">
        <div class="blogphotos"><img style=" border-radius: 4px;" :src="detail.cover"></div>
        <div class="bloginfo">
          <div class="username mb15 font18">专辑: {{detail.name}}</div>
          <div class="mb15 subinfo"><span class="mr15">歌手: {{detail.singer}}</span><span>发布时间: {{detail.times}}</span></div>
          <div>介绍： {{detail.description}}</div>
        </div>
        <!-- <div class="blogmenu"><a id="sendprivateletter" data-uid="754076" data-nickname="√" data-photos="http://www.yunxi10.com//user/754076/photos/754076.png">私信</a><a class="concern">关注</a></div> -->
      </div>
    </div>
    <div class="mt25">
      <table width="100%" class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-2">歌曲</td>
        <td class="col-md-1">风格</td>
        <td class="col-md-1">试听</td>
        <td class="col-md-1">时长</td>
        <td class="col-md-1">大小</td>
        <td class="col-md-1">格式</td>
      </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>{{item.title}}</td>
          <td>{{item.parent}}</td>
          <td><v-audio :data="{...item, index, number: dataList.list.length}" /></td>
        <td> {{durationTrans(item.duration)}}</td>
        <td> {{`${(item.size / 1024 / 1024).toFixed(2)}MB`}}</td>
        <td> {{item.format}}</td>
        </tr>
    </table>
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
  durationTrans
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  props: {
    name: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: "add"
    },
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
        musicList()
      }
    })

    // 初始化
    function init() {

      store.dispatch('common/Fetch', {
        api: 'viewAlbum',
        data: {
          id: props.data.album_id
        }
      }).then((res: any) => {
        detail.value = res.result
      })
    }

    function musicList(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)
      store.dispatch('channel/musicListAction', {
        isStore: true,
        data: {
          coding: 'E0000',
          kind: 'music',
          album_id: props.data.album_id,
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }


    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      handleclick,
      init,
      detail,
      dataList,
      drawer,
      durationTrans
    }
  }
})
</script>

<style lang="less">
.user-info-wrap {
  background: #fff;
  width: 100%;
  height: 200px;
  font-size: 14px;

  .user-info-photos {
    display: flex;
    width: 100%;
    padding: 25px;
    height: 160px;

    a {
      color: #666;
      cursor: pointer;
    }

    .blogphotos {
      margin: 0 10px 0 0;
      width: 160px;
      height: 160px;

      img {
        border-radius: 50%;
        width: 160px;
        height: 160px;
      }
    }

    .bloginfo {
      flex: 1;
      .subinfo {
        a {
          padding-right: 15px;
          color: #666;
        }
      }
    }

    .blogmenu {
      width: 60px;
      a {
        background: #333;
        border: 1px solid #111;
        padding: 5px 10px;
        color: #ccc;
      }
    }

    .user-info {
      padding: 15px;
      height: 70px;

      .name-box {
        text-align: center;
      }

      .name-atten {
        height: 30px;
      }
    }
  }

  .user-info-art {
    border-bottom: 1px solid #eee;
    padding: 25px;
    height: 150px;

    ul {
      display: flex;

      li {
        flex: 1;
        padding: 5px;
        height: 110px;

        a {
          color: #333;
        }

        text-align: center;

        strong,
        span {
          display: inline-block;
        }
      }
    }

    &:after {
      content: '';
      clear: both;
    }
  }

  .user-introduction {
    padding: 0 25px;
    height: 50px;
    line-height: 50px;
    color: #ccc;
  }
}
</style>
