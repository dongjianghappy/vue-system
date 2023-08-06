const mutations = { 
  setTalk: (state: any, params: any) => {
    state.talk[params.state] = params.data || {}
  },
  setCollect: (state: any, params: any) => {
    debugger
    state.collect = params || []
  },
  setComment: (state: any, params: any) => {
    state.comment = params || []
  },
  setPraise: (state: any, params: any) => {
    state.praise = params || []
  },
  setSearchDefault: (state: any, params: any) => {
    const result = [];
    for(let i=0,len=params.hot.length;i<len;i+=5){
      result.push(params.hot.slice(i,i+5));
    }  
    params.find = result
    state.searchDefault = params
  },
  setDefaultStatistics: (state: any, params: any) => {
    state.defaultStatistics = params
  },  
}

export default mutations
