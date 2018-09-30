import fetch from '@/utils/fetch'

const baseurl = 'aflc-uc'

// 获取提现记录表列表
export function data_aflcExtractCashList(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcExtractCash/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
