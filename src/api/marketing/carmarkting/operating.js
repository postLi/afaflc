import fetch from '@/utils/fetch'

// const baseurl = 'aflcorderservice'
const baseurl = 'aflcusercenterservice_wtc'
/**
 * 拥抽
 *
 */
// export function postDriverCommissionTransaction(params) {
//   return fetch.post('/aflcusercenterservice_wtc/usercenter/aflcDriverCommissionDetail/v1/driverCommissionTransaction', params).then(res => {
//     return res.data || {}
//   })
// }

// // 根据状态获取订单管理列表
// export function postDriverCommissionTransaction(params) {
//   return fetch({
//     url: '/aflcusercenterservice_wtc/usercenter/aflcDriverCommissionDetail/v1/driverCommissionTransaction',
//     method: 'post',
//     data: params
//   })
// }

// export function postDriverCommissionTransaction(data) {
//   return fetch({
//     url: '/' + baseurl + '/aflcusercenterservice_wtc/usercenter/aflcDriverCommissionDetail/v1/driverCommissionTransaction',
//     method: 'post',
//     data: data
//   })
// }

export function postDriverCommissionTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriverCommissionDetail/v1/driverCommissionTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
