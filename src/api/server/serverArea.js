import fetch from '@/utils/fetch'

const baseurl = "aflcsmservice"


// 获取区域树节点的数据

export function data_Area(){
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

//根据id获取服务区域定价  he  查询功能
export function data_GetCityInfo(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcAreaPrice/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
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


//更改状态
export function data_ChangeStatus(id) {
  return fetch({
  url: '/'+baseurl+'/sm/aflcAreaPrice/v1/openOrForbidden',
  method: 'post',
  data: id
  })
}



//删除服务区域定价
export function data_Delete(id) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcAreaPrice/v1/delete/',
    method: 'post',
    data:id
  })
}





  

