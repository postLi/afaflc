import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'

// 获取交易明细列表
export function data_findShipperMywalletList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcMywallet/v1/findShipperMywalletList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
