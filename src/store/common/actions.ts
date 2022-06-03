import { Commit } from 'vuex'
import api from '../../api'

const actions = {
  Fetch: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api[params.api || "select"]({
      ...data
    })

    if(params.state){
        context.commit(params.qqqq ? params.qqqq : "setData" , {state: params.state, data: result.result});      
    }
    
    return result
  },

  Save: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.updateSave({
      ...data
    })
    
    return result
  },

  // 更新顺序
  updateSort: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.updateSort({
      ...data
    })
    
    return result
  },  

  Channel: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api[params.api || "channelNavigation"]({
      ...data
    })

    context.commit("setChannel" , result.result);
    return result
  },
  uploadImg: async (context: { commit: Commit; state: any}, params: any = {}) => {
    debugger
    const {result}:any = await api.uploadImage({
      ...params 
    })
    return result.result
  } ,
}

export default actions;