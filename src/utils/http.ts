import axios from 'axios'
import qs from 'qs'

import { getToken } from './auth'

export default class http {
  private baseConfig: any

  // 构造函数
  constructor (options?: any) {
    if (!options) {
      this.baseConfig = {
        baseURL: 'http://www.yunxi10.com/admincms/api/', // 设置跨域代理接口统一的前置地址  http://www.dongblog.com  http://127.0.0.1  http://www.yunxi10.com
        timeout: 300000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Header': "*"
        }
      }
    } else {
      this.baseConfig = options
    }
  }

  // 请求头设置
  requestHeaders (request: any) {
    // POST传参序列化
    request.interceptors.request.use((config: any) => {
      if (config.method === 'post' && config.data.upload !== true) {
        config.data = qs.stringify(config.data)
      }
      if (config.data.upload === true) {
        config.data = config.data.data
      }
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
  }

  // 返回状态判断
  responseHeaders (request: any) {
    request.interceptors.response.use((res: any) => {
      if (!res.data.ifSuccess) {
        // _.toast(res.data.msg);
        return Promise.reject(res)
      }
      return res
    }, (error: any) => {
      return Promise.reject(error)
    })
  }

  // 请求方法
  axios () {
    return axios.create(this.baseConfig)
  }

  // 请求方法
  request (m: string, n: string, method: any, params: any) {
    params = params || {}
    params.n = n
    params.m = params.m ? params.m : m
    const request = this.axios()
    let url = ''
    const upload = params.uploadtype ? `&type=${params.uploadtype}&dir=${params.dir}` : ''

    if (method === 'get' && params.m !== 'space') {
      url = `inter_vue.php?m=${params.m}&n=${params.n}&${params.dir}`
    } else {
      url =
        params.m === 'space'
          ? `inter_vue.php?m=${params.m}&n=${params.n}${
              params.file && params.file !== '/' ? params.file : ''
            }`
          : `inter_vue.php?origin=backstage${upload}`
    }

    this.requestHeaders(request)
    this.responseHeaders(request)
    return new Promise((resolve, reject) => {
      request
        .request({
          url: url,
          method,
          data: params,
        })
        .then(
          (response) => {
            resolve({
              result: response.data,
            })
          },
          (err) => {
            reject(err)
          }
        )
        .catch((error) => {
          reject(error)
        })
    })
  }
}
