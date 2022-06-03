export interface State {
  talk: any;
  collect: any,
  comment: any,
  praise: any
}


const initState: State = {
  talk: {
    talkList1: [],
    talkList2: []
  },
  collect: [],
  comment: [],
  praise: []

}

export default initState;