const getters = {
  userList: (state: any) => state.user.userList || {},
  manageList: (state: any) => state.user.manageList || {},
  role: (state: any) => state.role || [],
  banUser: (state: any) => state.banUser || [],  
  loginuser: (state: any) => state.user.login.userInfo || {},
  userInfo: (state: any) => state.user.basic.userInfo || {},
  token: (state: any) => state.user.basic.token || {},
  groups: (state: any) => state.user.login.groups || {},
  currentUser: (state: any) => (state.user.login.userInfo && state.user.login.userInfo.account) === (state.user.basic.userInfo && state.user.basic.userInfo.account) ? true : false, 

  userInfos: (state: any) => state.userInfo || {},
  channel: (state: any) => state.user.channel || [],
  blogInfo: (state: any) => state.blogInfo || {},
  setting: (state: any) => state.user.setting || ['123','sd'],
}

export default getters;