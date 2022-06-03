const getters = {
  appstore: (state: any) => state.appstore || [],
  appstore1: (state: any) => state.appstore.appstore1 || [],
  appstore2: (state: any) => state.appstore.appstore2 || [],
  appstore3: (state: any) => state.appstore.appstore3 || [],
  appstore4: (state: any) => state.appstore.appstore4 || [],
  visit1: (state: any) => state.visit.visit1 || [],
  visit2: (state: any) => state.visit.visit2 || [],
  visit3: (state: any) => state.visit.visit3 || [],
  domain1: (state: any) => state.domain.domain1 || [],
  domain2: (state: any) => state.domain.domain2 || [],
  domain3: (state: any) => state.domain.domain3 || [],
  engine1: (state: any) => state.engine.engine1 || {},
  engine2: (state: any) => state.engine.engine2 || [],  
  ip1: (state: any) => state.ip.ip1 || [],
  ip2: (state: any) => state.ip.ip2 || [],
  ip3: (state: any) => state.ip.ip3 || [],
  ip4: (state: any) => state.ip.ip4 || []
  
}

export default getters;