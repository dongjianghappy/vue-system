import { defineComponent, getCurrentInstance, computed, ref, watch, reactive } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onMounted } from '@vue/runtime-core';
import codings from "@/assets/coding"
import authorized from "@/assets/authorized"
import { getUid, chooseCate, checkButtonAuth, channels, channelssss, getQuery, jsonParse } from './auth'

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
  reactive,
  codings,
  authorized,
  getUid,
  chooseCate,
  checkButtonAuth,
  channels,
  channelssss,
  getQuery,
  jsonParse
};