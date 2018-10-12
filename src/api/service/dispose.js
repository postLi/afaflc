
import fetch from '@/utils/fetch'

// const baseurl = 'aflcorderservice'
const baseurl = 'aflcorderservice'
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
