import fetch from '@/utils/fetch'

// const baseurl = 'aflcorderservice'
// const baseurl = 'aflcusercenterservice_wtc'
const baseurl = 'aflcusercenterservice'
const baseurl2 = 'aflcsmservice'
/**
 * 拥抽
 *
 */
// export function postDriverCommissionTransaction(params) {
//   return fetch.post('/aflcusercenterservice_wtc/usercenter/aflcDriverCommissionDetail/v1/driverCommissionTransaction', params).then(res => {
//     return res.data || {}
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
/**
 * 导出接口
 * @param {*} page
 * @param {*} pagesize
 * @param {*} data
 */
export function postCommissionTransactionExcel(page, pagesize, data) {
  return fetch({
    responseType: 'blob',
    url: '/' + baseurl + '/usercenter/aflcDriverCommissionDetail/v1/commissionTransactionExcel',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * 奖励金
 */
export function postUserRewardDriverTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/userRewardDriverTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * 优惠金
 */
export function postUserRewardShipperTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcUserReward/v1/userRewardShipperTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * 优惠卷
 */
export function postCouponTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl2 + '/sm/aflcCouponUse/v1/couponTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
 /**
 * 达量
 */
export function postDriverOrderNumTransaction(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriverOrdernumDetail/v1/driverOrderNumTransaction',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
