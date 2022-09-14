import { Commit } from 'vuex'
import api from '../../api/index'
import action from '../common/actions';
import {
  SERVER_NAME
} from '@/assets/enum'

const actions = {
  ...action,  

  Default: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.Default({
      ...data
    })

    context.commit("setDefault" , result.result);
    return result
  },
  DefaultStatistics: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.defaultStatistics({
      ...data
    })

    context.commit("setDefaultStatistics" , result.result);
    return result
  },
  ChannelDefault: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.channelDefault({
      ...data
    })

    context.commit("setChannelDefault" , result.result);
    return result
  },
  UserDefault: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.userDefault({
      ...data
    })

    context.commit("setUserDefault" , result.result);
    return result
  },  

  // 友情链接
  linkAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api[params.api || "select"]({
      ...data
    })

    
    result.result.list.map((item: any) => {
      if(item.website){
        const arr = item.website.split(',')
        let bbb = ""
        for(let i = 0; i < arr.length; i++){
          const arrs = SERVER_NAME.filter(data => data.value === arr[i])
          if(arrs.length > 0){
            if(i === 0 ){
              bbb = arr.length > 1 ? arrs[0].name : ","+arrs[0].name
            }else{
              bbb += ","+arrs[0].name
            }
          }
        }
        item.website = bbb
      }
    })
    debugger
    const number = 1+parseInt(params.tabsIndex)
    context.commit("setLink", {state: 'link'+number, data: result.result});
    return result
  },
}

export default actions;