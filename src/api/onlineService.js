import fetch from '../utils/fetch'

const baseurl = 'aflcorderservice'

export function aflcWorkOrderDealController(obj) {
    return fetch({
      url: '/'+baseurl+'/order/aflcWorkOrderDealController/v1/dealCount',
      method: 'get',
    }) 
  }
  