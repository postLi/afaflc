import fetch from '@/utils/fetch'
const baseurl_two = "aflccommonservice"
const baseurl = "aflcsmservice"

/**
 * 获取城市数据
 */
export function getCityInfo(params) {
  return fetch.get('/getcity', {
    params
  }).then(res => {
    return res.data || []
  })
}

/**
 * 获取图片上传的policy
 * callback
 *"data": {
        "accessid": "LTAIFj5nQSIxEZ8H",
        "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wNS0yMlQxNjowNTowMC4yNThaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==",
        "signature": "NJ8HhMX9ZpLfNy7ojaA95O0jFxY=",
        "dir": "tms/",
        "host": "http://aflc.oss-cn-shenzhen.aliyuncs.com",
        "expire": "1527005100"
    }
 */
let UPLOADPOLICYDATA // 用来缓存上传policy
export function getUploadPolicy() {

  // 后期可添加是否过期的验证
  if (UPLOADPOLICYDATA) {
    return new Promise((resolve) => {
      resolve(UPLOADPOLICYDATA)
    })
  } else {
    return fetch.get('/api-common/common/oss/v1/policy').then(res => {
      UPLOADPOLICYDATA = res.data || ''
      return res.data || {}
    })
  }
}

/**
 * 获取下拉框类型
 * @param {*} type 下拉类型
 * @param {*} orgid 网点id
 */
export function getSelectType(type = '', orgid) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: type,
      orgid
    }
  }).then(res => {
    return res.data || []
  })
}


//获取车辆规格 加宽  加长等
export function data_GetCarType() {
    return fetch({
      url: '/'+baseurl_two+'/sysDict/getSysDictByCodeGet/AF009',
      method: 'get'
    })
  }

  // 获取省级数据
export function data_getProvinceList(){
  return fetch.get('/'+baseurl+'/sm/aflcDistrict/v1/getProvinceList') 
}


// 获取省级对应的城市列表
export function data_GetCityList(code) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcDistrict/v1/lists',
    method: 'post',
    data: {
      "code": code
    }
  })
}

//获取车辆类型列表
export function data_CarList(){
  return fetch.get('/'+baseurl+'/sm/aflcSysDict/v1/getCarTypeList') 
}

//获取服务分类子分类
export function data_ServerClassList(){
  return fetch.get('/'+baseurl+'/sm/aflcSysDict/v1/getServiceClassList') 
}
