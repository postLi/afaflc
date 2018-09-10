import fetch from '@/utils/fetch'

const baseurl = "aflc-common"


//根据条件获取发布公告表列表
export function CommonNoticeList(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/common/aflcCommonNotice/v1/list',
      method: 'post',
      data: {
          "currentPage": page,
          "pageSize": pagesize,
          "vo":data
      }
    })
  }
  