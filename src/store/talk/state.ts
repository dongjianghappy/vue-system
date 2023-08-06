export interface State {
  talk: any;
  collect: any,
  comment: any,
  praise: any,
  searchDefault: any;
  defaultStatistics: any;
}


const initState: State = {
  talk: {
    talkList1: [],
    talkList2: []
  },
  collect: [],
  comment: [],
  praise: [],
  searchDefault: {},
  defaultStatistics: {},

}

export default initState;