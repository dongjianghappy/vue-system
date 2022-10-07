export interface State {
  user: any;
  role: any
  banUser: any
  userInfos: any;
  hobby: any;
  blogInfo: any
  channel: any
  setting: any;
}


const initState: State = {
  user: {
    login: {},
    basic: {},
    userList: {},
    manageList: {},
  },
  role: [],
  banUser: [],
  userInfos: {},
  hobby: {},
  blogInfo: {},
  channel: [],
  setting: []
}

export default initState;