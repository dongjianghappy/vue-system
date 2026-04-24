<template>
<v-button v-model:show="isShow" :disabled="true">
  设置
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="设置" :style="{width: '350'}" :data="data" :param="detail" :submit="submit">
  <template v-slot:content v-if="isShow">
    <audio ref="show_video" :src="fileInfo.fileUrl || detail.file" type="video/mp4">
    </audio>
    <div class="pt50 hide" style="text-align: center;">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="music" v-model:file="fileInfo" uploadtype="system" format=".mp3, .wav" />
    </div>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.remark" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.name" placeholder="请输入字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">默认值</span>
        <input type="text" v-model="detail.value" placeholder="请输入默认值" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">表单类型</span>
        <v-select :enums="[{value: 'input', name: '文本框'}, {value: 'textare', name: '文本域'}, {value: 'radio', name: '单选框'}, {value: 'checkbox', name: '复选框'}, {value: 'select', name: '下拉框'}, {value: 'switch', name: '开关'}, {value: 'time', name: '时间'}, {value: 'date', name: '日期'}, {value: 'datetime', name: '日期时间'}, {value: 'location', name: '地点'}]" v-model:value="detail.text_type" :defaultValue="detail.text_type = detail.text_type ? detail.text_type : 'select'" />
      </li>
      <li class="li" v-if="detail.text_type ==='select'">
        <span class="label"></span>
        <EnumList :dataList="detail.enums" />
      </li>
      <li class="li" v-if="detail.text_type ==='select'">
        <v-radiobutton name="multiple" v-model:checked="detail.multiple" :enums="[{label: '单选', value: '0'}, {label: '多选', value: '1'}]" />
      </li>
      <li class="li">
        <span class="label">占位符</span>
        <input type="text" v-model="detail.placeholder" placeholder="请输入占位符" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">单位</span>
        <input type="text" v-model="detail.unit" placeholder="请输入单位" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">是否必填</span>
        <v-radio label="是" name="required" value="1" v-model:checked="detail.required" />
        <v-radio label="否" name="required" value="0" v-model:checked="detail.required" />
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'
import EnumList from './enum.vue'
import {
  tabsSetting
} from '@/assets/const'
export default defineComponent({
  name: 'v-Search',
  components: {
    EnumList
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
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const fileInfo: any = ref({})
    const detail: any = ref({})
    const show_video: any = ref(null)
    const isplay: any = ref(false)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        fileInfo.value = {}
        detail.value = await drawer.value.init()
        if(!detail.value.enums){
          detail.value.enums = []
        }else{
          detail.value.enums = JSON.parse(detail.value.enums)
        }
        isplay.value = false
      }
    })

    // 监听
    watch([() => fileInfo.value.fileUrl], async (newValues: any, prevValues) => {
      setTimeout(() => {
        detail.value.title = fileInfo.value.name.substring(0, fileInfo.value.name.lastIndexOf("."))
        isplay.value = false
      }, 10)
    })

    function onPlay() {
      isplay.value = !isplay.value
      show_video.value.play()
      if (isplay.value) {
        show_video.value.play()
      } else {
        show_video.value.pause()
      }
    }

    function handleChange(e: any, param: any) {
      param.broadcast = e.currentTarget.checked ? '1' : '0'
    }

    function submit(cancel: any) {
      const {
        fid,
        name,
        text_type,
        multiple,
        description,
        placeholder,
        unit,
        required,
        enums,
        remark
      } = detail.value

      const param: any = {
        fid: fid || props.data.fid,
        name,
        text_type,
        multiple,
        description,
        placeholder,
        unit,
        required,
        enums: JSON.stringify(enums),
        remark
      }

      if (props.action !== "add") { //  && props.param
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
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
      tabsSetting,
      detail,
      drawer,
      handleChange,
      submit,
      upload,
      fileInfo,
      show_video,
      onPlay,
      isplay
    }
  }
})
</script>
