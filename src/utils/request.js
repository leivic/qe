import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({ // 盲猜axios.create是axios对象上的一个构造函数  构造函数有一个参数 是个对象 创建一个实例
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})// 1. 创建一个新axios，并做一些基础配置 这里就是一个构造函数创建实例 2.

// request interceptor
service.interceptors.request.use( // interceptors.request.use应当是原型上的方法 方法的实参是两个带参函数 2. 请求拦截器,让请求头中带上token 交给后端判断
  config => { // 这里是调用方法了 实参config是个对象 而它来自哪呢？ 2. config变量封装了axios的所有配置，此处拦截器的作用是return一个新的config，改变config配置
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor

service.interceptors.response.use( // 响应拦截器 其实请求拦截器，就算加上了token，后端可以不进行判断，但响应拦截器就不一样了，axios响应一定会返回一个response 2. 该函数的两个参数都是带参函数 不清楚axios到底如何封装 猜测参数中的函数是用来执行的=>类似promise
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */

  response => {
    const res = response.data // response.data.code 对象 子命名空间

    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 90000) { // 之前是res.code ！== 20000 调用一个Message方法 最后返回res
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service // 导出service对象  在其他文件里调用这个service 代码按顺序执行 这里的service是已经调用过两个原型上的方法的service
