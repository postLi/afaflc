import fetch from '@/utils/fetch'

const baseurl = "aflc-common"

//根据条件获取400通话记录表列表
export function aflcCallLog(page,pagesize,data) {
    return fetch({
      url: '/'+ baseurl + '/common/aflcCallLog/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }
