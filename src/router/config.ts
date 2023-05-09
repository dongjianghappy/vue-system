import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Index from '../views/layout/index.vue'


// // 静态组件
import Test from '../views/layout/test.vue'
// import Login from '../views/login/index'
// import notfound404 from '../views/notfound/404'

// // 动态组件
// // 频道组件
import ModuleDefault from '../views/channel/index.vue'
// import ChannelIndex from '../views/channel/default.vue'

import Channel from '../views/channel/cate/index.vue'
import ChannelSetting from '../views/channel/setting/index.vue'
import ArticleList from '../views/channel/article/index.vue'
import Recycle from '../views/channel/recycle/index.vue'
import Article from '../views/channel/article/components/detail.vue'
// import SettingChannel from '../views/channel/setting/index.vue'
import Label from '../views/channel/label/index.vue'
import Collect from '../views/channel/collect/index.vue'
import Comment from '../views/channel/comment/index.vue'
import Praise from '../views/channel/praise/index.vue'
import Download from '../views/channel/download/index.vue'
import MusicList from '../views/channel/music/list/index.vue'
import MusicScore from '../views/channel/music/score/index.vue'
import MusicSinger from '../views/channel/music/singer/index.vue'
import MusicLrc from '../views/channel/music/lrc/index.vue'
import MusicEffects from '../views/channel/music/list/effects.vue'
import VideoList from '../views/channel/video/index.vue'
import HaoSiteArticle from '../views/channel/haosite/index.vue'
import EffectList from '../views/channel/video/effect.vue'
import AnswerList from '../views/channel/question/index.vue'
import SourcePsdList from '../views/channel/source/image.vue'
import DesignList from '../views/channel/design/index.vue'
import Album from '../views/channel/picture/album.vue'



// // 基本组件
import Default from '../views/layout/components/default.vue'
import Basic from '../views/basic/index.vue'
import Theme from '../views/theme/index.vue'
import Site from '../views/basic/site/index.vue'
import SiteChannel from '../views/basic/site/channel/index.vue'
import Navigation from '../views/navigation/index.vue'
import NavigationMain from '../views/navigation/main/index.vue'
import Single from '../views/navigation/single/index.vue'
import Static from '../views/static/index.vue'
import SingleArticle from '../views/navigation/single/detail.vue'
import MenuRouter from '../views/menuRouter/index.vue'
import Slideshow from '../views/slideshow/index.vue'
import SlideshowList from '../views/slideshow/list/index.vue'

// // 运营组件
import Partner from '../views/partner/index.vue'
import Advertisement from '../views/advertisement/index.vue'
import AdvertisementPosition from '../views/advertisement/position/index.vue'
import AdvertisementOrder from '../views/advertisement/order/index.vue'
import Links from '../views/links/index.vue'

// // 用户组件
import User from '../views/user/index.vue'
import UserBasic from '../views/user/basic/index.vue'
// // import UserPassword from '../views/user/basic/UserPassword'
import UserDefault from '../views/user/default.vue'
import UserList from '../views/user/userinfo/index.vue'
import UserGrade from '../views/user/grade/index.vue'
import UserRole from '../views/user/role/index.vue'
import RoleGrade from '../views/user/role/grade.vue'
import UserGroup from '../views/user/group/index.vue'
import UserSign from '../views/user/sign/index.vue'
import UserAudit from '../views/user/audit/index.vue'
import UserBanuser from '../views/user/banuser/index.vue'
import UserRecommend from '../views/user/recommend/index.vue'
import UserSecurity from '../views/user/security/index.vue'
import UserSetting from '../views/user/setting.vue'

// 个人信息
import Personal from '../views/personal/components/main/index.vue'
import PersonalDefault from '../views/personal/default.vue'
import PersonalBasic from '../views/personal/basic/index.vue'
import PersonalAppstore from '../views/personal/appstore/index.vue'
import PersonalChannel from '../views/personal/channel/index.vue'
import PersonalGrade from '../views/personal/grade/index.vue'
import PersonalTalk from '../views/personal/talk/index.vue'

// // 设置组件
import Appstore from '../views/appstore/index.vue'
// import Permissions from '../views/appstore/permissions'
import Statistics from '../views/statistics/index.vue'
import Visit from '../views/statistics/visit/index.vue'
import Domain from '../views/statistics/domain/index.vue'
import Engine from '../views/statistics/engine/index.vue'
import Ip from '../views/statistics/ip/index.vue'
import ManagerLoginLog from '../views/log/index.vue'
import UserLoginLog from '../views/log/userLog.vue'
// import Operating from '../views/log/operating'
import MysqlIndex from '../views/mysql/index.vue'
import Mysql from '../views/mysql/list.vue'
import Collection from '../views/collection/index.vue'
import collectionTemList from '../views/collection/temList.vue'
import CollectionList from '../views/collection/list.vue'
import CollectionRecycle from '../views/collection/recycle.vue'
import Tag from '../views/tag/index.vue'
import OrderNew from '../views/order/index.vue'
// import OrderNew from '../views/order/new'
// import OrderDoing from '../views/order/doing'
// import OrderCompleted from '../views/order/completed'
// import Card from '../views/order/card'

// // 服务组件
import Service from '../views/service/index.vue'
import MessageBoard from '../views/service/messageBoard/index.vue'
import Feedback from '../views/service/feedback/index.vue'
import Announcement from '../views/service/announcement/index.vue'
// import Email from '../views/email'
import Job from '../views/service/job/index.vue'
import Resume from '../views/service/job/resum/index.vue'
import Message from '../views/service/message/index.vue'
import MessageDetail from '../views/service/message/components/detail.vue'
import KnowledgeCate from '../views/service/knowledge/cate/index.vue'
import KnowledgeList from '../views/service/knowledge/list/index.vue'
import KnowledgeArticle from '../views/service/knowledge/list/article.vue'
import Spread from '../views/spread/index.vue'
import Space from '../views/space/index.vue'

import codeDefault from '../views/code/index.vue'
import codeCate from '../views/code/cate/index.vue'
import codeList from '../views/code/list/index.vue'


import Customize from '../views/customize/index.vue'
import CustomizeList from '../views/customize/list.vue'

import Vote from '../views/vote/index.vue'
import VoteList from '../views/vote/list/index.vue'

import Robot from '../views/robot/robot/index.vue'
import RobotVersion from '../views/robot/robot/version/index.vue'
import RobotArticle from '../views/robot/robot/components/detail.vue'
import Intention from '../views/robot/intention/index.vue'
import Speech from '../views/robot/speech/index.vue'
import Chat from '../views/robot/chat/index.vue'
import ChatList from '../views/robot/chat/list/index.vue'


import Favorites from '../views/favorites/index.vue'

import Search from '../views/search/index.vue'
import SearchView from '../views/search/index.vue'
import SearchKeyword from '../views/search/keyword/index.vue'
import searchList from '../views/search/searchList/index.vue'

import Template from '../views/template/index.vue'

// // 话题
import Talk from '../views/talk/index.vue'
import TalkList from '../views/talk/list/index.vue'
import Activity from '../views/talk/activity/index.vue'

import TalkCollect from '../views/talk/collect/index.vue'
import TalkComment from '../views/talk/comment/index.vue'
import TalkPraise from '../views/talk/praise/index.vue'
import TalkAlbum from '../views/talk/album/index.vue'
import PhotosAlbum from '../views/talk/album/photos.vue'
import CustomAlbum from '../views/talk/album/custom.vue'
import TalkJournal from '../views/talk/journal/index.vue'
import TalkTheme from '../views/talk/theme/index.vue'
import Mood from '../views/talk/mood/index.vue'
import TalkStatistics from '../views/talk/statistics/index.vue'
import TalkVisit from '../views/talk/statistics/visit/index.vue'
import TalkIp from '../views/talk/statistics/ip/index.vue'


const arrss: any = {
  Default,
  Basic,
  Theme,
  Site,
  SiteChannel,
    Navigation,
  NavigationMain,
  Single,
    Static,
    MenuRouter,
  ModuleDefault,
  // ChannelIndex,
  Channel,
  ChannelSetting,
  ArticleList,
  Article,
  Links,
  Advertisement,
  AdvertisementPosition,
  AdvertisementOrder,
  Spread,
  Partner,

  SingleArticle,
  Recycle,
  Label,
  Collect,
  Comment,
  Praise,
  Download,
  MusicList,
  MusicScore,
  MusicSinger,
  MusicLrc,
  MusicEffects,
  HaoSiteArticle,
  EffectList,
  AnswerList,
  SourcePsdList,
  DesignList,
  Album,
  VideoList,
  
  Slideshow,
  SlideshowList,

  Appstore,
//   Permissions,
  Statistics,
  Visit,
  Domain,
  Engine,
  Ip,
  // User,
  UserBasic,
//   // UserPassword,
  UserDefault,
  UserList,
  UserGrade,
  UserRole,
  RoleGrade,
  UserGroup,
  UserSign,
  UserAudit,
  UserBanuser,
  UserRecommend,
  UserSecurity,
  TalkJournal,
  TalkTheme,
  Mood,
  TalkStatistics,
  TalkVisit,
  TalkIp,
  UserSetting,
  Personal,
  PersonalDefault,
  PersonalBasic,
  PersonalAppstore,
  PersonalChannel,
  PersonalGrade,
  PersonalTalk,
  Collection,
  collectionTemList,
  CollectionList,
  CollectionRecycle,
  MysqlIndex,
  Mysql,
  Tag,
  // Order,
  OrderNew,
//   OrderDoing,
//   OrderCompleted,
//   Card,
  Service,
  MessageBoard,
  Feedback,
  Announcement,
//   Email,
  Job,
  Resume,
  Message,
  MessageDetail,
  KnowledgeCate,
  KnowledgeList,
  KnowledgeArticle,
  Customize,
  CustomizeList,
  ManagerLoginLog,
  UserLoginLog,
//   Operating,
  Space,
  codeDefault,
  codeCate,
  codeList,
//   SettingChannel,
  Vote,
  VoteList,
  Robot,
  RobotVersion,
  RobotArticle,
  Intention,
  Speech,
  Chat,
  ChatList,
  Favorites,
  Search,
  SearchView,
  SearchKeyword,
  searchList,
  Template,
  Talk,
  TalkList,
  Activity,
  TalkCollect,
  TalkComment,
  TalkPraise,
  TalkAlbum,
  PhotosAlbum,
  CustomAlbum
}



const routes: Array<RouteRecordRaw> = [
  { path: '/test', component: () => import('../views/layout/test.vue')},
  { path: '/login', component: () => import('../views/login/index.vue')},
  {
    path: '/space',
    name: 'space',
    component: Space,
  }
]

export const asyncRoutes: any = [
  {
    path: '/admin',
    name: 'home',
    component: Index,
    children: [{
      path: '/admin',
      name: 'home',
      component: Default,
    }]
  },
]



export const loop = (data: any) => {  
  return data.map((item: any) => {
    if (item.children) {
      if(item.component == ""){
        alert(item.name)
      }
      const aaa = {
        id: item.id,
        module: item.module,
        name: item.module+item.id,
        path: item.fid !== '4' ? 'admin' : item.path, // '/admin', //item.path,
        channel: item.channel,
        component: item.module === '' ? arrss[item.component] : () => import('../views/layout/components/main/index.vue'),
        sidebar: item.sidebar,
        exact: true,
        icon: item.icon,
        isshow: false,
        meta: {
          title: item.name,
          icon: item.icon,
        },
        children: loop(item.children),
      }

      if (item.node && item.sidebar === 'true' && item.disabled === 'true') {
        const cc = item.path
        item.node = cc.replace('/admin', `/admin/${item.node}`)
      }
      // 面包屑
      // BreadcrumbArr.push({
      //   name: item.name,
      //   path: item.path,
      //   node: item.node,
      //   disabled: item.disabled,
      // })
      return aaa
    }

    const bbb = {
      id: item.id,
      module: item.module,
      name: item.module+item.id,
      path: item.path,
      channel: item.channel,
      zujianming: item.component,
      component: arrss[item.component],
      sidebar: item.sidebar,
      exact: true,
      icon: item.icon,
      meta: {
        title: item.name,
        icon: 'icon-link',
      },
    }
    if (item.node && item.sidebar === 'true' && item.disabled === 'true') {
      const cc = item.path
      item.node = cc.replace('admin', `admin/${item.node}`)
    }
    // 面包屑
    // BreadcrumbArr.push({
    //   name: item.name,
    //   path: item.path,
    //   node: item.node,
    //   disabled: item.disabled,
    // })
    return bbb
  })
}


export const Breadcrumb = (data: any, params: any) => {  
  debugger
  // const BreadcrumbArr: { name: any; path: any; node: any; disabled: any }[] = []
  return data.map((item: any) => {
    
    if (item.children) {
      params.push({
name: item.name,
path: item.path
      })
      // 面包屑
      const aaa = {
        name: item.name,
        path: item.path,
        node: item.node,
        disabled: item.disabled,
        children: Breadcrumb(item.children, params),
      }

      return aaa

    }
params = []
    // 面包屑
    const bbb = {
      name: item.name,
      path: item.path,
      node: item.node,
      disabled: item.disabled,
      canvas: params
    }

    return bbb
  })
}


// const a = loop(menuRouters)
// export const Breadcrumb = asyncRoutes.concat(BreadcrumbArr)
// export const adminRouter = asyncRoutes.concat(a)


export default routes
