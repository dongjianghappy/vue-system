<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "新增歌谱"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑歌谱' : '新增歌谱' " :data="data" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">种类</span>
        <v-radiobutton name="ssss" v-model:checked="detail.type" :enums="[{label: '吉他', value: '0'}, {label: '架子鼓', value: '1'}, {label: '钢琴', value: '2'}]" v-model:value="detail.area" />
      </li>
      <li class="li">
        <span class="label">音调</span>
        <!-- <v-select :enums="sourceType" v-model:value="detail.tune" /> -->
        <v-radiobutton name="ssss" v-model:checked="detail.tune" :enums="tune" v-model:value="detail.tune" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="checked" value="1" v-model:checked="detail.checked" />
        <v-radio label="否" name="checked" value="0" v-model:checked="detail.checked" />
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">谱子</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img || []" uploadtype="music" @imgList="image" :style="'width: 135px'" />
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea placeholder="请输入单页摘要" v-model="detail.content" class="w-full"></textarea>
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
  useStore
} from '@/utils'
import SpaceModal from '../../../../space/components/modalSpace.vue'
import {
  LINK_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    SpaceModal
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
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const img: any = ref("")
    const sourceType: any = LINK_TYPE
    const tune = [{
      label: 'C调',
      value: 'C'
    }, {
      label: 'D调',
      value: 'D'
    }, {
      label: 'E调',
      value: 'E'
    }, {
      label: 'F调',
      value: 'F'
    }, {
      label: 'G调',
      value: 'G'
    }, {
      label: 'A调',
      value: 'A'
    }, {
      label: 'B调',
      value: 'B'
    }]
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    // 监听图片上传
    function image(a: any) {
      debugger
      img.value = a
    }

    function submit(cancel: any) {
      const {
        id,
        name,
        type,
        tune,
        checked,
        content
      } = detail.value

      const param: any = {
        name,
        type,
        tune,
        checked,
        content,
        img: img.value
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          ...param

        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      drawer,
      upload,
      sourceType,
      image,
      tune,
      submit
    }
  }
})
</script>
