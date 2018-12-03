import fetch from '../utils/fetch'

const baseurl = 'aflcusercenterservice'
const baseurl_two = 'aflc-order'


export function pendingExtractCashCount(obj) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcExtractCash/v1/pendingExtractCashCount',
      method: 'get',
    })
  }
  
  //首页-财务控制台->交易流水
export function tradeOrderPaymentCount(data) {
    return fetch({
      url: '/'+baseurl_two+'/order/aflcOrderPayment/v1/tradeOrderPaymentCount',
      method: 'post',
      data:data
    })
  }

  //首页-财务控制台->流水明细
export function tradeOrderPaymentDetail(data) {
    return fetch({
      url: '/'+baseurl_two+'/order/aflcOrderPayment/v1/tradeOrderPaymentDetail',
      method: 'post',
      data:data
    })
  }

