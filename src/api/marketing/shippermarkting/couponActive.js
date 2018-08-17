import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice"
const baseurl_one= "aflcsmservice"

//获取达量同城列表
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
