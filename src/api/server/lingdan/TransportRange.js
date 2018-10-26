import fetch from '@/utils/fetch'

const baseUrl = 'aflcusercenterservice'

//根据条件获取专线列表
// export function getTransportRangeList(page,pagesize,data){
//     return fetch({
//       url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/getAflcTransportRangeList',
//       method: 'post',
//       data:{
//         "currentPage": page,
//         "pageSize": pagesize,
//         "vo": data
//       }
//     })
//   }
//WEB端专线列表
export function getTransportRangeList(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/listWebAflcTransportRange',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }


  //根据条件获取专线列表
export function createWebTransport(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/createWebAflcTransportRange',
      method: 'post',
      data:data
    })
  }

//根据条件获取专线列表
export function newTransportRangeList(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/add',
      method: 'post',
      data:data
    })
  }

  

//根据Id获取物流专线
export function TransportRangeInfo(id){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/findMemberAflcTransportRange/'+id,
      method: 'get',
    })
  }


//根据id修改物流专线
export function changeTransportRange(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/update',
      method: 'put',
      data:data
    })
  }


  //更改物流公司网点状态
export function TransportRangeStatus(id){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/updateAflcTransportRangeStatus/'+id,
      method: 'PUT',
    })
  }


  //更改物流公司网点状态
export function deleteTransportRange(id){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcTransportRange/v1/delete/'+id,
      method: 'delete',
    })
  }