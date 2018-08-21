import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice"
const baseurl_one= "aflcsmservice"
const baseurl_two = "aflccommonservice"

//获取优惠卷活动列表
export function data_get_couponActive_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcCouponActivity/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//优惠卷活动列表新增
export function data_get_couponActive_create(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcCouponActivity/v1/add', data)
}

//删除优惠卷活动列表
export function data_Del_couponActive(id) {
    
  return fetch({
        url: '/'+baseurl+'/usercenter/aflcCouponActivity/v1/delete/'+id,
        method: 'delete',
      })
    }

//启用优惠卷活动列表
export function data_Able_couponActive(ids) {
        
  return fetch({
           url: '/'+baseurl+'/usercenter/aflcCouponActivity/v1/enableOrDisable',
           method: 'post',
           data:ids
         })
       }    



//获取优惠券类型
export function data_couponActive() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF0462',
    method: 'get'
  })
}

//获取时效类型
export function data_couponActiveTime() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF0463',
    method: 'get'
  })
}

 //activity_id获取优惠卷活动列表
 export function data_get_couponActive2_Id(activity_id) {
  return fetch({
    url: '/'+baseurl_one+'/usercenter/aflcCoupon/v1/query/' + activity_id,
    method: 'get',
  })
}

 //id优惠卷活动列表
 export function data_get_couponActive_Id(id) {
  return fetch({
    url: '/'+baseurl+'/usercenter/aflcCouponActivity/v1/'+ id,
    method: 'get',
  })
}


//获取优惠卷领用明细列表
export function data_get_aflcCouponUse_list(page,pagesize,data) {
  return fetch({
    url: '/'+baseurl+'/usercenter/aflcCouponUse/v1/listDetail',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}

//  修改优惠卷领用明细列表
export function data_get_couponActive_update(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcCoupon/v1/update', data)
}      
