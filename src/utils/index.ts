import { defineComponent, getCurrentInstance, computed, ref, watch, defineProps, defineEmits, defineExpose, reactive } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onMounted } from '@vue/runtime-core';
import codings from "@/assets/coding"
import authorized from "@/assets/authorized"
import selection from "./selection"
import { getUid, chooseCate, checkButtonAuth, channels, channelssss, module, getQuery, jsonParse, durationTrans, getParent, showParent } from './auth'
import { useProps } from "./props"
import { useRef } from "./ref"

export {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  onMounted,
  ref,
  watch,
  defineProps,
  defineEmits,
  defineExpose,
  reactive,
  codings,
  authorized,
  selection,
  getUid,
  chooseCate,
  checkButtonAuth,
  channels,
  channelssss,
  module,
  getQuery,
  jsonParse,
  durationTrans,
  getParent,
  showParent,
  useProps,
  useRef
};