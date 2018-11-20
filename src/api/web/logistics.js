import fetch from '@/utils/fetch'
// const baseurl = 'aflcusercenterservice'
const baseurl = 'aflcusercenterservice-huang'
//
/**
 * 专线列表
 */
export function postSelectAflcTransportRangeList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcTransportRange/v1/selectAflcTransportRangeList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
