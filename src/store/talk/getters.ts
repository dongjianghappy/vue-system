const getters = {
  talkList1: (state: any) => state.talk.talkList1 || [],
  talkList2: (state: any) => state.talk.talkList1 || [],
  collect: (state: any) => state.collect || [1],
  comment: (state: any) => state.comment || [2],
  praise: (state: any) => state.praise || [4],
  searchDefault: (state: any) => state.searchDefault || {},
  defaultStatistics: (state: any) => state.defaultStatistics || {},
}

export default getters;