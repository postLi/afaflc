import fetch from '@/utils/fetch'

const baseurl = 'aflcorderservice'
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
