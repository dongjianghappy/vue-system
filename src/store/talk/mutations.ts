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
}

export default mutations
