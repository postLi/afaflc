import fetch from '../utils/fetch'

const baseurl = 'aflcorderservice'
const baseurl_two = 'aflc-uc'

//工单处理
export function aflcWorkOrderDealController() {
    return fetch({
      url: '/'+baseurl+'/order/aflcWorkOrderDealController/v1/dealCount',
      method: 'get',
    }) 
  }
  
//首页-在线客服-账号审核
export function aflcAccountAuditController() {
    return fetch({
      url: '/'+baseurl_two+'/usercenter/aflcAccountAuditController/v1/auditCount',
      method: 'get',
    }) 
  }

//首页-在线客服-订单处理
export function aflcOrderDealController() {
    return fetch({
      url: '/'+baseurl+'/order/aflcWorkOrderDealController/v1/dealOrderCount',
      method: 'get',
    }) 
  }