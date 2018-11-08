import fetch from '@/utils/fetch'

const baseurl = 'aflcsmservice'
const baseurl_two = 'aflcorderservice'
const baseurl_three = 'aflcusercenterservice-wtc' //用户

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
export function queryCommission(userId) {
    return fetch({
      url: '/' + baseurl + '/sm/aflcDriverCommission/v1/queryCommission/' + userId,
      method: 'get',
    })
  }


