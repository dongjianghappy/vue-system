export interface State {
  default: any;
  defaultStatistics: any;
  channelDefault: any;
  userDefault: any;
  searchDefault: any;
  dataStatistics: any;
  dataCenterStatistics: any;  
  site: any;
  links: any;
  partner: any;
  announcement: any
  messageBoard: any
  feedback: any
  manageLog: any
  userLog: any
  slideshow: any
  slideshowList: any
}


const initState: State = {
  default: {},
  defaultStatistics: {},
  channelDefault: {},
  userDefault: {},
  searchDefault: {},
  dataStatistics: {},
  dataCenterStatistics: {},
  site: {
    list: [],
    tabs: [],
    popover: {}
  },
  links: {
    link1: {},
    link2: {},
    link3: {}
  },
  partner: {
    list: []
  },
  announcement: {
    list: []
  },
  messageBoard: {
    articleList: {},
    auditList: {},
  },
  feedback: {
    list: []
  },
  manageLog: [],
  userLog: [],
  slideshow: [],
  slideshowList: []
}

export default initState;