import { Commit } from 'vuex'
import api from '../../api/index'

const actions = {
  BasicInfo: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.basicInfo({
      ...params 
    })
    context.commit("setWebinfo" , result.result);
    return result.result
  },
  BasicContact: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.basicInfo({
      ...params 
    })
    context.commit("setContact" , result.result);
    return result.result
  }
}

export default actions;