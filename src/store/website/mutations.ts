const mutations = {
  setWebinfo: (state: any, params: any) => {
    state.webinfo = params
    state.user.basic = params
  }  
}

export default mutations
