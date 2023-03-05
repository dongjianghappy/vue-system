const mutations = { 
  setCateList : (state: any, params: any) => {
    state[params.module].cateList  = params.data
  },
  setArticleList: (state: any, params: any) => {
    state[params.module][params.state] = params.data
  },  
  setAnswerList: (state: any, params: any) => {
    debugger
    state.questions.answerList = params
  },  
  setMusicList: (state: any, params: any) => {
    state.music.list = params
  },
  setMusicScore: (state: any, params: any) => {
    state.music.score = params
  },
  setMusicSinger: (state: any, params: any) => {
    state.music.singer = params
  },
  setMusicLrc: (state: any, params: any) => {
    state.music.lrc = params
  },



  setVideoList: (state: any, params: any) => {
    state.videoList = params
  }
}

export default mutations
