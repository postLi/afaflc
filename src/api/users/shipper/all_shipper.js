import fetch from '@/utils/fetch'

const baseurl = 'aflcusercenterservice'
const baseurl_two = 'aflccommonservice'
const baseurl_three = 'aflcsmservice'

// 获取货主列表
export function data_get_shipper_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcShipper/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取状态列表
export function data_get_shipper_status() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00104',
    method: 'get'
  })
}

 // 货主页面 -新增
export function data_get_shipper_create(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcShipper/v1/add', data)
}

// 货主类型的获取
export function data_get_shipper_type() {
  return fetch({
    url: '/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00101',
    method: 'get'
  })
}

// 根据手机号码获取货主
export function data_get_shipper_view(mobile) {
  return fetch.post('/' + baseurl + '/usercenter/aflcShipper/v1/findByMobile/' + mobile)
}
// 获取省市数据
export function data_Area() {
  return fetch.get('/' + baseurl_three + '/sm/aflcDistrict/v1/getProvinceList')
}


//  修改货主表
export function data_get_shipper_change(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcShipper/v1/update', data)
}

// 获取省级对应的城市列表
export function data_GetCityList(code) {
  return fetch({
    url: '/' + baseurl_three + '/sm/aflcDistrict/v1/lists',
    method: 'post',
    data: {
      'code': code
    }
  })
}

// 获取冻结原因字典
export function data_get_shipper_freezeType() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02003')
}
//  获取移入黑名单原因列表
// export function data_get_shipper_BlackType() {
//   return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF02004')
// }

// 获取账户状态列表
export function data_get_shipper_auid() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00105')
}

//车主冻结
export function data_get_freeze(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/freezeAflcDriver', data)
}
//车主冻结修改
export function data_get_freeze_change(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/freezeUpdateAflcDriver', data)
}
//车主解冻
export function data_unbind_freeze_change(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/unfreezeAflcDriver', data)
}
//车主移入解冻
export function data_blacklist(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/putBlackAflcDriver', data)
}
export function data_remove_blacklist(data){
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/outPutBlackAflcDriver', data)
}