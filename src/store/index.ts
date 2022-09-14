import { createStore } from 'vuex'
import common from './common'
import basic from './basic'
import setting from './setting'
import website from './website'
import user from './user'
import talk from './talk'
import channel from './channel'
import graph from './graph'
import permission from './permission'


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common,
    basic,
    setting,
    website,
    user,
    talk,
    channel,
    graph,
    permission
  }
})
