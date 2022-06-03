<template>
<div class="mb10 col-md-9" style="overflow: auto;">
  <div class="mb10" style="overflow: hidden;">
    <div class="module-wrap">
      <div class="module-head">
        <v-optionsbar title="单页导航">
          <template v-slot:extraleft>
            <span class="pointer" style="margin-top: 1px;" @click="handleClick">返回</span>
          </template>
        </v-optionsbar>
      </div>
      
      <div class="module-content" style="padding: 25px 50px !important;">
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">标题</span>
            <div style="display: flex">
              <div style="flex: 1">
                <input id="title" v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <v-titleattribute :style="detail.style || {}" :setStyle="setStyle" />
            </div>
          </li>
          <li class="li">
            <span class="label">标签</span>
            <v-tag v-model:tags="detail.tag" />
          </li>
          <li class="li">
            <span class="label">摘要</span>
            <textarea placeholder="请输入单页摘要" v-model="detail.description" class="w-full"></textarea>
          </li>
          <li class="li">
            <span class="label">顺序</span>
            <input type="text" v-model="detail.sort" placeholder="请输入顺序" class="input-sm input-150" />
          </li>
          <li class="li">
            <span class="label">显示</span>
            <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
            <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
          </li>
        </ul>
        <div class="edit-article">
          <v-md-editor v-model="detail.content" height="400px"></v-md-editor>
        </div>
        <ul class="form-wrap-box mt15">
          <li class="li">
            <span class="label">聚会标签</span>
            <v-checkboxgroup :tagList="aaa" />
          </li>
        </ul>
        <div class="mt20">
          <button class="btn btn-default" @click="save">保存</button>
        </div>
      </div>

    </div>
  </div>
</div>
<div class="col-md-3" style="overflow: auto;">
  <div style="padding-left: 8px;">
    <!-- <div class="module-wrap">
      <div class="module-head clearfix">
        <span class="left">
          <v-radiobutton name="status" v-model:checked="detail.status" :enums="[{label: '显示', value: '1'}, {label: '关闭', value: '0'}]" />
        </span>
        <span class="right">
          <button class="btn btn-default" @click="save">保存</button>
        </span>
      </div>
            <div class="module-content plr15" style="height: 150px">
        
      </div>
    </div> -->

    <div class="module-wrap">
      <div class="module-head" style="line-height: 32px;">
        分类
      </div>
      <div class="module-content plr15" style="height: 150px">
        <ul>
          <li class="mb5" v-for="(item, index) in dataList" :key="index">
            <label>
              <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" className="mr5" />{{item.name}}
            </label>
            <ul class="pl15">
              <li class="mb5" v-for="(data, i) in item.list" :key="i">
                <label>
                  <v-checkbox :checkedList="checkedList" :data="{ id: data.id}" className="mr5" /> {{data.name}}
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="module-wrap">
      <div class="module-head">
        预览图
      </div>
      <div class="module-content plr15" style="height: 360px">

        <div>
          <a data-uploadtype="tech" data-temp="nineimg" class="cl-ccc" @click="uploadImg">点击上传图片</a>
          <span style=" margin-left: 25px; color:#ccc">请上传本地图片，大小不超过2MB</span>
        </div>
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
  useRoute,
  useRouter
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  components: {},
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const coding: any = proxy.$coding['navigation'].single;
    const detail: any = ref({})
    let checkedList: any = ref([])
    const dataList: any = ref([])
    const aaa: any = ref([])

    // 聚合标签
    function checkbox() {
      store.dispatch('common/Fetch', {
        api: "getTagCheckbox",
        data: {
          channel_id: route.query.channel,
          type: 'cat'
        }
      }).then(res => {
        aaa.value = res.result
      })
    }

    function cate() {
      store.dispatch('common/Fetch', {
        api: "navigation",
        data: {
          channel: 0
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    function init() {
      store.dispatch('common/Fetch', {
        api: "detail",
        data: {
          coding: 'P0002',
          id: route.query.id
        }
      }).then(res => {
        detail.value = res.result
        let aaa = res.result.fid.split("|")
        checkedList.value = aaa.slice(1, aaa.length - 1)
      })
    }

    // 设置属性
    function setStyle(param: any) {
      detail.value.style = param
    }

    // 保存
    function save() {

      const {
        fid,
        pid,
        title,
        status,
        tag,
        sort,
        description,
        content,
        style
      } = detail.value

      const param: any = {
        fid: checkedList.value.length > 1 ? `|${checkedList.value.join("|")}|` : "",
        pid,
        title,
        status,
        keyword: tag && tag.length > 1 ? `|${tag.join("|")}|` : "",
        sort,
        description,
        content,
        style: JSON.stringify(style),
        coding: "P0002",
      }
      if (route.query.id) {
        param.id = detail.value.id
      }
      // proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: route.query.id ? 'update' : "insert",
        data: {
          ...param
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    function handleClick(){
      router.push(`/admin/navigation/single?channel=${route.query.channel}`)
    }

    onMounted(() => {
      init()
      checkbox()
      cate()
    })

    return {
      coding,
      detail,
      checkedList,
      init,
      setStyle,
      save,
      dataList,
      aaa,
      handleClick
    }
  }
})
</script>
