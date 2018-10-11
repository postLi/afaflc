import fetch from '@/utils/fetch'
const baseurl = 'aflc-uc'
const baseurl_two = 'aflcsmservice'
const baseurl_three = "aflccommonservice"
const baseurl_four = 'aflc-order'
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
// 获取钱包明细表
export function data_aflcOrderPaymentList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_four + '/order/aflcOrderPayment/v1/userList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取优惠卷领用明细表
export function data_aflcCouponUseList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl_two + '/sm/aflcCouponUse/v1/listDetail',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}


//获取卷码状态
export function data_couponActive() {
  return fetch({
    url: '/'+baseurl_three+'/sysDict/getSysDictByCodeGet/AF0464',
    method: 'get'
  })
}