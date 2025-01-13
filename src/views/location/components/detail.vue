<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增合作伙伴"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑合作伙伴' : '新增合作伙伴' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="tabsPartner" method="click">
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">伙伴名称</span>
            <input v-model="detail.name" type="text" placeholder="请输入伙伴名称" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">类型</span>
            <v-select :enums="PARTNER_TYPE" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '0'" />
          </li>
          <li class="li">
            <span class="label">期限</span>
            <v-radiobutton name="term" v-model:checked="detail.term" :enums="[{label: '永久', value: '0'}, {label: '短期', value: '1'}]" />
          </li>
          <li style="padding-left: 100px">
            <ul class="plr15" style="background: #f8f8fa;">
              <li class="li">
                <span class="label">日期</span>
                <div class="flex">
                  <div style="flex: 1">
                    <input v-model="detail.start_time" type="text" placeholder="请输入开始时间" class="input-sm input-150" />
                    <v-timepicker :data="detail" attr="start_time" />
                  </div>
                  <div style="flex: 1" v-if="detail.term === '1'">
                    <input v-model="detail.last_time" type="text" placeholder="请输入结束时间" class="input-sm input-150" />
                    <v-timepicker :data="detail" attr="last_time" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li class="li">
            <span class="label">顺序</span>
            <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
          </li>
          <li class="li">
            <span class="label">显示</span>
            <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
            <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
          </li>
          <li class="li" style="overflow: auto;">
            <span class="label">预览图</span>
            <SpaceModal v-model:image="detail.image">
              <span class="right">选择图片</span>
            </SpaceModal>
            <img width="398" height="150" :src="detail.image" onerror="this.src='/images/slideshow.png'">
          </li>
        </ul>
        <div class="edit-article">
          <v-editor v-model:contentsss="detail.markdown" :data="detail" />
        </div>
      </template>
      <template v-slot:content2>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">联系人</span>
            <input v-model="detail.contacts" type="text" placeholder="请输入顺序" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">电话</span>
            <input v-model="detail.tel" type="text" placeholder="请输入顺序" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">地址</span>
            <input v-model="detail.address" type="text" placeholder="请输入顺序" class="input-sm input-full" />
          </li>
        </ul>
      </template>
    </v-tabs>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  tabsPartner
} from '@/assets/const'
import {
  PARTNER_TYPE,
} from '@/assets/enum'
import SpaceModal from '../../space/components/modalSpace.vue'
  const props: any = defineProps({
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
    },
    auth: {
      type: Boolean,
      default: false
    }
  })
    const store = useStore();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })
</script>
