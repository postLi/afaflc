import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
    path: '/common',
    component: Layout,
    redirect: '/common/groupManage',
    name: '系统管理',
    icon: 'gongsiguanli',
    meta: {
        title: '系统管理', code: 'SYSTEM'
    },
  children: [
    { 
        path: '/common/index', 
        icon: 'information', 
        hidden: true, 
        name: '公司管理', 
        component: _import('common/index'), 
        meta: { title: '公司管理', stitle: '公司', noCache: true , code: ''}},
    // { 
    //     path: '/common/systemSetup', 
    //     icon: 'xitongshezhi',
    //     hidden: true, 
    //     name: '公司管理', 
    //     component: _import('common/systemSetup/index'), 
    //     meta: { title: '公司管理', stitle: '公司', noCache: true , code: ''}},
    { 
        path: '/common/groupManage', 
        icon: 'zuzhijiagou', 
        hidden: false, 
        name: '组织机构', 
        component: _import('common/groupManage/index'), 
        meta: { title: '组织机构', stitle: '机构', noCache: true , code: 'SYSTEM_ORG'}
    },
    { 
        path: '/common/permissionManage', 
        icon: 'quanxianguanli', 
        hidden: false, 
        name: '角色管理', 
        component: _import('common/permissionManage/index'), 
        meta: { title: '角色管理', stitle: '角色', noCache: true , code: 'SYSTEM_AUTH_MANEGE'}},
    {
      path: '/common/employeeManage',
      icon: 'yuangongguanli',
      hidden: false,
      name: '员工管理',
      component: _import('common/employeeManage/index'),
      meta: { title: '员工管理', stitle: '员工', noCache: true , code: 'SYSTEM_EMPLOYEE_MANAGE'}
    },
    {
      path: '/common/dataDictionary',
      icon: 'sjzd',
      hidden: false,
      name: '数据字典',
      component: _import('common/dataDictionary/index'),
      meta: { title: '数据字典', stitle: '数据', noCache: true, code: 'SYSTEM_DICT' }
    },
    {
      path: '/common/driverManage',
      icon: 'sijiguanli',
      hidden: true,
      name: '模板管理',
      component: _import('common/driverManage/index'),
      meta: { title: '模板管理', stitle: '模板', noCache: true, code: '' }
    },
    {
      path: '/common/trunkManage',
      icon: 'cheliangguanli',
      hidden: true,
      name: '片区管理',
      component: _import('common/trunkManage/index'),
      meta: { title: '片区管理', stitle: '片区', noCache: true, code: '' }
    },
    {
        path: '/common/task',
        icon: 'rwdd',
        hidden: true,
        name: '任务调度',
        component: _import('common/index'),
        meta: { title: '任务调度', stitle: '任务', noCache: true , code: 'SYSTEM_TASK'},
        children:[
            {
                path: '/common/task/taskDispatch', 
                icon: 'QQ', 
                name: '任务管理', 
                component: _import('common/task/taskDispatch/index'), 
                meta: { role: ['admin'], title: '任务管理',stitle: '任务',  noCache: true , code: 'SYSTEM_TASK_TASK_MANAGE'}
              },
              {
                  path: '/common/task/taskLog', 
                  icon: 'QQ', 
                  name: '调度日志', 
                  component: _import('common/task/taskLog/index'), 
                  meta: { role: ['admin'], title: '调度日志',stitle: '日志',  noCache: true , code: 'SYSTEM_TASK_DISPATCH_LOG'}
              },
              {
                  path: '/common/task/taskExecute', 
                  icon: 'QQ', 
                  name: '执行器管理', 
                  component: _import('common/task/taskExecute/index'),
                   meta: { role: ['admin'], title: '执行器管理',stitle: '执行器',  noCache: true , code: 'SYSTEM_TASK_EXECUTE_MANAGE'}
              },
        ]
    },
      {
        path: '/common/businessCity',
        icon: 'rwdd',
        hidden: false,
        name: '开放城市',
        component: _import('common/businessCity/index'),
        meta: { title: '开放城市', stitle: '城市', noCache: true }
      },
      {
        path: '/common/appManage',
        icon: 'sijiguanli',
        hidden: false,
        name: 'APP管理',
        component: _import('common/appManage/index'),
        meta: { title: 'APP管理', stitle: 'APP', noCache: true }
      },

      {
        path: '/common/businessCity/City',
        icon: 'sijiguanli',
        hidden: true,
        name: '业务城市围栏',
        component: _import('common/businessCity/businessCityMap'),
        meta: { title: '城市围栏', stitle: '围栏', noCache: true }
      },

  ]
}
