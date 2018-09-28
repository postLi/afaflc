import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice"

//获取车主奖励列表
export function data_get_ownerFromsame_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcDriverOrderamountReward/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })   
  }

//车主奖励列表新增
export function data_get_ownerFromsame_create(data) {
    return fetch.post('/' + baseurl + '/sm/aflcDriverOrderamountReward/v1/add', data)
  }
    
//删除车主奖励列表
export function data_Del_ownerFromsame(id) {
    
    return fetch({
          url: '/'+baseurl+'/sm/aflcDriverOrderamountReward/v1/delete/'+id,
          method: 'delete',
        })
      }
//启用禁用车主奖励列表
export function data_Able_ownerFromsame(ids) {
        
     return fetch({
              url: '/'+baseurl+'/sm/aflcDriverOrderamountReward/v1/enableOrDisable',
              method: 'post',
              data:ids
            })
          }
    
//  修改车主奖励列表
export function data_get_ownerFromsame_update(data) {
      return fetch.put('/' + baseurl + '/sm/aflcDriverOrderamountReward/v1/update', data)
    }      



 //id车主订单金额奖励
 export function data_get_ownerFromsame1_Id(id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcDriverOrderamountReward/v1/query/'+id,
    method: 'get',
  })
}

 //reward_id获取所有订单金额奖励明细
 export function data_get_ownerFromsame2_Id(id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcDriverOrderamountReward/v1/' + id,
    method: 'get',
  })
}