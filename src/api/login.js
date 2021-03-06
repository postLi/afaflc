import fetch from '@/utils/fetch'
import { getRefreshToken } from '../utils/auth'

// export function login(username, password, orgid) {
//   var grant_type = 'password'
//   var scope = 'webApp'
//   return fetch({
//     url: '/uaa/oauth/token',
//     method: 'post',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
//     },
//     params: {
//       username,
//       password,
//       grant_type,
//       orgid
//       // scope,
//     }
//   })
// }


export function login(username, password, orgid) {
    var grant_type = 'password'
    var scope = 'webApp'
    // console.log('login:', arguments, fetch.axios)
    const form = new FormData()
    form.append('username', username)
    form.append('password', password)
    form.append('grant_type', grant_type)
    return fetch.request({
        url: '/uaa/oauth/token',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic d2ViQXBwOndlYkFwcA=='
        },
        data: form
    })
  }

export function getInfo(username, orgid) {
  return fetch.get('/aflccommonservice/system/user/v1/getCurrentUser').then(res=>{
    //   console.log('getinfo:',res)
      return res
  }).catch(err=>{
      console.log('getinfo err:',err)
  })
//   .then(res => {
//       renturn 
//   })
}

export function logout() {
  return fetch.delete('/uaa/oauth/token', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}

export function refreshToken() {
  return fetch.put()
}
