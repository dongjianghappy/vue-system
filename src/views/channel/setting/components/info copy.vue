<template>
<div class="module-wrap">
  <div class="module-content p25">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">频道名称</span>
        <input v-model="data.name" type="text" placeholder="请输入频道名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="data.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">是否显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="data.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="data.status" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <SpaceModal>
          <div class="space-wrap" style="display: flex;">
            <div class="space-picture p10" style="background: rgb(250, 250, 250); flex: 2 1 0%; height: auto;">
              <div class="pointer"><img width="250" height="100" alt=""></div>
            </div>
            <div style="flex: 1 1 0%;">
              <div style="flex: 1 1 0%; display: flex; justify-content: center;">
                <div>
                  <div style="background: rgb(250, 250, 250); border: 2px dashed rgb(238, 238, 238); height: 150px; width: 150px; line-height: 150px; text-align: center;"><i class="iconfont icon-add font30"></i></div>
                </div>
              </div>
            </div>
          </div>
        </SpaceModal>
      </li>
      <li class="li clearfix">
        <span class="label">页面标题</span>
        <div class="col-md-8">
          <input v-model="data.seotitle" type="text" placeholder="请输入频道页面标题" class="input-sm input-full mr10" />
        </div>
        <div class="col-md-4">
          <input v-model="data.behind_title" type="text" placeholder="请输入频道名称标题后缀" class="input-sm input-full" />
        </div>
      </li>
      <li class="li">
        <span class="label">关键字</span>
        <v-taglist v-model:tags="data.keyword" />
      </li>
      <li class="li clearfix">
        <span class="label">描述</span>

        <div class="col-md-8">
          <textarea placeholder="请输入频道页面描述" v-model="data.description" class="w-full"></textarea>
        </div>
        <div class="col-md-4">
          <textarea placeholder="描述后缀" v-model="data.behind_description" class="w-full"></textarea>
        </div>
      </li>
    </ul>
    <div>
      <buttom class="btn btn-default" @click="submit">确认</buttom>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  onMounted,
  useStore,
  channels
} from '@/utils'
import SpaceModal from '../../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    SpaceModal
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    coding: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: 0
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    // const dataList = computed(() => {
    //   return store.getters['basic/links'][props.type]
    // });
    const param = {
      name: "",
      url: "",
      apply_checked: 1
    }
    const channel = channels()
    const coding: any = channel.coding.art;
    const img = ref("")
    const checkedList: any = ref([])
    const data: any = ref({
      img: [],
      tag: [],
      summary: ""
    })
    const upload: any = ref(null);
    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    // 上传图片
    function uploadImg() {
      upload.value.handleclick()
    }

    function submit(params: any) {

      const {
        name,
        sort,
        seotitle,
        behind_title,
        keyword,
        description,
        behind_description
      } = data.value

      store.dispatch('common/Fetch', {
        api: "update",
        data: {
          coding: "O0000",
          id: channel.id,
          name,
          sort,
          seotitle,
          behind_title,
          keyword,
          description,
          behind_description
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
      })

    }

    function init() {
      store.dispatch('common/Fetch', {
        api: "detail",
        data: {
          coding: "O0000",
          id: channel.id,
        }
      }).then(res => {
        data.value = res.result
      })
    }
    onMounted(init)

    return {
      checkedList,
      param,
      image,
      data,
      uploadImg,
      upload,
      submit
    }
  }
})
</script>
