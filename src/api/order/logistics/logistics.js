
import fetch from '@/utils/fetch'
const baseurl = 'aflcorderservice'
const baseurl_two = 'aflc-common'
const baseurl_three = 'aflc-uc'

  // 根据发物流订单管理列表
  export function findFCLOrderInfoList(page, pagesize, data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcFCLOrderWeb/findFCLOrderInfoList',
      method: 'post',
      data: {
        'currentPage': page,
        'pageSize': pagesize,
        'vo': data
      }
    })
  }

// 根据流水号获取订单详细信息
export function getFCLOrderByOrderSerial(orderSerial) {
  return fetch({
    url: '/' + baseurl + '/order/aflcFCLOrderWeb/getFCLOrderByOrderSerial/' + orderSerial,
    method: 'get'
  })
}

// 根据流水号获取货源详细信息
export function getFCLSupplyGoodsByOrderSerial(orderSerial) {
  return fetch({
    url: '/' + baseurl + '/order/aflcFCLOrderWeb/ /' + orderSerial,
    method: 'get'
  })
}

  // 根据流水号获订单跟踪信息
  export function orderStatusFollow(orderSerial) {
    return fetch({
      url: '/' + baseurl + '/order/aflcFCLOrderWeb/orderStatusFollow/' + orderSerial,
      method: 'get'
    })
  }

  // 获取来源订单字典
  export function orderSerialFun() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00400')
  }

    // 获取付款状态订单字典
    export function paymentFun() {
      return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF05105')
    }

    // 获取货主获取物流公司
    export function findByOrderSerial(data) {
      return fetch.get('/' + baseurl_three + '/usercenter/aflcTransportEvaluation/v1/findByOrderSerial/' + data)
    }    