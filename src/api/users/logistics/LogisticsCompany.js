import fetch from '@/utils/fetch'

const baseurl = "aflcusercenterservice"

//获取物流公司列表
export function data_LogisticsCompanyList(page,pagesize,data) {
    return fetch({
        url: '/'+baseurl+'/usercenter/aflcLogisticsCompany/v1/list',
        method: 'post',
        data:{
            "currentPage":page ,
            "pageSize": pagesize,
            "vo": data
          }
    })
}   

//修改物流公司
export function data_ChangeLogisticsCompany(data) {
    return fetch({
        url: '/'+baseurl+'/usercenter/aflcLogisticsCompany/v1/update',
        method: 'PUT',
        data:data
    })
}















  

