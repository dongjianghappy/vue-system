const mutations = {
  setUserInfo: (state: any, params: any) => {
    state.user.login = params
    state.user.basic = params
  },
  setChannel: (state: any, params: any) => {
    
    state.user.channel = params
  },
  // 用户列表
  setUser: (state: any, params: any) => {
    debugger
    state.user[params.state] = params.data || {}
  },
  // 角色管理
  setRole: (state: any, params: any) => {
    debugger
    state.role = params
  },
  // 违禁用户
  setBanUser: (state: any, params: any) => {
    
    state.banUser = params
  },
}

export default mutations
