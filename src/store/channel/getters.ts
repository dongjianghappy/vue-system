const getters = {
  article: (state: any) => state.article || {},
  source: (state: any) => state.source || {},
  tech: (state: any) => state.tech || {},
  picture: (state: any) => state.picture || {},
  website: (state: any) => state.website || {},
  funny: (state: any) => state.funny || {},
  notes: (state: any) => state.notes || {},
  learn: (state: any) => state.learn || {},
  questions: (state: any) => state.questions || {},
  haosite: (state: any) => state.haosite || {},
  blog: (state: any) => state.blog || {},
  digital: (state: any) => state.digital || {},
  cateList: (state: any) => state.cateList || [],
  articleList: (state: any) => state.articleList || {},
  auditList: (state: any) => state.auditList || {},
  returnList: (state: any) => state.returnList || {},
  musicList: (state: any) => state.music.list || [],
  musicSinger: (state: any) => state.music.singer || [],
  musicScore: (state: any) => state.music.score || [],
  musicLrc: (state: any) => state.music.lrc || [],
  videoList: (state: any) => state.videoList || []
}

export default getters;