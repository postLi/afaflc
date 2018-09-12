import fetch from '@/utils/fetch'

const baseurl = "aflccommonservice-lyc"


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
  

  //新增发布公告表
  export function newNotice(data) {
    return fetch({
      url: '/'+baseurl+'/common/aflcCommonNotice/v1/add',
      method: 'post',
      data: data
    })
  }

    //根据id修改发布公告表
    export function updateNotice(data) {
        return fetch({
            url: '/'+baseurl+'/common/aflcCommonNotice/v1/update',
            method: 'put',
            data: data
        })
        }