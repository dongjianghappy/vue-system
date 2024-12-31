// 自定义表单类型
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

// 审核退回原因
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
  {
    value: 'demo_article.htm',
    name: '代码演示模板',
  }, 
]

export const enumSort = {
  'desc': '递减',
  'asc': '递增',
}

export const durationList = [{
        value: '',
        name: '所有'
      }, {
        value: '00:00',
        name: '00:00'
      },
      {
        value: '00:01',
        name: '00:01'
      },
      {
        value: '00:02',
        name: '00:02'
      },
      {
        value: '00:03',
        name: '00:03'
      },
      {
        value: '00:04',
        name: '00:04'
      },
      {
        value: '00:05',
        name: '00:05'
      },
      {
        value: '00:06',
        name: '00:06'
      },
      {
        value: '00:07',
        name: '00:07'
      },
      {
        value: '00:08',
        name: '00:08'
      },
      {
        value: '00:09',
        name: '00:09'
      },
      {
        value: '00:10',
        name: '00:10'
      },
      {
        value: '00:11',
        name: '00:11'
      },
      {
        value: '00:12',
        name: '00:12'
      },
      {
        value: '00:13',
        name: '00:13'
      },
      {
        value: '00:14',
        name: '00:14'
      },
      {
        value: '00:15',
        name: '00:15'
      }
    ]

