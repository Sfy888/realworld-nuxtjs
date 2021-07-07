import { request } from '@/plugins/request'

// 获取文章标签列表
// export const getTags = () => {
//   return request({
//     method: 'GET',
//     url: '/api/tags'
//   })
// }

// 关注用户  
export const followUser = username => {
  return request({
    method: 'POST',
    url: `api/profiles/${username}/follow`
  })
}

// 取消关注用户  
export const UnfollowUser = username => {
  return request({
    method: 'DELETE',
    url: `api/profiles/${username}/follow`
  })
}

