const mutations = {
  setData: (state: any, params: any) => {
    state[params.state] = params.data
  },  
  setAppstore: (state: any, params: any) => {
    state.appstore[params.state] = params.data || {}
  },
  setVisit: (state: any, params: any) => {
    state.visit[params.state] = params.data || {}
  },  
  setDomain: (state: any, params: any) => {
    state.domain[params.state] = params.data || {}
  },  
  setEngine: (state: any, params: any) => {
    state.engine[params.state] = params.data || {}
  },     
  setIp: (state: any, params: any) => {
    state.ip[params.state] = params.data || {}
  },   
}

export default mutations
