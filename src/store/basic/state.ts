export interface State {
  default: any;
  defaultStatistics: any;
  channelDefault: any;
  userDefault: any;
  searchDefault: any;
  dataStatistics: any;
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
    list: []
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