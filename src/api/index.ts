import https from '../utils/http'

const http = new https()

const api:any =  {
  //用户登录
  Detect(params: any) {
    return http.request('user', 'Detect', 'post', params)
  },

  //用户登录
  Login(params: any) {
    return http.request('user', 'Login', 'post', params)
  },
  // 默认数据
  Default(params: any) {
    return http.request('vue', 'defaultPage', 'post', params)
  },
  // 默认数据
  channelDefault(params: any) {
    return http.request('vue', 'channelDefault', 'post', params)
  },
  // 默认数据
  userDefault(params: any) {
    return http.request('vue', 'userDefault', 'post', params)
  },
  // 默认数据
  defaultStatistics(params: any) {
    return http.request('vue', 'defaultStatistics', 'post', params)
  },

  // 数据统计
  dataStatistics(params: any) {
    return http.request('vue', 'dataStatistics', 'post', params)
  },

  // 默认数据
  talkDefaultStatistics(params: any) {
    return http.request('vue', 'talkDefaultStatistics', 'post', params)
  },

  // 搜索默认数据
  defaultSearch(params: any) {
    return http.request('vue', 'defaultSearch', 'post', params)
  },
  // 微博搜索默认数据
  TalkdefaultSearch(params: any) {
    return http.request('vue', 'TalkdefaultSearch', 'post', params)
  },  

  // 新增
  insert(params: any) {
    return http.request('common', 'insert', 'post', params)
  },
  // 删除
  delete(params: any) {
    return http.request('common', 'delete', 'post', params)
  },
  // 更改
  update(params: any) {
    return http.request('common', 'update', 'post', params)
  },
  // 查询
  select(params: any) {
    return http.request('vue', 'select', 'post', params)
  },
  // 单条数据详情
  detail(params: any) {
    return http.request('common', 'detail', 'post', params)
  },
  // 新增
  insertArticle(params: any) {
    return http.request('channel', 'insertArticle', 'post', params)
  },
  // 删除文档
  deleteArticle(params: any) {
    return http.request('channel', 'deleteArticle', 'post', params)
  },
  // 删除和还原
  removeAndRestore(params: any) {
    return http.request('channel', 'removeAndRestore', 'post', params)
  },
  // 更改
  updateArticle(params: any) {
    return http.request('channel', 'updateArticle', 'post', params)
  },

  // 文章列表查询接口
  articleList(params: any) {
    return http.request('channel', 'articleList', 'post', params)
  },
  // 文章详情查询接口
  articleDetail(params: any) {
    return http.request('channel', 'articleDetails', 'post', params)
  },
  // 分类列表查询接口
  cateList(params: any) {
    return http.request('common', 'systemCate', 'post', params)
  },
   // 文章相关功能如评论、点赞、收藏
   articleRelated(params: any) {
    return http.request('channel', 'articleRelated', 'post', params)
  },  
  // 简单分类
  simpleCategory (params: any) {
    return http.request('common', 'simpleCategory', 'post', params)
  },
  // 移动文档
  moveAticle(params: any) {
    return http.request('channel', 'moveAticle', 'post', params)
  },
  // 更新状态
  updateStatus(params: any) {
    return http.request('common', 'updateStatus', 'post', params)
  },
  // 更新保存
  updateSave(params: any) {
    return http.request('common', 'updateSave', 'post', params)
  },
  // 更新顺序
  updateSort(params: any) {
    return http.request('common', 'updateSort', 'post', params)
  },  
  // 用户查询
  userList(params: any) {
    return http.request('vue_user', 'userList', 'post', params)
  },
  // 用户查询
  userDetail(params: any) {
    return http.request('vue_user', 'userDetail', 'post', params)
  },
  // 用户推送
  push(params: any) {
    return http.request('user', 'push', 'post', params)
  },
  // 活跃用户
  activeUser(params: any) {
    return http.request('user', 'activeUser', 'post', params)
  },
  // 用户权限
  userGrade(params: any) {
    return http.request('vue_user', 'userGrade', 'post', params)
  },
  // 新增权限
  insertGrade(params: any) {
    return http.request('vue', 'insertGrade', 'post', params)
  },
  // 用户等级
  userGroup(params: any) {
    return http.request('vue_user', 'userGroup', 'post', params)
  },
  // 用户审核
  userAudit(params: any) {
    return http.request('vue_user', 'userAudit', 'post', params)
  },
  // 用户禁言
  userBanuser(params: any) {
    return http.request('vue_user', 'userBanuser', 'post', params)
  },
  // 用户禁言
  violationSetting(params: any) {
    return http.request('vue_user', 'violationSetting', 'post', params)
  },  
  // 推荐关注
  userRecommend(params: any) {
    return http.request('vue_user', 'userRecommend', 'post', params)
  },
  // 密保问题
  userSecurity(params: any) {
    return http.request('vue_user', 'userSecurity', 'post', params)
  },
  // 主题
  theme(params: any) {
    return http.request('vue_user', 'theme', 'post', params)
  },
  // 背景特效
  effects(params: any) {
    return http.request('vue_user', 'effects', 'post', params)
  },
  // 挂件装饰
  pendant(params: any) {
    return http.request('vue_user', 'pendant', 'post', params)
  },
  // 关闭
  openAndClose(params: any) {
    return http.request('vue', 'openAndClose', 'post', params)
  },
  // 幻灯片
  slideshow(params: any) {
    return http.request('vue', 'slideshow', 'post', params)
  },
  // 幻灯片
  slideshowList(params: any) {
    return http.request('vue', 'slideshowList', 'post', params)
  },
  // 图片空间
  space(params: any) {
    return http.request('space', 'space', 'get', params)
  },
  // 创建文件夹
  createfile(params: any) {
    return http.request('space', 'createfile', 'post', params)
  },
  // 删除图片
  deletefile(params: any) {
    return http.request('space', 'deletefile', 'post', params)
  },
  // 自定义
  anpassen(params: any) {
    return http.request('vue', 'anpassen', 'post', params)
  },
  // 自定义字段管理
  anpassen_field(params: any) {
    return http.request('vue', 'anpassen_field', 'post', params)
  },
  // 新增字段
  add_anpassen(params: any) {
    return http.request('vue', 'add_anpassen', 'post', params)
  },
  // 更改字段
  update_anpassen(params: any) {
    return http.request('vue', 'update_anpassen', 'post', params)
  },
  // 删除字段
  delete_columns(params: any) {
    return http.request('vue', 'delete_columns', 'post', params)
  },
  // 申请审核
  applyCheck(params: any) {
    return http.request('vue', 'applyCheck', 'post', params)
  },

  // 内容审核
  checkContent(params: any) {
    return http.request('vue', 'checkContent', 'post', params)
  },
  // 内容退回
  managementReturn(params: any) {
    return http.request('vue', 'managementReturn', 'post', params)
  },
  // 获取自定义字段
  getColumns(params: any) {
    return http.request('vue', 'getColumns', 'post', params)
  },
  // 频道导航
  channelNavigation(params: any) {
    return http.request('vue', 'channelNavigation', 'post', params)
  },
  // 导航列表
  navigation(params: any) {
    return http.request('vue', 'navigation', 'post', params)
  },
  // 导航菜单详情信息
  navigationDetail(params: any) {
    return http.request('vue', 'navigationDetail', 'post', params)
  },
  // 单页列表管理
  singleNav(params: any) {
    return http.request('vue', 'singleNav', 'post', params)
  },
  // 更新静态
  updateStatic(params: any) {
    return http.request('statics', 'updateStatic', 'post', params)
  },
  // 获取标签值
  getFlag(params: any) {
    return http.request('vue', 'tagCheckbox', 'post', params)
  },
  // 获取标签值
  getTagCheckbox(params: any) {
    return http.request('vue', 'getTagCheckbox', 'post', params)
  },  
  // 获取tag标签
  getTag(params: any) {
    return http.request('common', 'getTag', 'post', params)
  },
  // 获取路由信息r
  getRouterInfo(params: any) {
    return http.request('vue', 'routerInfo', 'post', params)
  },
  // 基本信息
  basicInfo(params: any) {
    return http.request('vue', 'basicInfo', 'post', params)
  },
  // 更新基本信息
  updateInfo(params: any) {
    return http.request('vue', 'updateBasicInfo', 'post', params)
  },
  // 数据库列表
  mysql(params: any) {
    return http.request('vue', 'mysql', 'post', params)
  },
  // 数据库备份
  backup(params: any) {
    return http.request('database', 'backup', 'post', params)
  },
  // 数据库备份
  backupManage(params: any) {
    return http.request('database', 'backupManage', 'post', params)
  },
  // 应用商城
  appstore(params: any) {
    return http.request('vue', 'appstore', 'post', params)
  },

  // 获取功能模块
  getAppstore(params: any) {
    return http.request('vue', 'getAppstore', 'post', params)
  },

  // 静态生成列表
  static(params: any) {
    return http.request('vue', 'staticList', 'post', params)
  },
  // 更新状态
  changeData(params: any) {
    return http.request('common', 'changeData', 'post', params)
  },
  // 路由管理
  routerSelect(params: any) {
    return http.request('vue', 'routerSelect', 'post', params)
  },
  // 路由管理
  routerDetail(params: any) {
    return http.request('vue', 'routerDetail', 'post', params)
  },
  // 角色权限
  rolegrade(params: any) {
    return http.request('vue', 'rolegrade', 'post', params)
  },
  // 用户基本信息
  UserBaiscInfo (params: any) {
    return http.request('user', 'userBaiscInfo', 'post', params)
  } ,  
  // 更改用户信息
  editUserInfo(params: any) {
    return http.request('user', 'editUserInfo', 'post', params)
  },
  // 更新其他用户信息
  updateUserInfo(params: any) {
    return http.request('vue_user', 'updateUserInfo', 'post', params)
  },
  // 用户退出
  signOut (params: any) {
    return http.request('user', 'signOut', 'post',params)
  },
  // 角色列表
  roleList (params: any) {
    return http.request('user', 'roleList', 'post',params)
  },
  // 评论
  comment(params: any) {
    return http.request('vue', 'comment', 'post', params)
  },
  // 收藏
  collect(params: any) {
    return http.request('vue', 'collect', 'post', params)
  },
  // 收藏
  praise(params: any) {
    return http.request('vue', 'praise', 'post', params)
  },
  // 下载
  download(params: any) {
    return http.request('vue', 'download', 'post', params)
  },
  // 在线留言
  messageBoard(params: any) {
    return http.request('vue', 'messageBoard', 'post', params)
  },
  // 查看留言
  viewMessageBoard(params: any) {
    return http.request('vue', 'view_messageBoard', 'post', params)
  },
  // 回复留言
  replyMessageBoard(params: any) {
    return http.request('vue', 'reply_messageBoard', 'post', params)
  },
  // 意见反馈
  feedback(params: any) {
    return http.request('vue', 'feedback', 'post', params)
  },
  // 访问统计
  visitStatistics(params: any) {
    return http.request('vue', 'visit_statistics', 'post', params)
  },
  // 今日受访
  interviewedTodayStatistics(params: any) {
    return http.request('vue', 'related_statistics', 'post', params)
  },
  // 今日IPI
  todayIp(params: any) {
    return http.request('vue', 'today_ip', 'post', params)
  },
  // 今日IPI
  ipDetial(params: any) {
    return http.request('vue', 'ip_detial', 'post', params)
  },
  // 来路域名占比
  domainPercentage(params: any) {
    return http.request('vue', 'domain_percentage', 'post', params)
  },
  // 搜索引擎占比
  enginePercentage(params: any) {
    return http.request('vue', 'engine_percentage', 'post', params)
  },
  // 采集节点列表
  nodeList(params: any) {
    return http.request('vue', 'node_list', 'post', params)
  },
  // 开始采集
  collection(params: any) {
    return http.request('vue', 'collection', 'post', params)
  },
  // 采集列表
  collectionList(params: any) {
    return http.request('vue', 'collectionList', 'post', params)
  },
  // 临时采集列表
  temCollectionList(params: any) {
    return http.request('vue', 'temCollectionList', 'post', params)
  },
  // 采集临时表导入
  collectionImport(params: any) {
    return http.request('vue', 'collectionImport', 'post', params)
  },
  // 生成订单
  createOrder(params: any) {
    return http.request('vue', 'createOrder', 'post', params)
  },
  // 更新图片
  saveImage(params: any) {
    return http.request('space', 'saveImage', 'post', params)
  },
  // 新建投票
  createVote(params: any) {
    return http.request('vue', 'createVote', 'post', params)
  },
  // 删除投票
  deleteVote(params: any) {
    return http.request('vue', 'deleteVote', 'post', params)
  },
  // 更改投票信息
  updateVote(params: any) {
    return http.request('vue', 'updateVote', 'post', params)
  },
  // 投票项目列表查询
  selectVote(params: any) {
    return http.request('vue', 'selectVote', 'post', params)
  },
  // 投票信息查询
  selectVoteList(params: any) {
    return http.request('vue', 'selectVoteList', 'post', params)
  },
  // 投票结果
  knowledgeList(params: any) {
    return http.request('vue', 'knowledgeList', 'post', params)
  },
  // 系统消息发布
  sendSystemMessage(params: any) {
    return http.request('vue', 'sendSystemMessage', 'post', params)
  },  
  // 系统消息
  systemMessage(params: any) {
    return http.request('vue', 'systemMessage', 'post', params)
  },
  // 系统消息
  messageDetail(params: any) {
    return http.request('vue', 'systemMessageDetail', 'post', params)
  },
  // 站内搜索
  siteSearch(params: any) {
    return http.request('vue', 'siteSearch', 'get', params)
  },
  // 站内搜索
  template(params: any) {
    return http.request('temp', 'template', 'get', params)
  },
  // 站内搜索
  saveFile(params: any) {
    return http.request('temp', 'saveFile', 'post', params)
  },
  // 添加应用
  appstoreInsert(params: any) {
    return http.request('vue_user', 'appstoreInsert', 'post', params)
  },
  // 微博
  talkList(params: any) {
    return http.request('talk', 'talkInit', 'post', params)
  },
  // 话题
  activity(params: any) {
    return http.request('talk', 'activityList', 'post', params)
  },
  // 心情
  mood(params: any) {
    return http.request('vue', 'mood', 'post', params)
  },
  // 话题收藏
  TalkCollect (params: any) {
    return http.request('talk', 'TalkCollect', 'post', params)
  },
  // 话题评论
  TalkComment (params: any) {
    return http.request('talk', 'TalkComment', 'post', params)
  },  
  // 话题点赞
  TalkPraise (params: any) {
    return http.request('talk', 'TalkPraise', 'post', params)
  }, 
  // 上传图片
  uploadImage (params: any) {
    return http.request('common', 'uploadImage', 'post', params)
  },
  // 设置问题
  setCover (params: any) {
    return http.request('channel', 'setCover', 'post', params)
  },
  // 收藏夹
  favorites(params: any) {
    return http.request('vue', 'favorites', 'post', params)
  },
  // 收藏夹
  favoriteList(params: any) {
    return http.request('vue', 'favoriteList', 'post', params)
  },  
  // 收藏夹
  favoriteDetali(params: any) {
    return http.request('vue', 'favoriteDetali', 'post', params)
  },    
  // 微博设置列表
  talkSetting(params: any) {
    return http.request('vue', 'talkSetting', 'post', params)
  },  
  // 微博设置  
  setTalkAuthority(params: any) {
    return http.request('vue', 'setTalkAuthority', 'post', params)
  },  
  // 刷新更新
  refreshBuild(params: any) {
    return http.request('vue', 'refreshBuild', 'post', params)
  },      

  // 设置
  setDefault(params: any) {
    return http.request('vue', 'setDefault', 'post', params)
  },     
  
  // 用户权限
  userAuthority(params: any) {
    return http.request('vue', 'userAuthority', 'post', params)
  },     

  // 用户权限设置
  setUserAuthority(params: any) {
    return http.request('vue', 'setUserAuthority', 'post', params)
  },     
  
  // 用户功能权限
  setUserFunctionAuthority(params: any) {
    return http.request('vue', 'setUserFunctionAuthority', 'post', params)
  },  

// 新增机器人
insertRobot (params: any) {
  return http.request('robot', 'insertRobot', 'post', params)
  } , 
  
// 更改机器人
updateRobot (params: any) {
  return http.request('robot', 'updateRobot', 'post', params)
  } ,   
  
  // 机器人
  robot(params: any) {
    return http.request('vue', 'robot', 'post', params)
  },     

  // 意图库管理
  speechLib(params: any) {
    return http.request('vue', 'speechLib', 'post', params)
  },     

  // 话术管理
  speech(params: any) {
    return http.request('vue', 'speech', 'post', params)
  },     

// 开始会话
begin (params: any) {
  return http.request('robot', 'begin', 'post', params)
  } , 
   
// 开始中
talking (params: any) {
  return http.request('robot', 'talking', 'post', params)
  } , 
  
// 会话结束
close (params: any) {
  return http.request('robot', 'close', 'post', params)
  } ,   

  // 对话记录
  chat(params: any) {
    return http.request('vue', 'chat', 'post', params)
  },     

  // 对话详情
  chatDetail(params: any) {
    return http.request('vue', 'chatDetail', 'post', params)
  },  
  // 日历查询
  Calendar (params: any) {
    return http.request('common', 'Calendar', 'post', params)
  },  

  // 语音播报
  voiceBroadcast (params: any) {
    return http.request('common', 'voiceBroadcast', 'post', params)
  },  

  // 系统设置
  systemSetting (params: any) {
    return http.request('vue', 'systemSetting', 'post', params)
  },  

  // 消息设置
  messageSetting (params: any) {
    return http.request('vue', 'messageSetting', 'post', params)
  },  

  // 站点搜索关键词库管理
  searchWordList(params: any) {
    return http.request('vue', 'searchWordList', 'post', params)
  },  

  // 搜索信息列表
  searchList(params: any) {
    return http.request('vue', 'searchList', 'post', params)
  },  

  // 相邻
  getNeighbor(params: any) {
    return http.request('vue', 'getNeighbor', 'post', params)
  }, 

  neighbor(params: any) {
    return http.request('vue', 'neighbor', 'post', params)
  }, 

  // 广告列表
  advertisement(params: any) {
    return http.request('vue', 'advertisement', 'post', params)
  }, 

  // 广告位置列表
  advertisementPosition(params: any) {
    return http.request('vue', 'advertisementPosition', 'post', params)
  }, 

  // 广告位置列表
  getAdPosition(params: any) {
    return http.request('vue', 'getAdPosition', 'post', params)
  }, 

  // 更改广告位
  updateAdPosition(params: any) {
    return http.request('vue', 'updateAdPosition', 'post', params)
  }, 

  // 将广告生成json文件
  createAdJson(params: any) {
    return http.request('vue', 'createAdJson', 'post', params)
  }, 

  // 站点列表
  siteList (params: any) {
    return http.request('vue', 'siteList', 'post', params)
  }, 
  // 网站频道和页面
  siteChannel (params: any) {
    return http.request('vue', 'siteChannel', 'post', params)
  }, 

  // 答案列表
  answerList(params: any) {
    return http.request('channel', 'answerList', 'post', params)
  }, 

  // 歌曲列表
  musicList(params: any) {
    return http.request('channel', 'musicList', 'post', params)
  }, 
  
  //
  sourcePsdList (params: any) {
    return http.request('channel', 'sourcePsdList', 'post', params)
  }, 

  // 频道标签查询
  channelTag (params: any) {
    return http.request('vue', 'channelTag', 'post', params)
  }, 

  // 选择主题
  chooseStyle (params: any) {
    return http.request('vue', 'chooseStyle', 'post', params)
  },
  
  // 导出MySQL
  exportMysql (params: any) {
    return http.request('vue', 'exportMysql', 'post', params)
  },

  // 数据库管理
  mysqldb (params: any) {
    return http.request('vue', 'mysqldb', 'post', params)
  },

  // 切换数据库
  changeMysql (params: any) {
    return http.request('vue', 'changeMysql', 'post', params)
  },

  // 预览专辑
  viewAlbum (params: any) {
    return http.request('channel', 'viewAlbum', 'post', params)
  },
  // 查看歌手
  viewSinger (params: any) {
    return http.request('channel', 'viewSinger', 'post', params)
  },

  // 图片专辑
  albumList (params: any) {
    return http.request('user', 'albumList', 'post', params)
  },

  // 话题相册
  talkAlbum (params: any) {
    return http.request('talk', 'talkAlbum', 'post', params)
  },

  // 头像背景
  GetHistoryPhotos (params: any) {
    return http.request('user', 'getAllPhotos', 'post', params)
  },     
    
  // 自定义相册
  photoList (params: any) {
    return http.request('user', 'photoList', 'post', params)
  },

  // 日志
  journal (params: any) {
    return http.request('user', 'journal', 'post', params)
  },

  // 获取挂件文件
  getPendantFile (params: any) {
    return http.request('user', 'getPendantFile', 'post', params)
  },
  // 鼠标特效
  getCursorFile (params: any) {
    return http.request('user', 'getCursorFile', 'post', params)
  },

  // 用户自定义组
  customGroup (params: any) {
    return http.request('user', 'customGroup', 'post', params)
  } ,   
  // 话题搜索用户 
  talkSearchUser (params: any) {
    return http.request('talk', 'talkSearchUser', 'post', params)
  } ,  
  // 设置权限
  setAuthority (params: any) {
    return http.request('vue', 'setAuthority', 'post', params)
  } ,  
  // 滚动消息
  scrollMessage (params: any) {
    return http.request('vue', 'scrollMessage', 'post', params)
  } ,  
  // 查询设置
  selectSetting (params: any) {
    return http.request('vue', 'selectSetting', 'post', params)
  },
  ChooseTheme (params: any) {
    return http.request('common', 'chooseTheme', 'post', params)
  } , 

  insertBackground (params: any) {
    return http.request('vue', 'insertBackground', 'post', params)
  } , 
  updateBackground (params: any) {
    return http.request('vue', 'updateBackground', 'post', params)
  } , 
  emoticonsList (params: any) {
    return http.request('vue', 'emoticonsList', 'post', params)
  } , 
  getEmoticons (params: any) {
    return http.request('vue', 'getEmoticons', 'post', params)
  } , 
  // 导入表情
  importEmoticons (params: any) {
    return http.request('vue', 'importEmoticons', 'post', params)
  } ,   

  channelSetting (params: any) {
    return http.request('vue', 'channelSetting', 'post', params)
  } ,  
  
  // 获取网站信息
  getWebsiteInfo (params: any) {
    return http.request('common', 'getWebsiteInfo','post', params)
  },  

  // 轨迹详情
  footprintDetail (params: any) {
    return http.request('common', 'footprintDetail','post', params)
  },  

  // 3D立体空间配置
  threeSetting (params: any) {
    return http.request('vue', 'threeSetting','post', params)
  },  

  // 养鱼记录
  seaFishList (params: any) {
    return http.request('vue', 'seaFishList','post', params)
  },  
  
}

export default api