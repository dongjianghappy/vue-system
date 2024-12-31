<template>
<!-- <span @click="handleclick">{{data.album}}</span> -->
<v-button v-model:show="isShow">
  {{data.album}} asd
</v-button>
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
      <List :data="data" showType="album" />
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  durationTrans,
  useProps
} from '@/utils'
import List from './list.vue'
  const props: any = defineProps(useProps)
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
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
    // function handleclick(param: any) {
    //   isShow.value = !isShow.value
    // }
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
