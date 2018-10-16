
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
export function postReportComplain(data) {
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
/**
 * 投诉跟进/order/aflcOrderGoodsfollowup/v1/addComplain
 */
export function postAddComplain(data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsfollowup/v1/addComplain',
    method: 'post',
    data: data
  })
}
/**
 * 改变受理状态/order/aflcOrderComplain/v1/updateDealStatus/{id}
 *
 */
export function getUpdateDealStatus(id) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderComplain/v1/updateDealStatus/' + id,
    method: 'get'
  })
}
