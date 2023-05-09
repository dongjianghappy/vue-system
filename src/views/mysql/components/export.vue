<template>
<span @click="handleclick">
  导出
</span>
<v-dialog v-model:show="isShow" ref="form" title="导出该表" :style="{width: '520', height: '250'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">导出内容</span>
        <v-radio label="数据" name="kind" value="1" v-model:checked="detail.kind" />
        <v-radio label="结构" name="kind" value="2" v-model:checked="detail.kind" />
        <v-radio label="数据和结构" name="kind" value="3" v-model:checked="detail.kind" />
      </li>
      <li class="li">
        <span class="label">导出格式</span>
        <v-radio label="SQL" name="type" value="1" v-model:checked="detail.type" :disabled="detail.content !== '1'" />
        <v-radio label="EXCEL" name="type" value="2" v-model:checked="detail.type" :disabled="detail.content !== '1'" />
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-DetailFlag',
  props: {
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
    const {proxy}:any = getCurrentInstance();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})
    const store = useStore();

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    let downloadBlob = (blob: any, fileName: any) => {
      try {
        const href = window.URL.createObjectURL(blob) //创建下载的链接
        
          // 谷歌浏览器 创建a标签 添加download属性下载
          const downloadElement = document.createElement('a')
          downloadElement.href = href
          downloadElement.target = '_blank'
          downloadElement.download = fileName
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
      } catch (e) {
        console.log('下载失败')
      }
    }

    function submit(params: any) {
      const {
        kind,
        type
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "exportMysql",
        data: {
          dbname: props.data.dbname,
          kind,
          type
        }
      }).then(res => {
        props.render()
        let blod = new Blob([res.result])
        debugger
        downloadBlob(blod, props.data.dbname+`${kind === '2' ? '_structure' : ''}`+".sql")
        proxy.$hlj.message({
          msg: "导出成功"
        })
        isShow.value = false
      })
    }

    return {
      isShow,
      handleclick,
      detail,
      drawer,
      submit
    }
  }
})
</script>
