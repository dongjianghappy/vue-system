import { Commit } from 'vuex'
import api from '../../api/index'
import action from '../common/actions';

const actions = {
  ...action,  

  // 应用商城
  talkAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.talkList({
      ...data
    })

    let number = 1+parseInt(params.tabsIndex)
    context.commit("setTalk", {state: 'talkList'+number, data: result.result});
    return result
  },  


  collectAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.TalkCollect({
      ...data
    })

    context.commit("setCollect" , result.result);
    return result
  },  
  commentAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.TalkComment({
      ...data
    })

    context.commit("setComment" , result.result);
    return result
  },  
  praiseAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.TalkPraise({
      ...data
    })

    context.commit("setPraise" , result.result);
    return result
  },      




}


export default actions;