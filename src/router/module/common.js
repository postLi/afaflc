import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/common',
  component: Layout,
  redirect: '/common/systemSetup',
  name: '系统管理',
  icon: 'gongsiguanli',
  children: [
    { path: '/common/index', icon: 'information', hidden: true, name: '公司管理', component: _import('common/index'), meta: { title: '公司管理', stitle: '公司', noCache: true }},
    { path: '/common/systemSetup', icon: 'xitongshezhi', hidden: false, name: '公司管理', component: _import('common/systemSetup/index'), meta: { title: '公司管理', stitle: '公司', noCache: true }},
    { path: '/common/groupManage', icon: 'zuzhijiagou', hidden: false, name: '账号管理', component: _import('common/groupManage/index'), meta: { title: '账号管理', stitle: '账号', noCache: true }
    },
    { path: '/common/permissionManage', icon: 'quanxianguanli', hidden: false, name: '权限管理', component: _import('common/permissionManage/index'), meta: { title: '权限管理', stitle: '权限', noCache: true }},
    {
      path: '/common/employeeManage',
      icon: 'yuangongguanli',
      hidden: false,
      name: '角色管理',
      component: _import('common/employeeManage/index'),
      meta: { title: '角色管理', stitle: '角色', noCache: true }
    },
    {
      path: '/common/dataDictionary',
      icon: 'kehuguanli',
      hidden: false,
      name: '数据字典',
      component: _import('common/dataDictionary/index'),
      meta: { title: '数据字典', stitle: '数据', noCache: true }
    },
    {
      path: '/common/driverManage',
      icon: 'sijiguanli',
      hidden: false,
      name: '模板管理',
      component: _import('common/driverManage/index'),
      meta: { title: '模板管理', stitle: '模板', noCache: true }
    },
    {
      path: '/common/trunkManage',
      icon: 'cheliangguanli',
      hidden: false,
      name: '片区管理',
      component: _import('common/trunkManage/index'),
      meta: { title: '片区管理', stitle: '片区', noCache: true }
    },
  ]
}
