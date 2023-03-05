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
    debugger
    result.result.list = result.result.list.map((item: any) => {
      let domain = ""
      if(item.source_url.indexOf("http://") > -1 || item.source_url.indexOf("https://") > -1){
        domain = item.source_url.split("//")[1]
        domain = domain.split("/")[0]
      }
      debugger
      return {
        domain,
        ...item
      }
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