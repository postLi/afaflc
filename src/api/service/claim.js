import fetch from '@/utils/fetch'

const baseurl = 'aflcorderservice'
const baseurlw = 'aflcorderservice-wtc' // wang
/**
 * 物损理赔
 *  "belongCity": "string",
    "claimDes": "string",
    "claimPic1": "string",
    "claimPic2": "string",
    "claimType": "string",
    "createTime": "2018-09-27T07:42:49.337Z",
    "creater": "string",
    "dealStatus": "string",
    "driver": "string",
    "endAddress": "string",
    "id": "string",
    "orderSerial": "string",
    "orderStatus": "string",
    "reporter": "string",
    "reporterPhone": "string",
    "reporterType": "string",
    "shipper": "string",
    "startAddress": "string",
    "updateTime": "2018-09-27T07:42:49.337Z",
    "updater": "string",
    "useCarTime": "2018-09-27T07:42:49.337Z"
 */
export function postOrderGoodsclaimlist(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/order/aflcOrderGoodsclaim/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// /order/aflcOrderGoodsclaim/v1/GoodsclaimAll/{id} 拼接一个id 大列表
// 根据订单号id获取订单物损理赔
export function getGoodsclaimAll(id) {
  return fetch({
    url: '/' + baseurlw + '/order/aflcOrderGoodsclaim/v1/GoodsclaimAll/' + id,
    method: 'get'
  })
}

// /order/aflcOrderGoodsfollowup/v1/GoodsfollowupAll/{id} 下拉列表
// 根据订单号id获取记录物损跟进
export function getGoodsfollowupAll(id) {
  return fetch({
    url: '/' + baseurlw + '/order/aflcOrderGoodsfollowup/v1/GoodsfollowupAll/' + id,
    method: 'get'
  })
}

/**
 * /order/aflcOrderGoodsclaim/v1/reportClaim 登记新增
 *  "orderSerial": "string",
 */
export function getReportClaim(page, pagesize, data) {
  return fetch({
    url: '/' + baseurlw + '/order/aflcOrderGoodsclaim/v1/reportClaim',
    method: 'get',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

/**
 * 记录投诉跟进 /order/aflcOrderGoodsfollowup/v1/add新增记录物损跟进表
 */

export function postReportClaimAdd(data) {
  return fetch({
    url: '/' + baseurlw + '/order/aflcOrderGoodsfollowup/v1/add',
    method: 'post',
    data: data
  })
}
