<template>
  <div class="module-wrap">
    <div class="module-content plr15">
      <v-tabs :tabs="website" :isEmit="true">
        <template v-slot:extra v-if="auth.checked('add')">
          <v-space>
            <Detail :data="{ coding: codings.config }" :render="init" />
            <v-setting :data="{ website, coding: codings.channel_config }" />
          </v-space>
        </template>
        <template v-slot:content1 v-if="website.length > 0">
          <List :data="{ id: website[0].value }" />
        </template>
        <template v-slot:content2 v-if="website.length > 0">
          <List :data="{ id: website[1].value }" />
        </template>
      </v-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  codings,
  ref,
} from "@/utils";
import Detail from "./components/detail.vue";
import List from "./list.vue";

const { proxy }: any = getCurrentInstance();
const store = useStore();
const website = computed(() => store.getters['basic/site'].tabs);
const auth: any = proxy.$auth.init("basic");
</script>
