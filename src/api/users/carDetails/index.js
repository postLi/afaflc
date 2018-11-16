import fetch from '@/utils/fetch'

const baseurl = 'aflcsmservice'
const baseurl_two = 'aflcorderservice'
const baseurl_three = 'aflcusercenterservice' //用户

//财务信息-财务概况-根据id获取车主信息管理-财务概况
export function findDrivrTrans(driverId) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcDriver/v1/findDrivrTrans/'+driverId,
      method: 'get',
    })
  }

//财务信息-提现记录-根据条件获取车主信息管理
export function extractCashlist(data) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcExtractCash/v1/extractCashlist',
      method: 'post',
      data: data
    })
  }


//财务信息-交易记录-根据条件获取车主信息交易明细列表
export function driverOrderPaymentList(data) {
    return fetch({
      url: '/' + baseurl_two + '/order/aflcOrderPayment/v1/driverOrderPaymentList',
      method: 'post',
      data: data
    })
  }

//权限配置-抽佣权限-车主抽佣权益
export function queryCommission(driverId) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverCommission/v1/queryCommission/' + driverId,
      method: 'get',
    })
  }

//权限配置-奖励金权益-根据id获取车主权益配置
export function findEquityConfigDriverDto(driverId) {
    return fetch({
    url: '/' + baseurl_three + '/usercenter/aflcDriver/v1/findEquityConfigDriverDto/' + driverId,
    method: 'get',
    })
}


//其他信息-评价记录-根据车主数据管理评价记录列表
export function orderDriverEvaList(data) {
    return fetch({
      url: '/' + baseurl_two + '/order/aflcOrderEvaluation/v1/orderDriverEvaList',
      method: 'post',
      data:data
    })
  }

//订单信息-信息概要-根据id获取车主订单信息概要
export function orderPriceInfo(driverId) {
    return fetch({
    url: '/' + baseurl_two + '/dispatch/aflcDriverStatus/v1/orderPriceInfo/' + driverId,
    method: 'get',
    })
}

//订单信息-抢单信息-根据条件获取车主信息管理订单信息抢单列表
export function grapList(data) {
    return fetch({
      url: '/' + baseurl_two + '/dispatch/aflcOrderGrab/v1/driver/grapList',
      method: 'post',
      data:data
    })
  }

//订单信息-交易订单-根据条件获取车主信息管理订单信息列表
export function driverTradOrdeList(data) {
    return fetch({
      url: '/' + baseurl_two + '/order/aflcOrder/v1/driverTradOrdeList',
      method: 'post',
      data:data
    })
  }

//订单信息-取消订单-根据条件获取车主信息管理-订单信息-取消订单
export function driverTradOrdeCancelList(data) {
    return fetch({
      url: '/' + baseurl_two + '/order/aflcOrder/v1/driverTradOrdeCancelList',
      method: 'post',
      data:data
    })
  }