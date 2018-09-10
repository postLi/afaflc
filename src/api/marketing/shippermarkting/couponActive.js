import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice"
const baseurl_one= "aflcsmservice"
const baseurl_two = "aflccommonservice"

//获取优惠卷活动列表
export function data_get_couponActive_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcCouponActivity/v1/list',
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
  return fetch.post('/' + baseurl + '/sm/aflcCouponActivity/v1/add', data)
}

//删除优惠卷活动列表
export function data_Del_couponActive(id) {
    
  return fetch({
        url: '/'+baseurl+'/sm/aflcCouponActivity/v1/delete/'+id,
        method: 'delete',
      })
    }

//启用优惠卷活动列表
export function data_Able_couponActive(ids) {
        
  return fetch({
           url: '/'+baseurl+'/sm/aflcCouponActivity/v1/enableOrDisable',
           method: 'post',
           data:ids
         })
       }    


//自动化化配置
export function data_automationActive() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF0461',
    method: 'get'
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

//获取卷码状态类型
export function data_couponStatus() {
  return fetch({
    url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF0464',
    method: 'get'
  })
}



 //activity_id获取优惠卷活动列表
 export function data_get_couponActive2_Id(activity_id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCoupon/v1/query/' + activity_id,
    method: 'get',
  })
}

 //id优惠卷活动列表
 export function data_get_couponActive_Id(id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponActivity/v1/'+ id,
    method: 'get',
  })
}


//获取优惠卷领用明细列表
export function data_get_aflcCouponUse_list(page,pagesize,data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponUse/v1/listDetail',
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
  return fetch.put('/' + baseurl + '/sm/aflcCouponActivity/v1/update', data)
}      

//  新增优惠卷
export function data_get_aflcCoupon_add(data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCoupon/v1/add',
    method: 'post',
    data:{
      "activityId": data
    }
  })
}      

//  删除优惠卷
export function data_get_aflcCoupon_delete(id) {
    
  return fetch({
        url: '/'+baseurl+'/sm/aflcCoupon/v1/delete/'+id,
        method: 'delete',
      })
    }

    
//获取优惠卷列表
export function data_get_aflcCoupon_list(page,pagesize,data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCoupon/v1/list',
    method: 'post',
    data:{
      "currentPage": page,
      "pageSize": pagesize,
      "vo": data
    }
  })
}


// 生成优惠卷
 export function data_get_produceCoupon(activity_id,num) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponUse/v1/produceCoupon/?id=' + activity_id+'&num='+num,
    method: 'get',
  })
}

// 发放优惠卷
export function data_get_grantCoupon(id,data) {
return fetch.post('/'+baseurl+'/sm/aflcCouponUse/v1/grantCoupon/'+id, data)
}

// txt文件上传
export function data_get_BatchDistribution(id,multipartFile) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponUse/v1/BatchDistribution',
    method: 'post',
    data: multipartFile
  })
}

// excel文件导出
export function data_get_produceCouponExcel(id,num) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcCouponUse/v1/produceCoupon/?id='+id+'&num='+num,
    method: 'get',
    responseType:'blob',
  })
}