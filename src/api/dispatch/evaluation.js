import fetch from '@/utils/fetch'

const baseurl = 'aflccommonservice'

// 新增KPI考核
export function aflcAssessmentSettings(data) {
    return fetch({
        url: '/' + baseurl + '/common/aflcAssessmentSettings/v1/add',
        method: 'post',
          data:data
      })
}

// 获取城市KPI考核
export function aflcAssessmentSettings_list(page,pagesize,data) {
    return fetch({
      url: '/' + baseurl + '/common/aflcAssessmentSettings/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }