import { Commit } from 'vuex'
import api from '../../api/index'
import action from '../common/actions';

const actions = {
  ...action,  

  // 应用商城
  appstoreAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.appstore({
      ...data
    })

    const number = 1+parseInt(params.tabsIndex)
    context.commit("setAppstore", {state: 'appstore'+number, data: result.result});
    return result
  },  

  // 访问统计
  visitAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api[params.api || 'select']({
      ...data
    })

    const number = 1+parseInt(params.tabsIndex)
    context.commit("setVisit", {state: 'visit'+number, data: result.result});
    return result
  },  
  // 访问统计
  domainAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api[params.api || 'select']({
      ...data
    })

    const number = 1+parseInt(params.tabsIndex)
    context.commit("setDomain", {state: 'domain'+number, data: result.result});
    return result
  },  
  // 搜索引擎统计
  engineAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api[params.api || 'select']({
      ...data
    })

    const number = 1+parseInt(params.tabsIndex)
    context.commit("setEngine", {state: 'engine'+number, data: result.result});
    return result
  },  
  
  // IP统计
  ipAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api[params.api || 'select']({
      ...data
    })

    const number = 1+parseInt(params.tabsIndex)
    context.commit("setIp", {state: 'ip'+number, data: result.result});
    return result
  }, 
  
}


export default actions;