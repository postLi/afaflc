import fetch from '@/utils/fetch'

const baseurl = 'aflccommonservice-wtc'

// 新增KPI考核
export function aflcAssessmentSettings(data) {
    return fetch({
        url: '/' + baseurl + '/common/aflcAssessmentSettings/v1/add',
        method: 'post',
          data:data
      })
}