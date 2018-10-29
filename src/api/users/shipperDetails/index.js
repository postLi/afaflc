import fetch from '@/utils/fetch'

const baseurl = 'aflc-order' //订单
const baseurl_tow = 'aflcsmservice' //服务
const baseurl_three = 'aflcusercenterservice-wtc' //用户


//其他信息--根据条件获取订单投诉建议表列表
export function aflcOrderComplain(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrderComplain/v1/list',
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
