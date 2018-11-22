import fetch from '@/utils/fetch'
// const baseurl = 'aflcusercenterservice'
const baseurl = 'aflcusercenterservice-huang'
/**
 *
 * 推荐专线列表
 */
export function postGetLists(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/getLists',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}
/**
 * /usercenter/aflcrecommend/v1/{id}
根据ID修改推荐专线表信息
 */
export function postAmend(id, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcrecommend/v1/' + id,
    method: 'put',
    data: data
  })
}
