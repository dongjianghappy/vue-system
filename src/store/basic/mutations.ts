const mutations = {
  setData: (state: any, params: any) => {
    debugger
    state[params.state] = params.data
  },  
  setDefault: (state: any, params: any) => {
    state.default = params
  },
  setDefaultStatistics: (state: any, params: any) => {
    state.defaultStatistics = params
  },
  setChannelDefault: (state: any, params: any) => {
    state.channelDefault = params
  },
  setUserDefault: (state: any, params: any) => {
    state.userDefault = params
  },

  // 友情链接
  setLink: (state: any, params: any) => {
    state.links[params.state] = params.data || {}
  },
}

export default mutations
