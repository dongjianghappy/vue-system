<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增歌手"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑歌手' : '新增歌手' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">歌手</span>
        <input v-model="detail.name" type="text" placeholder="请输入歌手" class="input-sm input-full" />
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">照片</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img || []" uploadtype="music" @imgList="image" :style="'width: 135px'" />
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea v-model="detail.introduction" placeholder="请输入歌手介绍" class="w-full"></textarea>
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
        const drawer: any = ref(null)
        const upload: any = ref(null);
        const detail: any = ref({})
        const img = ref("")

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
            introduction,
          } = detail.value

          const param: any = {
            name,
            introduction,
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
            submit,
            image
          }
        }
      })
</script>
