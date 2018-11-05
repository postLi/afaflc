import fetch from '@/utils/fetch'

const baseurl_three = 'aflcusercenterservice-wtc' //用户

//财务信息-提现记录-根据条件获取车主信息管理
export function extractCashlist(data) {
    return fetch({
      url: '/' + baseurl_three + '/usercenter/aflcExtractCash/v1/extractCashlist',
      method: 'post',
      data: data
    })
  }