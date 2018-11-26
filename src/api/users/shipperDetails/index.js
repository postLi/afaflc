import fetch from '@/utils/fetch'

const baseurl = 'aflc-order' //订单
const baseurl_tow = 'aflcsmservice' //服务
const baseurl_three = 'aflcusercenterservice' //用户
const baseurl_four = 'aflcorderservice' //订单


//其他信息-投诉记录-根据条件获取订单投诉建议表列表
export function aflcOrderComplain(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderComplain/v1/list',
      method: 'post',
      data: data
    })
  }

  //其他信息-评价记录-根据货主数据管理
export function aflcOrderEvaList(data) {
    return fetch({
      url: '/' + baseurl_four + '/order/aflcOrderEvaluation/v1/orderEvaList',
      method: 'post',
      data: data
    })
  }
  
//财务情况-账户优惠券-根据条件获取优惠券领用明细表列表详情
export function aflcCouponList(data) {
    return fetch({
      url: '/' + baseurl_tow + '/sm/aflcCouponUse/v1/listDetail',
      method: 'post',
      data: data
    })
  }

//财务情况-充值记录-根据条件获取充值记录表列表
export function aflcRechargeList(data) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcRecharge/v1/list',
      method: 'post',
      data: data
    })
  }
  
//财务情况-财务概况-根据id获取货主数据管理
export function aflcFinancialState(userId) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcShipper/v1/findAflcFinancialStatement/'+ userId,
      method: 'get',
    })
  }


//订单信息-信息概要-根据id获取货主信息管理
export function aflcOrderState(userId) {
    return fetch({
      url: '/' + baseurl_four + '/order/aflcOrder/v1/orderInfo/'+ userId,
      method: 'get',
    })
  }

//订单信息-信息概要-根据时间获取订单信息列表
export function aflcOrderList(data) {
    return fetch({
      url: '/' + baseurl_four + '/order/aflcOrder/v1/shipperOrderManageList',
      method: 'post',
      data: data
    })
  }

//权限配置-绑定车主-根据条件获取车货主绑定列表
export function aflcDriverShipperList(data) {
    return fetch({
      url: '/' + baseurl_four + '/dispatch/aflcDriverShipper/v1/list',
      method: 'post',
      data: data
    })
  }

//权限配置-营销权益-根据id获取货主权益配置
export function aflcEquityConfigDto(userId) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcShipper/v1/findEquityConfigDto/' + userId,
      method: 'get',
    })
  }

  
//基本信息-概要信息-根据id获取货主基本信息
export function aflcShipperInfo(userId) {
    return fetch({
      url: '/'+baseurl_three+'/usercenter/aflcShipper/v1/' + userId,
      method: 'get',
    })
  }