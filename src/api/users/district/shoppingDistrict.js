import fetch from '@/utils/fetch'

const baseurl = "aflc-uc"

//获取商圈管理列表
export function data_get_aflcTradeArea_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/usercenter/aflcTradeArea/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }