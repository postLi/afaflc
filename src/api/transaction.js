import fetch from '../utils/fetch'

const baseurl = 'aflcusercenterservice-lyc'

export function pendingExtractCashCount(obj) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcExtractCash/v1/pendingExtractCashCount',
      method: 'get',
    })
  }
  


  
