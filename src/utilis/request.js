import axios from 'axios'
import {Message} from 'element-ui'

const instance = axios.create({
  // baseURL: 'http://data.com/api/',
  baseURL: 'http://192.168.1.163/api/',
  // baseURL: 'https://data.water555.xyz/api/',
  // timeout: 3000
  timeout: 60000
})

instance.interceptors.request.use(
  function (response) {
    return response
  },
  error => {
    return Promise.reject(error.response);
  }
)

instance.interceptors.response.use(
  function (response) {
    console.group('全局请求响应')
    console.log(response);
    console.groupEnd()
    if (response.status === 200) {
      Message({message: response.data.message, type: 'success'})
    }
    return response
  },
  error => {
    console.group('全局错误响应')
    console.warn(error.response)
    console.groupEnd()
    let errors = error + ''
    //网络不通弹窗
    if (errors === 'Error: Network Error') {
      Message({message: errors, type: 'error'});
    }
    if (error.response.status === 401) {
      Message({message: error.response.data.message, type: 'error'});
      console.log(error.response.data.message);
    }
    if (error.response.status === 403) {
      Message({message: error.response.data.message, type: 'error'});
    }
    if (error.response.status === 405) {
      Message({message: error.response.data.message, type: 'error'});
    }
    if (error.response.status === 422) {
      Message({message: Object.values(error.response.data.errors)[0][0], type: 'error'})
    }
    if (error.response.status === 429) {
      alert('禁止频繁操作！请休息几分钟，然后重新登陆。')
      window.location.href = window.location.host
      localStorage.clear()
    }
    if (error.response.status === 500) {
      Message({message: '服务器错误，请重试。', type: 'error'})
    }
    //超时判断
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Message({message: '请求超时，请重试，或检查网络。', type: 'error'})
    }
    return Promise.reject(error.response);
  }
)

export function get(url, params) {
  return instance.get((url, {
    params
  }))
}

export function post(url, data, config) {
  return instance.post(url, data, config)
}