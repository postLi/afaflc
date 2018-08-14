import fetch from '@/utils/fetch'

const baseurl = 'aflcusercenterservice'
const baseurl_two = 'aflccommonservice'
const baseurl_three = 'aflcsmservice'
const baseurl_four = 'aflcusercenterservice-lyc'

// 获取车主列表
export function data_get_driver_list(page, pagesize, data) {
  return fetch({
    url: '/' + baseurl + '/usercenter/aflcDriver/v1/list',
    method: 'post',
    data: {
      'currentPage': page,
      'pageSize': pagesize,
      'vo': data
    }
  })
}

// 获取状态列表
export function data_get_driver_status() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00104')
}

// 根据id获取车主
export function data_get_driverName_id() {
  return fetch.get('/' + baseurl + '/usercenter/aflcDriver/v1/{id}')
}

// 新增车主
export function data_post_createDriver(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/add', data)
}

// 认证审核
export function data_post_audit(data) {
  return fetch.post('/' + baseurl + '//usercenter/aflcDriver/v1/authAflcDriver', data)
}

// 根据手机号码获取车主
export function data_post_mobileGetDriver(data) {
  return fetch.get('/' + baseurl + '/usercenter/aflcDriver/v1/checkDriverMobile/' + data, data)
}

// 冻结车主
export function data_put_freezeDriver(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/freezeAflcDriver', data)
}
// 车主冻结修改
export function data_get_freezeDriverchange(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/freezeUpdateAflcDriver', data)
}
// 车主解冻
export function data_unbind_freezeDriverchange(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/unfreezeAflcDriver', data)
}
// 移入黑名单
export function data_put_PutBlack(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/putBlackAflcDriver', data)
}

// 移入黑名单
export function data_put_OutBlack(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/outPutBlackAflcDriver', data)
}

// 修改车主
export function data_put_changeDriver(data) {
  return fetch.put('/' + baseurl + '/usercenter/aflcDriver/v1/putBlackAflcDriver', data)
}

// 代客认证
export function data_post_driverAudit(data) {
  return fetch.post('/' + baseurl + '/usercenter/aflcDriver/v1/valetAuthAflcDriver', data)
}

// 获取车辆类型列表
export function data_CarList() {
  return fetch.get('/' + baseurl_three + '/sm/aflcSysDict/v1/getCarTypeList')
}

//  获取车型列表
export function data_Get_carType() {
  return fetch.get('/' + baseurl_three + '/sm/aflcSysDict/v1/getCarSpecList')
}

// 获取中单等级列表
export function data_get_driver_obStatus() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00503')
}

// 获取账户状态列表
export function data_get_shipper_auid() {
  return fetch.get('/' + baseurl_two + '/sysDict/getSysDictByCodeGet/AF00105')
}

// 根据身份证获取车主
export function data_post_checkDriverCardid(data) {
  return fetch.get('/' + baseurl_four + '/usercenter/aflcDriver/v1/checkDriverCardid/' + data, data)
}
