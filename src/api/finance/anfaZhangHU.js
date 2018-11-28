import fetch from '@/utils/fetch'

const baseurl = 'aflcusercenterservice-lyc'

// 获取服务分类列表
export function userMywalletSurvey() {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMywallet/v1/userMywalletSurvey',
    method: 'get'

  })
}


