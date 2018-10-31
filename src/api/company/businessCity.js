import fetch from '@/utils/fetch'
const baseurl = "aflc-common"
// const baseurl = "aflccommonservice-wtc"
//获取同城列表

export function data_CityList() {
  return fetch.get('/'+baseurl+'/common/aflcCityTree/v1/cityList')
}

//增加城市
export function data_AddCity(data){
    return fetch.post('/'+baseurl+'/common/aflcCityTree/v1/add',data) 
}