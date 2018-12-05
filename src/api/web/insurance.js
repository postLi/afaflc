import fetch from '@/utils/fetch'

// /usercenter/aflclogisticspark/v1/list
// 云平台-查询物流园区表分页信息
const baseUrl = 'aflc-uc'
// const baseUrl = 'aflcusercenterservice-huang'

export function postInsuranceList(page, pagesize, data) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcinsurancepolicy/v1/list',
    method: 'post',
    data: {
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}
// /usercenter/aflcinsurancepolicy/v1/{id}
// 根据ID查询保险单信息
export function getInsuranceDetail(id) {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcinsurancepolicy/v1/' + id,
    method: 'get'
  })
}
//http://{{ip}}:7010/aflc-uc/usercenter/aflcinsurancepolicy/v1/getCountByPaymentState?access_token={{access_token
export function postInsuranceNum() {
  return fetch({
    url: '/' + baseUrl + '/usercenter/aflcinsurancepolicy/v1/getCountByPaymentState/',
    method: 'post',
    data:{}
  })
}
