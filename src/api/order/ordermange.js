import fetch from '@/utils/fetch'

const baseurl = "aflcorderservice"


// 根据状态获取订单管理列表
export function orderStatusList(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/order/aflcOrder/v1/orderManager',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data,
      }
    })
  }

//根据id获取订单详细信息
export function orderDetailsList(orderSerial) {
    return fetch({
      url:'/'+baseurl+'/order/aflcOrder/v1/getOrderDetail/' + orderSerial,
      method: 'get'
    })
  }








  
