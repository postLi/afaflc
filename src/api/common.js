import fetch from '@/utils/fetch'

const baseurl_two = 'aflc-common'
const baseurl = 'aflcsmservice'

/**
 * 获取城市数据
 */
export function getCityInfo(code) {
  code = code || ''
  return fetch.get('/aflccommonservice/common/aflcCommonPCA/v1/findAflcCommonPCAByCode?code=' + code).then(res => {
    res.code = code
    return res
  })
}

// 通过数据字典查询
/**
 * @export
 * @param {*} code 数据字典code值
 * @returns
 */
export function getDictionary(code) {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/' + code,
    method: 'get'
  })
}
// 投诉分类
export function DicComplainatusType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00424')
}
// 货损类型
export function DicClaimStatusType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF021')
}
// 处理状态
export function DicDelStatusType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF040')
}
// 物损处理状态
export function ClaimStatusType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF048')
}
//  数据字典获取移入黑名单原因列表
export function DicBlackType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02004')
}

  // 获取冻结原因字典
export function DicfreezeType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02003')
}

  // 获取服务分类
export function DicServiceType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF017')
}
// 获取车辆类型
export function DicCartype() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF018')
}

// 根据服务分类和车辆类型选择车长
export function GetCarStyle(serviceTypeCode, cartypeCode) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcStandardPrice/v1/getPriceByServiceAndCarType/' + serviceTypeCode + '/' + cartypeCode,
    method: 'get'
  })
}

// 获取货主类型
export function DicShippertype() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00101')
}

// 获取车辆规格 加宽  加长等
export function DicCarType() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF009',
    method: 'get'
  })
}

// 获取货主优惠等级
export function DicShipperLevel() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00208',
    method: 'get'
  })
}

// 获取货主优惠等级
export function DicQRcodeLink() {
    return fetch({
        url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF054',
        method: 'get'
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
// let UPLOADPOLICYDATA // 用来缓存上传policy
// export function getUploadPolicy() {
//   // 后期可添加是否过期的验证
//   if (UPLOADPOLICYDATA) {
//     return new Promise((resolve) => {
//       resolve(UPLOADPOLICYDATA)
//     })
//   } else {
//     return fetch.get('/api-common/common/oss/v1/policy').then(res => {
//       UPLOADPOLICYDATA = res.data || ''
//       return res.data || {}
//     })
//   }
// }

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
window.UPLOADPOLICYDATA = '' // 用来缓存上传policy
window.UPLOADPOLICYDATA_timer = '' // 加个定时器变量，防止没有引用的定时器被自动回收
/* window.UPLOADPOLICYDATA = {
  'accessid': 'LTAIFj5nQSIxEZ8H',
  'policy': 'eyJleHBpcmF0aW9uIjoiMjAxOC0wOS0xNlQxOToyMDowMS4zMTJaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==',
  'signature': 'A+ZRKPmw0mFXhNNdd5ycyoH6g9c=',
  'dir': 'tms/',
  'host': 'http://aflc.oss-cn-shenzhen.aliyuncs.com',
  'expire': '1537125601'
} */
export function getUploadPolicy() {
  // 后期可添加是否过期的验证
  if (window.UPLOADPOLICYDATA) {
    return new Promise((resolve) => {
      resolve(window.UPLOADPOLICYDATA)
    })
  } else {
    return fetch.get('/api-common/common/oss/v1/policy').then(res => {
      window.UPLOADPOLICYDATA = res.data || ''
      // 定时清除旧数据
      window.UPLOADPOLICYDATA_timer = setTimeout(() => {
        window.UPLOADPOLICYDATA = ''
      }, 1 * 60 * 1000)
      return window.UPLOADPOLICYDATA
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

  // 获取省级数据
export function data_getProvinceList() {
  return fetch.get('/' + baseurl + '/sm/aflcDistrict/v1/getProvinceList')
}

// 获取省级对应的城市列表
export function data_GetCityList(code) {
  return fetch({
    url: '/' + baseurl + '/sm/aflcDistrict/v1/lists',
    method: 'post',
    data: {
      'code': code
    }
  })
}

// 获取车辆类型列表
export function data_CarList() {
  return fetch.get('/' + baseurl + '/sm/aflcSysDict/v1/getCarTypeList')
}

// 获取服务分类子分类
export function data_ServerClassList() {
  return fetch.get('/' + baseurl + '/sm/aflcSysDict/v1/getServiceClassList')
}

// 获取会员服务承诺
export function data_LogisticsCompany() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF025',
    method: 'get'
  })
}

  // 获取三级业务城市树表
export function aflcAreaCode() {
  return fetch.get('/' + baseurl_two + '/common/aflcCityTree/v1/treaCode')
}

  // 获取二级业务城市树表
export function aflcProvinceCode() {
  return fetch.get('/' + baseurl_two + '/common/aflcCityTree/v1/provinceCode')
}

// 根据cityId获取开放城市服务区域定价
export function aflcCityCheckout(cityId) {
  return fetch.get('/aflcsmservice/sm/aflcAreaPrice/v1/open/' + cityId)
}

