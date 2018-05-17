/* 
* @Author: Marte
* @Date:   2018-05-14 18:21:36
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-16 18:05:26
*/

import fetch from '@/utils/fetch'

// 获取树节点的数据
export function data_Trees(page,pagesize,pid) {
  return fetch({
    url: '/api-common/sysDict/findSysDictByPid',
    method: 'post',
    data: {
        "currentPage": page,
        "pageSize": pagesize,
        "vo": {
          "pid": pid
        }
    }
  })
}

//获取树结构
export function data_Dic(){
    return fetch.get('/api-common/sysDict/list') 
}


//模糊查询
export function data_Search(page,pagesize,pid,info) {
  return fetch({
    url: '/api-common/sysDict/findSysDictByPid',
    method: 'post',
    data: {

          "currentPage": page,
          "pageSize": pagesize,
          "vo": {
            "pid":pid,
            "likeNameOrCode": info
          
          }
        
    }
  })
}

//获取code
export function data_CreatCode(pid) {
  return fetch({
    url: '/api-common/sysDict/nextCode/'+pid,
    method: 'get'
  })
}

// 删除数据
export function data_Delet(pid) {
  return fetch({
    url: '/api-common/sysDict/deleteSysDict/'+pid,
    method: 'post'
  })
}

//添加数据
export function data_AddForms(infoforms) {
  return fetch({
    url: '/api-common/sysDict/batchAddSysDict',
    method: 'post',
    data: infoforms
  })
}
//修改数据
export function data_ChangeForms(infoforms) {
  return fetch({
    url: '/api-common/sysDict/updateSysDict',
    method: 'post',
    data: infoforms
  })
}



