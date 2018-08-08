import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice-lyc"


//获取马甲推单列表
export function data_get_pushsheet_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcVestPush/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

    //新增马甲推单
export function data_Add_pushsheet(data) {
  return fetch.post('/' + baseurl + '/sm/aflcVestPush/v1/add', data)
}

  //删除马甲推单
export function data_Del_pushsheet(id) {
  
  return fetch({
    url: '/'+baseurl+'/sm/aflcVestPush/v1/delete/'+id,
    method: 'put',
  })
}

  //获取马甲推单
  export function data_get_pushsheet(id) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcVestPush/v1/'+id,
      method: 'get',
  
    })
  }

 //修改马甲推单
  export function data_dpdata_pushsheet(data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcVestPush/v1/update',
      method: 'PUT',
      data: data
    })
  }


   //启用禁用
   export function data_UseStates_pushsheet(id) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcVestPush/v1/updateUsingStatus/'+ id,
      method: 'PUT',
     
    })
  }


  

