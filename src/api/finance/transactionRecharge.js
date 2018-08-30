import fetch from '@/utils/fetch'

const baseurl = 'aflcusercenterservice'
const baseurl_two = 'aflcusercenterservice'

// 获取充值记录表列表
export function data_aflcRechargeList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcRecharge/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
