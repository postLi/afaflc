import fetch from '@/utils/fetch'

const baseurl = "aflcjobadmin"


//执行器列表信息
export function data_taskExecuteList(params){
    return fetch.get('/'+baseurl+'/jobgroup').then(res => {
        return res.data || {} 
    })
}

//新增执行器
export function data_newTaskExecute(data) {
    return fetch({
        url: '/'+baseurl+'/jobgroup/save',
        method: 'post',
        data: data
    })
}

//删除执行器

export function data_removeTaskExecute(id) {
    return fetch({
        url: '/'+baseurl+'/jobgroup/remove',
        method: 'post',
        id: id
    })
}
















  

