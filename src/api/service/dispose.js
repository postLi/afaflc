
import fetch from '@/utils/fetch'

// const baseurl = 'aflcorderservice'
const baseurl = 'aflcorderservice'
// const baseurl = 'aflcorderservice-lyc'
/**
 * 投诉列表
 *
 */
export function postListAppShipperComplain(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/listAppShipperComplain',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * 投诉登记/order/aflcOrderComplain/v1/reportComplain
 * {
  "complainDes": "string",
  "complainType": "string",
  "orderSerial": "string",
  "reporterType": "string"
}
 */
export function postReportClaim(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/reportComplain',
    method: 'post',
    data: data
  })
}
/**
 *订单详情大列表/order/aflcOrderComplain/v1/listAppShipperComplainByOrderSerial/{orderSerial}
 */
export function getListAppShipperComplainByOrderSerial(id) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/listAppShipperComplainByOrderSerial/' + id,
    method: 'get'
  })
}
