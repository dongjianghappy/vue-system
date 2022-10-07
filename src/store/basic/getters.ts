const getters = {
  default: (state: any) => state.default || {},
  defaultStatistics: (state: any) => state.defaultStatistics || {},
  channelDefault:  (state: any) => state.channelDefault || {},
  userDefault: (state: any) => state.userDefault || {},
  searchDefault: (state: any) => state.searchDefault || {},
  links: (state: any) => state.links || {},
  link1: (state: any) => state.links.link1 || {},
  link2: (state: any) => state.links.link2 || {},
  link3: (state: any) => state.links.link3 || {},
  partner: (state: any) => state.partner,
  announcement: (state: any) => state.announcement,
  messageBoard: (state: any) => state.messageBoard,
  feedback: (state: any) => state.feedback,
  manageLog: (state: any) => state.manageLog,
  userLog: (state: any) => state.userLog,
  slideshow: (state: any) => state.slideshow,
  slideshowList: (state: any) => state.slideshowList,
  
}

export default getters;