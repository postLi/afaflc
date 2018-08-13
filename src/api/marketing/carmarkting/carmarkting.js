import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice"
const baseurl_one= "aflcsmservice_1"

//获取同城列表
export function data_get_Marketingsame_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl_one+'/sm/aflcDriverCommission/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//同城列表新增
export function data_get_Marketingsame_create(data) {
    return fetch.post('/' + baseurl + '/sm/aflcDriverCommission/v1/add', data)
  }

  //id获取同城列表
     export function data_get_Marketingsame_Id(id) {
        return fetch({
          url: '/'+baseurl+'/sm/aflcDriverCommission/v1/'+id,
          method: 'get',
        })
      }
  
    //删除同城列表
  export function data_Del_Marketingsame(id) {
    
    return fetch({
      url: '/'+baseurl+'/sm/aflcDriverCommission/v1/delete/'+id,
      method: 'delete',
    })
  }
    //启用禁用同城列表
    export function data_Able_Marketingsame(id) {
    
        return fetch({
          url: '/'+baseurl+'/sm/aflcDriverCommission/v1/enableOrDisable',
          method: 'post',
          data:{
            ids:id
          },
        })
      }
