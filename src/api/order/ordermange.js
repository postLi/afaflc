import fetch from '@/utils/fetch'

const baseurl = 'aflc-order'

// 根据状态获取订单管理列表
export function orderStatusList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/orderManager',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 根据流水号获取订单详细信息
export function orderDetailsList(orderSerial) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/getOrderDetail/' + orderSerial,
    method: 'get'
  })
}

// 取消订单
export function cancelOrder(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/cancelOrder',
    method: 'post',
    data: data
  })
}

// web端指派司机
export function appointDriverList(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/appointDriver',
    method: 'post',
    data: data
  })
}

  // web端指派司机时查询司机列表
export function nearDriverList(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/nearDriverList',
    method: 'post',
    data: data
  })
}

// 获取订单行车轨迹
export function getOrderCarTrailList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrder/v1/getOrderCarTrailList',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}


//添加备注（web端客服备注）
export function RemarkDriverInfo(data) {
    return fetch({
      url: '/' + baseurl + '/order/aflcOrder/v1/customServiceRemark',
      method: 'post',
      data: data
    })
  }

