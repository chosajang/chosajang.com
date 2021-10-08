import axios from 'axios'
import bus from '@/utils/bus.js'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    bus.$emit('end:spinner')
    return response
  },
  (error) => {
    bus.$emit('end:spinner')
    if( error.response !== undefined ) {
      if( error.response.status === 401 ) {
        bus.$emit('forceAlert', process.env.VUE_APP_AUTH_FAILURE)
      }
    } else {
      bus.$emit('forceAlert', process.env.VUE_APP_NETWORK_ERROR)
    }
    return Promise.reject(error)
  }
)

function apiArticleList() {
  return instance.get('/api/blog/posts')
}

function apiArticleRead(article_seq) {
  return instance.get(`/api/blog/posts/${article_seq}`)
}


export {
  apiArticleList,
  apiArticleRead
}
