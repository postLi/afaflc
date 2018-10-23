import fetch from '@/utils/fetch'

// const baseurl_two = "aflcsmservice"
const baseurl = "aflcsmservice"
const baseurl_one= "aflcorderservice"

//获取马甲推单记录列表
export function data_get_MjPushLogs_list(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl_one+'/order/aflcOrder/v1/findVestOrderPushRecordList',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }