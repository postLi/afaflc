
import fetch from '@/utils/fetch'
const baseurl = 'aflcsmservice'
const baseurl_two = 'aflc-common'

  // 获取订单字典
  export function orderSerialFun() {
    return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00400')
  }