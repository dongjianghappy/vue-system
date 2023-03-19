import codings from "@/assets/coding"
import { parse } from "qs";

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token: any) => {
  return localStorage.setItem('token', token)
}

export const isLogined = (token: any) => {
  if (localStorage.getItem('token')) {
    return true
  }
  return false
}

export const clearToken = () => {
  localStorage.removeItem('token')
}

export const getUid = () => {
 let uid = ""
 const arr = window.location.pathname.split("/u/")
 if(arr.length > 1){
   uid = arr[1].split("/")[0]
 }
 return uid
}

// 按钮权限
export const checkButtonAuth = (data: any) => {
  const gradeList: any = sessionStorage.getItem('gradeList')
  
  const authority = (gradeList && gradeList.split(",")) || []
  // return true
  if(authority[0] === "*" || authority.indexOf(data) > -1){
      return true
  }else{
      return false
  }
}

export const chooseCate = (param: any, coding: any) => {
  let configData = {}
  if (param === 'album') {
    configData = {
      coding: coding, // 'U40001',
      api: 'userCategory',
      type: "album",
      name: "",
      value: "",
      title: "选择专辑"
    }
  } else if (param === 'cate') {
    configData = {
      coding: coding,
      api: 'systemCate',
      type: "cate",
      name: "",
      value: "",
      title: "选择分类"
    }
  }
 return configData
}

 // 将urlquery参数转换成对象形式
export const channels = () => {
  let module: any = ""
  module = window.location.pathname.split("/")[2] || "";
  if(module === 'admin'){
    module = window.location.pathname.split("/")[3] || "";
  }

  const model: any = {}
  const aaa: any = sessionStorage.getItem("channel");

  const channel = JSON.parse(aaa) || [];
  const item = channel.find((item: any) => {
    return item.module === module;
  });
  if(item){
    item.coding = codings[module]
  }
  if(module === 'talk'){
    model.name = "微博"
  }
  if(module === 'user'){
    model.name = "用户"
  }
  return item || model || {};
};

 // 将urlquery参数转换成对象形式
 export const channelssss = () => {
  const module = window.location.pathname.split("/")[3] || "";
  const aaa: any = sessionStorage.getItem("channel");

  const channel = JSON.parse(aaa) || [];
  const item = channel.find((item: any) => {
    return item.module === module;
  });
  if(item){
    item.coding = codings[module]
  }
  return item || {};
};

// 将urlquery参数转换成对象形式
export const getQuery = () => {
  return parse(window.location.search.split("?")[1]);
};

export const jsonParse = (param: any) => {
  
  param = param.indexOf('{') === 0 ? param : '{}'
  const style = JSON.parse(param || '{}')
  return style instanceof Object ? style : ""
}

// 时长转换
export const  durationTrans = (duration: any) => {
  
  let b: any = ""
  let h: any = Math.floor(duration/3600),
      m: any = Math.floor(duration%3600/60),
      s: any = Math.floor(duration%3600%60);
  if(h>0){
    h = h<10 ? '0'+h : h
    b += h+":"
  }
  m = m < 10 ? '0'+m : m 
  s = s < 10 ? '0'+s : s 
  b+=m+":"+s
  return b;
}

export const getParent = (current: any, value: any) => {
  let index = current.findIndex((item: any) => item.value === value)
  return index > -1 ? true : false
}
export const showParent = (current: any) => {
 
  return current
}