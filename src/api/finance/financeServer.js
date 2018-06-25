import fetch from '@/utils/fetch'

const baseurl = "aflcorderservice"



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








  

