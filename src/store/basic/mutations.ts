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
  setSearchDefault: (state: any, params: any) => {
    const result = [];
    for(let i=0,len=params.hot.length;i<len;i+=5){
      result.push(params.hot.slice(i,i+5));
    }  
    params.find = result
    state.searchDefault = params
  },
  setDataStatistics: (state: any, params: any) => {
    state.dataStatistics = params
  },
  // 友情链接
  setLink: (state: any, params: any) => {
    state.links[params.state] = params.data || {}
  },
}

export default mutations
