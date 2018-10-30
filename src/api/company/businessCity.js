import fetch from '@/utils/fetch'
const baseurl = "aflc-common"

//获取同城列表
export function data_CityList(page,pagesize,data) {
    return fetch({
      url: '/'+baseurl+'/common/aflcCityTree/v1/list',
      method: 'post',
      data:{
        "currentPage": page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//增加城市
export function data_AddCity(){
    return fetch.get('/'+baseurl+'/common/aflcCityTree/v1/add') 
}