<template>
    <v-button v-model:show="isShow" :disabled="true">
        枚举值
    </v-button>
    <v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`枚举值`" :style="{width: '450'}" :submit="submit" >
        <template v-slot:extra>
            <span @click="handleClick('add')">添加</span>
        </template>
        <template v-slot:content v-if="isShow">
            <div style="height: 461px">
                <table class="table-striped table-hover col-left-12">
                    <tr class="th">
                        <td class="col-md-5">名称</td>
                        <td class="col-md-5">值</td>
                        <td class="col-md-2">操作</td>
                    </tr>
                    <tr v-for="(item, index) in dataList" :key="index">
                        <td>
                            <input type="text" v-model="item.name" placeholder="请输入名称" class="input-sm input-full" />
                        </td>
                        <td>
                            <input type="text" v-model="item.value" placeholder="请输入值" class="input-sm input-full" />
                        </td>
                        <td>
                            <span @click="handleClick(index)">删除</span>
                        </td>
                    </tr>
                </table>
                <v-nodata :data="dataList" />
            </div>
        </template>
    </v-drawer>
</template>

<script setup lang="ts">
import { defineProps, ref, useStore, watch } from "@/utils";

const props: any = defineProps({
    dataList: {
        type: Array,
        default: () => {
            return [];
        },
    },
});

const isShow: any = ref(false);

function handleClick(param: any){
  if(param === 'add'){
    props.dataList.push({
      name: "",
      value: ""
    })
  }else{
    props.dataList.splice(param, 1)
  }
}

function submit(){
  isShow.value = false
}
</script>
