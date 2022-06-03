import { Commit } from 'vuex'
import api from '../../api/index'

const actions = {
  Detect: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.Detect({
      ...params 
    })
    result.result && sessionStorage.setItem("userInfo", JSON.stringify(result.result.userInfo))
    context.commit("setUserInfo" , result.result);
    context.commit("setChannel" , result.result.channel);
    
   
    return result.result
  },
  
  Login: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.Login({
      ...params 
    })
   
    return result
  }, 
  // 用户列表
  userListAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api["userList"]({
      ...data
    })
    debugger
    let number = params.tabsIndex === 0 ? "userList" : "manageList"
    context.commit("setUser", {state: number, data: result.result});
    return result
  },
  // 角色列表
  roleAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api["select"]({
      ...data
    })

    const roleList: any = {}
    result.result.list.map((item: any) => {

      roleList[item.id] = item.name
    })

    context.commit("setRole", roleList);
    return result
  },  
  // 违禁用户
  banUserAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api["userBanuser"]({
      ...data
    })

    context.commit("setBanUser", result.result);
    return result
  },  
}

export default actions;