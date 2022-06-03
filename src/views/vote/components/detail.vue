<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'add' : 'edit'}`" />{{action === 'edit'? '修改项目信息': '创建投票'}}
</v-button>
<Drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '修改项目信息' : '创建投票' " api="selectVoteList" :submit="submit" :submitApi="{insert: 'createVote', update: 'updateVote'}" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <div class="alert-description ptb10 plr15">
      投票设置后，必须插入图文消息中才可生效。投票将统计该投票在各个渠道的综合结果总和，包括群发消息，自动回复，自定义菜单等。
    </div>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">投票名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入投票名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">话题绑定</span>
        <input v-model="detail.talk_id" type="text" placeholder="请输入话题绑定" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">截止时间</span>
        <input v-model="detail.start_time" type="text" placeholder="开始时间" class="input-sm input-150" />
        至
        <input v-model="detail.last_time" type="text" placeholder="结束时间" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">投票对象</span>
        <v-radio label="所有人都可参与" name="grade" value="1" v-model:checked="detail.grade" />
        <v-radio label="仅关注我的人可参与" name="grade" value="0" v-model:checked="detail.grade" />
      </li>
      <li class="li">
        <span class="label">投票说明</span>
        <textarea placeholder="请输入投票说明" v-model="detail.content" class="w-full"></textarea>
      </li>
    </ul>
    <h2 class="font18">选项管理</h2>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">标题</span>
        <input v-model="detail.votetitle" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">投票种类</span>
        <v-radio label="单投" name="choose" value="1" v-model:checked="detail.choose" />
        <v-radio label="多投" name="choose" value="0" v-model:checked="detail.choose" />
      </li>
      <li class="li" style="background: #eee">
        <span>选项列表</span>
        <span class="ml25" @click="clickAdd"><i class="iconfont icon-add" style="font-size: 18px !important"></i></span>
      </li>
      <li class="li" style="background: #eee">
        <span class="label"></span>
        <div class="mb5 clearfix" v-for="(item, index) in List" :key="index">
          <div class="col-md-1" style="line-height: 38px;">选项{{index+1}}</div>
          <div class="col-md-11">
            <div style="display: flex;">
              <div style="background: rgb(255, 255, 255); margin-right: 5px; border: 1px solid rgb(217, 217, 217); width: 40px; height: 40px;"></div>
              <div style="flex: 1 1 0%;"><input placeholder="请输入选项名称" type="text" class="ant-input" v-model="item.votetitle" style="width: 90%; height: 40px;">
                <span style="margin-left: 10px;">
                  <i class="iconfont icon-recycle" @click="clickRemove(index)"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  LINK_TYPE,
} from '@/assets/enum'
import {
  Drawer
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer
  },
  props: {
    action: {
      type: String,
      default: "add"
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
    const store = useStore();
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const sourceType: any = LINK_TYPE
    const List: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        let result = await drawer.value.init()
        detail.value = result
        List.value = result.list || []
      }
    })

    function clickAdd() {
      List.value.push({
        image: '',
        sort: '',
        static: '',
        status: '',
        vote: '',
        votetitle: '',
      })
    }

    function clickRemove(index: any) {
      List.value.splice(index, 1)
    }

    // 确认按钮
    function submit(params: any) {
      const {
        id,
        name,
        talk_id,
        start_time,
        last_time,
        grade,
        content,
        votetitle,
        choose,
      } = detail.value

      let listData: any = []
      List.value.map((item: any) => {
        listData.push({
          id: item.id,
          votetitle: item.votetitle
        })
      })

      const param: any = {
        name,
        talk_id,
        start_time,
        last_time,
        grade,
        content,
        votetitle,
        choose,
        list: JSON.stringify(listData)
      }
      if (props.action === "edit") {
        param.id = id
      }
      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'updateVote' : "createVote",
        data: {
          ...param
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
        props.render()
        params.cancel()
      })
    }

    return {
      isShow,
      List,
      detail,
      drawer,
      sourceType,
      clickAdd,
      clickRemove,
      submit
    }
  }
})
</script>
