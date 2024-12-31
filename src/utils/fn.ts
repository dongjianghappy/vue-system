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
  const { store, props, detail, img, cover, customizeDetail, data, callback } = param

  for (let key in customizeDetail) {
    customizeDetail[key] = detail[key]
  }

  const {
    id,
    fid,
    title,
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
    title,
    img,
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

  store.dispatch('common/Fetch', {
    api: props.action !== 'add' ? 'updateArticle' : 'insertArticle',
    data: {
      coding: props.data.coding.art,
      ...params,
      ...customizeDetail
    }
  }).then(() => {
    callback()
  })
}