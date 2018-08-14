import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice"
const baseurl_one= "aflcsmservice_1"

//获取车主奖励列表
export function data_get_ownerFromsame_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl_one+'/sm/aflcDriverOrderamountReward/v1/list',
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
    return fetch.post('/' + baseurl_one + '/sm/aflcDriverOrderamountReward/v1/add', data)
  }

 //id获取城主奖励同城列表
export function data_get_ownerFromsame_Id(id) {
        return fetch({
          url: '/'+baseurl_one+'/sm/aflcDriverOrderamountReward/v1/'+id,
          method: 'get',
        })
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
