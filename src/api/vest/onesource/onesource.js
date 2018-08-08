import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice"
const baseurl_one= "aflcsmservice_1"

//获取马甲推单列表
export function data_get_onesource_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcVestUnisource/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//增加马甲推单
export function data_add_onesource_list(data) {
  return fetch.post('/' + baseurl + '/sm/aflcVestUnisource/v1/add', data)
}
  

  //删除马甲推单
  export function data_Del_onesource(id) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcVestUnisource/v1/delete/'+id,
      method: 'delete',
    })
  }

     //启用禁用
  export function data_UseStates_onesource(ids) {
      return fetch({
        url: '/'+baseurl_one+'/sm/aflcVestUnisource/v1/enableOrDisable',
        method: 'post',
        data:ids
      })
    }