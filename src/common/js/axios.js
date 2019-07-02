import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  timeout: 60000,
  baseURL: '/'
})

// 添加请求拦截器，在请求头中加token
instance.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      console.log(localStorage.getItem('Authorization'))
      config.headers.Authorization = localStorage.getItem('Authorization')
    }

    return config
  },
  error => {
    return Promise.reject(error)
  })
instance.interceptors.response.use(res => {
  const { data } = res
  // 登录失效
  if (data.status === 700) {
    router.replace('/login')
    return
  }
  return Promise.resolve(data)
}, () => {
  router.push('/error')
})

export default {
  install: (Vue, option) => {
    Object.defineProperty(Vue.prototype, '$axios', { value: instance })
  }
}
