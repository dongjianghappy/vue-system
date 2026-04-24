// 播报
export const handleBroadcast = (param: any) => {
  const content = document.getElementById('broadcast_content')?.innerText
  const speakMsg = new SpeechSynthesisUtterance()
  const speech: any = content || param
  speakMsg.text = speech; //文字内容
  speakMsg.lang = "zh-CN"; //使用的语言:中文
  speakMsg.volume = 1;
  //声音音量:0-1
  speakMsg.rate = 1.5;
  //语速:0-10
  speakMsg.pitch = 10;
  //音高:0-1
  window.speechSynthesis.speak(speakMsg)
}

// 自定义字段
export const customize11 = async (param: any) => {
  const { store, channel_id } = param
  const customizeDetail: any = {}
  debugger
  const res = await store.dispatch('common/Fetch', {
    api: "getColumns",
    data: {
      channel_id
    }
  })

  res.result.map((item: any) => {
    customizeDetail[item.fields] = ""

  })

  return {
    list: res.result,
    customizeDetail
  }
}

// 聚合标签
export const checkbox = async (param: any) => {
  const { store } = param
  
  const res = await store.dispatch('common/Fetch', {
    api: "getTagCheckbox",
    data: {
      channel_id: '1',
      type: 'art'
    }
  })
  
  return res.result
}

export const channleSubmit = (param: any) => {
  const { store, props, detail, cover, customizeDetail, channel, data, callback } = param

  for (let key in customizeDetail) {
    customizeDetail[key] = detail[key]
  }

  const {
    id,
    fid,
    uid,
    title,
    description,
    background_music,
    summary,
    tag,
    flags,
    color,
    style,
    checked,
    method,
    source,
    source_url
  } = detail
  const params: any = {
    fid,
    uid,
    title,
    description,
    cover,
    background_music,
    summary,
    tag: tag ? tag.join(',') : "",
    flags: flags ? `|${flags.join("|")}|` : "",
    color: color ? `|${color.join("|")}|` : "",
    style: JSON.stringify(style),
    checked,
    method,
    source,
    source_url,
    ...data
  }
  if (props.action === 'edit') {
    params.id = id
  }
debugger
  store.dispatch('common/Fetch', {
    api: props.action !== 'add' ? 'updateArticle' : 'insertArticle',
    data: {
      coding: props.data.coding.art || props.data.coding,
      ...params,
      ...customizeDetail
    }
  }).then(() => {
    if (props.action === 'edit') {
      debugger
      // 静态更新
      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          serve: props.data.channel.server,
          id,
          action: 'singleArticle',
          model: props.data.channel.module
        }
      })
    }
    callback()
  })
}

// 聚合标签
export const articleTempList = async (param: any) => {
  const { store, type } = param
  
  const res = await store.dispatch('common/Fetch', {
      api: 'articleTempList',
      data: {
        type: type,
      }
    })
  
  return res.result
}