<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '修改项目信息': '创建投票'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '修改项目信息' : '创建投票' " api="selectVoteList" :submit="submit" :submitApi="{insert: 'createVote', update: 'updateVote'}" :data="data" :param="detail" :render="render">
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
        <span class="label">所属分类</span>
        {{detail.parent}}
        <v-category name="选择分类" :data="{item: detail, coding: codings.module.vote.cate}" :isMore="true" type="text"></v-category>
      </li>
      <li class="li">
        <span class="label">话题绑定</span>
        <span class="mr15">{{detail.talk_name}}</span>
        <v-choose title="选择话题" :data="{ item: detail, field: 'talk_id', coding: codings.talk.activity }" v-model:checked="detail.talk_id" @choose="choose" type="radio" />
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
      <li class="li">
        <span class="label">图表类型</span>
        <v-radio label="条形图" name="chart" value="1" v-model:checked="detail.chart" />
        <v-radio label="柱状图" name="chart" value="0" v-model:checked="detail.chart" />
      </li>
      <li class="li" style="background: #f8f8fa">
        <span>选项列表</span>
        <span class="ml25" @click="clickAdd"><i class="iconfont icon-anonymous-iconfont" style="font-size: 18px !important"></i></span>
      </li>
      <li class="li" style="background: #f8f8fa">
        <span class="label"></span>
        <div class="mb5 clearfix" v-for="(item, index) in List" :key="index">
          <div class="col-md-1" style="line-height: 38px;">选项{{index+1}}</div>
          <div class="col-md-11">
            <div style="display: flex;">
              <div style="background: rgb(255, 255, 255); margin-right: 5px; border: 1px solid rgb(217, 217, 217); width: 40px; height: 40px;"></div>
              <div class="mr5 relative" style=" width: 80px; height: 40px;">
                <v-colorpicker @color="(e) => item.color = e.value" :color="item.color" attr="fill" />
                <!-- <input v-model="item.color" type="text" placeholder="颜色" class="input-sm" style="width: 100%; height: 40px;" /> -->
              </div>
              <div style="flex: 1">
                <input placeholder="请输入选项名称" type="text" class="ant-input" v-model="item.votetitle" style="width: 30%; height: 40px;">
                <input placeholder="请输入选项描述" type="text" class="ant-input" v-model="item.description" style="width: 55%; height: 40px;">
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
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore,
  codings
} from '@/utils'
export default defineComponent({
  name: 'v-Detail',
  components: {},
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
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const List: any = ref([])
    const detail: any = ref({})

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
        description: ''
      })
    }

    function clickRemove(index: any) {
      List.value.splice(index, 1)
    }

    function choose(param: any){
      const {field, data} = param
      detail.value.talk_id = data.id
      detail.value.talk_name = data.name
    }

    // 确认按钮
    function submit(params: any) {
      const {
        id,
        fid,
        name,
        talk_id,
        start_time,
        last_time,
        grade,
        content,
        votetitle,
        choose,
        chart,
      } = detail.value

      let listData: any = []
      List.value.map((item: any) => {
        listData.push({
          id: item.id,
          votetitle: item.votetitle,
          color: item.color,
          description: item.description
        })
      })

      const param: any = {
        name,
        fid,
        talk_id,
        start_time,
        last_time,
        grade,
        content,
        votetitle,
        choose,
        chart,
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
        props.render()
        params.message()
      })
    }

    return {
      codings,
      isShow,
      List,
      detail,
      drawer,
      clickAdd,
      clickRemove,
      submit,
      choose
    }
  }
})
</script>
