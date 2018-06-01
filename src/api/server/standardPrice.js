import fetch from '@/utils/fetch'

const baseurl = "aflcsmservice"

//获取标准服务费用列表
export function data_GetInformation(page,pagesize) {
    return fetch({
      url: '/'+baseurl+'/sm/aflcStandardPrice/v1/list',
      method: 'post',
      data:{
        "currentPage":page ,
        "pageSize": pagesize,
        "vo": {}
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


//新增数据 和  修改数据
export function data_AddForms(infoforms) {
    return fetch({
		url: '/'+baseurl+'/sm/aflcStandardPrice/v1/add',
		method: 'post',
		data: infoforms
    })
  }

//删除数据
export function data_DeletInfo(infoforms) {
    return fetch({
		url: '/'+baseurl+'/sm/aflcStandardPrice/v1/delete',
		method: 'post',
		data: infoforms
    })
  }

  
//更改状态
export function data_ChangeStatus(id) {
    return fetch({
		url: '/'+baseurl+'/sm/aflcStandardPrice/v1/openOrForbidden',
		method: 'post',
		data: id
    })
  }




  


  