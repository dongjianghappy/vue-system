import { Commit } from 'vuex'
import api from '../../api/index'
import action from '../common/actions';

const actions = {
  ...action,  

  cateListAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.cateList({
      ...data
    })

    context.commit("setCateList" , {module: params.module, data: result.result});
    return result
  }, 
  
  // 公共文档列表查询
  articleListAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.articleList({
      ...data
    })
    const list = parseInt(params.tabsIndex) === 0 ? "articleList" :  parseInt(params.tabsIndex) === 1 ? 'auditList' : 'returnList'
    context.commit("setArticleList" , {module: params.module,state: list, data: result.result});
    return result
  }, 

  musicListAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.select({
      ...data
    })

    context.commit("setMusicList" , result.result);
    return result
  }, 
  musicScoreAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.select({
      ...data
    })

    context.commit("setMusicScore" , result.result);
    return result
  }, 
  musicSingerAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.select({
      ...data
    })

    context.commit("setMusicSinger" , result.result);
    return result
  }, 
  musicLrcAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.select({
      ...data
    })

    context.commit("setMusicLrc" , result.result);
    return result
  }, 
  videoListAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.articleList({
      ...data
    })

    context.commit("setVideoList" , result.result);
    return result
  },      




}


export default actions;