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
    { path: '/common/index', icon: 'information', hidden: true, name: '公司管理', component: _import('common/index'), meta: { title: '公司管理', stitle: '公司', noCache: true }},
    { path: '/common/systemSetup', icon: 'xitongshezhi', hidden: true, name: '公司管理', component: _import('common/systemSetup/index'), meta: { title: '公司管理', stitle: '公司', noCache: true }},
    { path: '/common/groupManage', icon: 'zuzhijiagou', hidden: false, name: '组织机构', component: _import('common/groupManage/index'), meta: { title: '组织机构', stitle: '机构', noCache: true }
    },
    { path: '/common/permissionManage', icon: 'quanxianguanli', hidden: false, name: '角色管理', component: _import('common/permissionManage/index'), meta: { title: '角色管理', stitle: '角色', noCache: true }},
    {
      path: '/common/employeeManage',
      icon: 'yuangongguanli',
      hidden: false,
      name: '员工管理',
      component: _import('common/employeeManage/index'),
      meta: { title: '员工管理', stitle: '员工', noCache: true }
    },
    {
      path: '/common/dataDictionary',
      icon: 'sjzd',
      hidden: false,
      name: '数据字典',
      component: _import('common/dataDictionary/index'),
      meta: { title: '数据字典', stitle: '数据', noCache: true }
    },
    {
      path: '/common/driverManage',
      icon: 'sijiguanli',
      hidden: true,
      name: '模板管理',
      component: _import('common/driverManage/index'),
      meta: { title: '模板管理', stitle: '模板', noCache: true }
    },
    {
      path: '/common/trunkManage',
      icon: 'cheliangguanli',
      hidden: true,
      name: '片区管理',
      component: _import('common/trunkManage/index'),
      meta: { title: '片区管理', stitle: '片区', noCache: true }
    },
    {
        path: '/common/task',
        icon: 'rwdd',
        hidden: false,
        name: '任务调度',
        component: _import('common/index'),
        meta: { title: '任务调度', stitle: '任务', noCache: true },
        children:[
            {
                path: '/common/task/taskDispatch', icon: 'QQ', name: '任务管理', component: _import('common/task/taskDispatch/index'), meta: { role: ['admin'], title: '任务管理',stitle: '任务',  noCache: true }
              },
              {
                  path: '/common/task/taskLog', icon: 'QQ', name: '调度日志', component: _import('common/task/taskLog/index'), meta: { role: ['admin'], title: '调度日志',stitle: '日志',  noCache: true }
              },
              {
                  path: '/common/task/taskExecute', icon: 'QQ', name: '执行器管理', component: _import('common/task/taskExecute/index'), meta: { role: ['admin'], title: '执行器管理',stitle: '执行器',  noCache: true }
              },
        ]
    },
    {
        path: '/common/announcement',
        icon: 'cheliangguanli',
        hidden: false,
        name: '发布公告',
        component: _import('common/announcement/index'),
        meta: { title: '发布公告', stitle: '公告', noCache: true }
      },
      {
        path: '/common/businessCity',
        icon: 'cheliangguanli',
        hidden: true,
        name: '业务城市',
        component: _import('common/businessCity/index'),
        meta: { title: '业务城市', stitle: '城市', noCache: true }
      },

  ]
}
