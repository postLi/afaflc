import fetch from '@/utils/fetch'

const baseurl = "aflcdispatchservice-lyc"


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

//获取公海推单设置列表
export function data_dispatchList(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/dispatch/aflcOpenseaRecommend/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }
  
//启用或禁用公海推单设置
export function data_ChangeStatus(id) {
  return fetch({
  url: '/'+baseurl+'/dispatch/aflcOpenseaRecommend/v1/enableOrDisable/',
  method: 'post',
  headers: {'Content-Type':'application/json'},
  data: id
  })
}



//删除公海推单设置
export function data_DeletInfo(id) {
  return fetch({
    url: '/'+baseurl+'/dispatch/aflcOpenseaRecommend/v1/delete',
    method: 'delete',
    data:id
  })
}


//

export function data_GetCarStyle(servicecode,cartype) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcStandardPrice/v1/getPriceByServiceAndCarType/'+servicecode+'/'+cartype,
    method: 'get'
  })
}

//新增公海推单设置
export function data_NewData(data) {
  return fetch({
    url: '/'+baseurl+'/dispatch/aflcOpenseaRecommend/v1/add',
    method: 'post',
    data:data
  })
}

//修改
export function data_OnlyChange(data) {
  return fetch({
    url: '/'+baseurl+'/sm/aflcAreaPrice/v1/update',
    method: 'post',
    data:data
  })
}







  

