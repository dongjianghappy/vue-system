// 模块
export const MODUDLE: any = [
  {
    value: 'setting',
    name: '设置',
    channel: false,
  },
  {
    module: 'order',
    value: 'order',
    name: '订单',
    type: 'plate',
    icon: 'order',
  },
  {
    module: 'user',
    value: 'user',
    name: '用户',
    type: 'plate',
    icon: 'user',
  },
  {
    module: 'service',
    value: 'service',
    name: '服务',
    type: 'plate',
    icon: 'service',
  },
  {
    module: 'business',
    value: 'spread',
    name: '运营',
    type: 'plate',
    icon: 'operation',
  },
  {
    value: 'space',
    name: '空间',
    type: 'plate',
    icon: '62gongzuokongjian',
  },
  {
    module: 'talk',
    value: 'talk',
    name: '微博',
    type: 'plate',
    icon: 'star',
  },
  {
    module: 'tag',
    value: 'tag/core',
    name: '标签',
    type: 'plate',
    icon: 'tags',
  },
  {
    module: 'vote',
    value: 'vote/item',
    name: '投票',
    type: 'plate',
    icon: 'vote',
  },
]

export const TEXT_TYPE = [
  {
    value: 'input',
    name: '单行文本',
  },
  {
    value: 'textarea',
    name: '多行文本',
  },
  {
    value: 'select',
    name: '下拉框',
  },  
  {
    value: 'radio',
    name: '单选框',
  },
  {
    value: 'checkbox',
    name: '复选框',
  },
  {
    value: 'switch',
    name: '开关',
  },
]

// 友链平台
export const LINK_TYPE = [
  {
    value: '0',
    name: '2898',
  },
  {
    value: '1',
    name: '51链',
  },
  {
    value: '2',
    name: '易联网',
  },
  {
    value: '3',
    name: '95链',
  },
  {
    value: '4',
    name: '本站',
  },
  {
    value: '5',
    name: '爱链网',
  },
  {
    value: '6',
    name: '买链接',
  },
]

// 友链方式
export const LINK_METHOD = [
  {
    value: '0',
    name: '交换',
  },
  {
    value: '1',
    name: '出售',
  },
]

// 出售状态
export const SELL_STATUS = [
  {
    value: '0',
    name: '过期',
  },
  {
    value: '1',
    name: '正常',
  },
]

export const CHANNEL_TYPE = [
  {
    value: 'article',
    name: '资讯',
  },
  {
    value: 'topic',
    name: '专题',
  },
  {
    value: 'picture',
    name: '图库',
  },
  {
    value: 'tech',
    name: '技术',
  },
  {
    value: 'source',
    name: '素材',
  },
  {
    value: 'notes',
    name: '笔记',
  },
]

// 数据类型
export const DATA_TYPE = [
  {
    value: '0',
    name: '过期',
  },
  {
    value: '1',
    name: '正常',
  },
]

// 表单元素类型
export const FORM_TYPE = [
  {
    value: 'input',
    name: '单行文本',
  },
  {
    value: 'textarea',
    name: '多行文本',
  },
  {
    value: 'radio',
    name: '单选框',
  },
  {
    value: 'checkbox',
    name: '复选框',
  },
  {
    value: 'select',
    name: '下拉框',
  },
]

// 广告来源
export const AD_SOURCE = [
  {
    value: '0',
    name: '本站广告',
  },
  {
    value: '1',
    name: '百度广告',
  },
  {
    value: '2',
    name: '阿里广告',
  },
  {
    value: '3',
    name: '谷广告歌',
  },
  {
    value: '4',
    name: '联盟广告',
  },
]
// 广告页面
export const AD_DISPLAY = [
  {
    value: '0',
    name: '全站',
  },
  {
    value: '1',
    name: '首页',
  },
  {
    value: '2',
    name: '栏目',
  },
  {
    value: '3',
    name: '详情',
  },
  {
    value: '4',
    name: '下载',
  },
]
// 广告类型
export const AD_TYPE = [
  {
    value: '0',
    name: '图片',
  },
  {
    value: '1',
    name: '文字',
  },
  {
    value: '2',
    name: '代码',
  },
]

// 文档排序方式
export const ARTICLE_ORDERBY = [
  {
    value: 'desc',
    name: 'ID递增',
  },
  {
    value: 'asc',
    name: 'ID递减',
  },
  {
    value: '2',
    name: '访问量',
  },
  {
    value: '3',
    name: '评论',
  },
  {
    value: '4',
    name: '下载量',
  },
]

// 关键词类型
export const KEYWORD_TYPE = [
  {
    value: '1',
    name: '核心关键词',
  },
  {
    value: '2',
    name: '目标关键词',
  },
  {
    value: '0',
    name: '长尾关键词',
  },
]

// 关键词类型
export const ORDER_TYPE = [
  {
    value: '0',
    name: '新订单',
  },
  {
    value: '1',
    name: '进行中',
  },
  {
    value: '2',
    name: '已完成',
  },
]

// 关键词类型
export const NAV_TYPE = [
  {
    value: 'main',
    name: '主导航',
  },
  {
    value: 'top',
    name: '顶部导航',
  },
  {
    value: 'bottom',
    name: '底部导航',
  },
  {
    value: 'quick',
    name: '快捷导航',
  },
  {
    value: 'home',
    name: '家园导航',
  },
]

// 关键词类型
export const COLLECTTION_TYPE = [
  {
    value: '0',
    name: '普通文章',
  },
  {
    value: '1',
    name: '图片内容',
  },
]

// 公告类型
export const ANNOUNCEMENT_TYPE = [
  {
    value: '1',
    name: '公告',
  },
  {
    value: '2',
    name: '通知',
  },
]

export const ICON = [
  {
    name: '首页',
    icon: 'home',
  },
  {
    name: '设置',
    icon: 'shezhi',
  },
  {
    name: '分类',
    icon: 'list',
  },
  {
    name: '文档',
    icon: 'article',
  },
  {
    name: '点赞',
    icon: 'like',
  },
  {
    name: '评论',
    icon: 'comment',
  },
  {
    name: '收藏',
    icon: 'star',
  },
  {
    name: '下载',
    icon: 'download',
  },
  {
    name: '回收站',
    icon: 'recycle',
  },
  {
    name: '幻灯片',
    icon: 'slideshow',
  },
  {
    name: '应用',
    icon: 'app',
  },
  {
    name: '采集',
    icon: 'gather',
  },
  {
    name: '数据库',
    icon: 'mysql',
  },
  {
    name: '模型',
    icon: 'moxing',
  },
  {
    name: '路由',
    icon: 'route',
  },
  {
    name: '点',
    icon: 'dot',
  },
  {
    name: '消息',
    icon: 'email',
  },
  {
    name: '订单',
    icon: 'order',
  },
]

// 标签类型
export const LABEL_TYPE = [
  {
    value: 'nav',
    name: '导航',
  },
  {
    value: 'cat',
    name: '分类',
  },
  {
    value: 'art',
    name: '文档',
  },
]

// 推广类型
export const SPREAD_TYPE = [
  {
    value: '0',
    name: '普通',
  },
  {
    value: '1',
    name: '推荐',
  },
]

// 推广区域
export const SPREAD_AREA = [
  {
    value: '0',
    name: '头部',
  },
  {
    value: '1',
    name: '中部',
  },
  {
    value: '2',
    name: '底部',
  },
  {
    value: '3',
    name: '微博',
  },
]

// 排序
export const SORTER = [
  {
    value: '',
    name: '(默认排序)',
  },
  {
    value: 'id|desc',
    name: 'ID递减',
  },
  {
    value: 'id|asc',
    name: 'ID递增',
  },
  {
    value: 'sort|desc',
    name: '顺序递减',
  },
  {
    value: 'sort|asc',
    name: '顺序递减',
  },
]

// 推广类型
export const APP_CENTER = [
  {
    value: '1',
    name: '频道管理',
  },
  {
    value: '2',
    name: '应用中心',
  },
  {
    value: '3',
    name: '功能权限',
  },
]

// 天数
export const BANNED_TYPE = {
    0: '正常',
    1: '禁言',
    2: '封号',
  }




// 天数
export const BANNED_DAY = [
  {
    value: '0',
    name: '1天',
  },
  {
    value: '1',
    name: '3天',
  },
  {
    value: '2',
    name: '7天',
  },
  {
    value: '3',
    name: '30天',
  },
  {
    value: '4',
    name: '永久',
  },
]

// 友链平台
export const REASON_TYPES = [
  {
    value: '0',
    name: '过于简单',
  },
  {
    value: '1',
    name: '非原创',
  },
  {
    value: '2',
    name: '图片尺寸不符合',
  }
]

// 服务器名称
export const SERVER_NAME = [
  {
    value: 'localhost',
    name: '本地服务',
  },
  {
    value: 'yunxi10.com',
    name: '07素材网',
  },
  {
    value: 'dongblog.com',
    name: '东江博客',
  }
]

// 推广类型
export const TEMPLATES = [
  {
    value: 'index_article.htm',
    name: '频道模板',
  },
  {
    value: 'list_article.htm',
    name: '栏目模板',
  },
  {
    value: 'article_article.htm',
    name: '详情模板',
  },
  {
    value: 'design_list_article.htm',
    name: '资源设计图栏目模板',
  },    
  {
    value: 'design_article_article.htm',
    name: '资源设计图详情模板',
  },  
  {
    value: 'singlepage.htm',
    name: '单页模板',
  },  
]

// 推广类型
export const COLOR = [
  {
    value: 'red',
    name: '红色',
  },
  {
    value: 'orange',
    name: '橙色',
  },
  {
    value: 'yellow',
    name: '黄色',
  },
  {
    value: 'green',
    name: '绿色',
  },
  {
    value: 'purple',
    name: '紫色',
  },
  {
    value: 'pink',
    name: '粉色',
  },
  {
    value: 'cyan',
    name: '青色',
  },
  {
    value: 'blue',
    name: '蓝色',
  },
  {
    value: 'brown',
    name: '棕色',
  },
  {
    value: 'white',
    name: '白色',
  },
  {
    value: 'black',
    name: '黑色',
  }   
]

const enums = {
  module: MODUDLE,
  textType: TEXT_TYPE,
  linkType: LINK_TYPE,
  channelType: CHANNEL_TYPE,
  linkMethod: LINK_METHOD,
  sellStatus: SELL_STATUS,
  dataTYpe: DATA_TYPE,
  formType: FORM_TYPE,
  // 广告
  adSource: AD_SOURCE,
  adType: AD_TYPE,
  adDisplay: AD_DISPLAY,
  articleOderBy: ARTICLE_ORDERBY,
  keywordTyoe: KEYWORD_TYPE,
  orderType: ORDER_TYPE,
  navType: NAV_TYPE,
  collectionType: COLLECTTION_TYPE,
  announcementType: ANNOUNCEMENT_TYPE,
  icon: ICON,
  labelType: LABEL_TYPE,
  spread_type: SPREAD_TYPE,
  spread_area: SPREAD_AREA,
  sorter: SORTER,
  appCenter: APP_CENTER,
  banned_day: BANNED_DAY,
  reason_type: REASON_TYPES,
  serverName: SERVER_NAME,
  templates: TEMPLATES,
  color: COLOR
}

export default enums
