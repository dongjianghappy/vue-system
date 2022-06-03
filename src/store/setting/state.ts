export interface State {
  appstore: any;
  visit: any;
  domain: any;
  ip: any;
  engine: any
}


const initState: State = {
  appstore: {
    appstore1: [],
    appstore2: [],
    appstore3: [],
    appstore4: []
  },
  visit: {
    visit1: [],
    visit2: [],
    visit3: []
  },
  domain: {
    domain1: [],
    domain2: [],
    domain3: []
  },  
  ip: {
    ip1: [],
    ip2: [],
    ip3: [],
    ip4: []
  }, 
  engine: {
    engine1: {},
    engine2: []
  }
}

export default initState;