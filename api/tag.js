import request from '@/utils/request'

// 用户登录
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}
