import fetch from '@/utils/fetch'

// /usercenter/aflclogisticspark/v1/list
// 云平台-查询物流园区表分页信息
const baseUrl = 'aflc-uc'
// const baseUrl = 'aflcusercenterservice'

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
