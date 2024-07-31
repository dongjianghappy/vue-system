<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增活动"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑活动' : '新增活动' " :data="{...data, coding: coding.activity}" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">标题</span>
        <div style="display: flex">
          <div style="flex: 1">
            <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
          </div>
          <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
        </div>
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">卡包</span>
        <span class="mr15">{{detail.card_holder_name}}</span>
        <v-choose :data="{item: detail, coding: coding.cardholder, condition: {status: 1}}" v-model:checked="detail.card_holder" type="radio" @choose="choose" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, coding: coding.activity}" :dataList="detail.img" uploadtype="huodong" @imgList="image" :style="'width: 135px'" />
        </div>
      </li>
    </ul>
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.markdown" :data="detail" />
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
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
    coding: {
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
    },
    auth: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})
    const img = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        if (props.action === 'edit') {
          let style = JSON.parse(detail.value.style || '{}')
          detail.value.style = style instanceof Object ? style : {}
        } else {
          detail.value.style = {}
        }
      }
    })

    function choose(param: any) {
      const {
        data
      } = param
      detail.value.card_holder = data.id
      detail.value.card_holder_name = data.name
    }    

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function submit(params: any) {
      const {
        id,
        title,
        markdown,
        card_holder,
        status
      } = detail.value
      const param: any = {
        title,
        img: img.value,
        content: markdown ? marked.parse(markdown) : "",
        markdown,
        card_holder,
        status
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.coding.activity,
          ...param
        }
      }).then(() => {
        props.render()
        params.message()
        params.cancel()
      })
    }

    return {
      isShow,
      detail,
      drawer,
      choose,
      image,
      submit
    }
  }
})
</script>
