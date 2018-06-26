import fetch from '@/utils/fetch'

const baseurl = "aflcorderservice"
const baseurl_two ='aflccommonservice'


//获取货主平台绑定列表
export function data_financeList(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/order/aflcOrderPayment/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//获取货主平台绑定列表
export function data_GetServerType() {
    return fetch({
      url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF017',
      method: 'get',
     
    })
  }






  

