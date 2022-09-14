export interface State {
  article: any;
  source: any;
  tech: any;
  picture: any;
  website: any;
  funny: any;
  notes: any;
  learn: any;
  questions: any;
  haosite: any;
  blog: any;
  digital: any;
  cateList: any;
  articleList: any;
  auditList: any;
  returnList: any;
  music: any;
  videoList: any;
}


const initState: State = {
  article: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  source: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  tech: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  picture: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  website: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  funny: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  notes: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  }, 
  learn: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },  
  questions: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  haosite: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  blog: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },  
  digital: {
    cateList: [],
    articleList: {},
    auditList: {},
    returnList: {},
  },
  cateList: [],
  articleList: {},
  auditList: {},
  returnList: {},
  music: {
    list: [],
    singer: [],
    score: [],
    lrc: []
  },
  videoList: []
}

export default initState;