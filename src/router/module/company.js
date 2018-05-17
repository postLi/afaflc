import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/company',
  component: Layout,
  redirect: '/company/systemSetup',
  name: '系统管理',
  icon: 'gongsiguanli',
  children: [
    { path: '/company/index', icon: 'information', hidden: true, name: '公司管理', component: _import('company/index'), meta: { title: '公司管理', stitle: '公司', noCache: true }},
    { path: '/company/systemSetup', icon: 'xitongshezhi', hidden: false, name: '公司管理', component: _import('company/systemSetup/index'), meta: { title: '公司管理', stitle: '公司', noCache: true }},
    { path: '/company/groupManage', icon: 'zuzhijiagou', hidden: false, name: '账号管理', component: _import('company/groupManage/index'), meta: { title: '账号管理', stitle: '账号', noCache: true }
    },
    { path: '/company/permissionManage', icon: 'quanxianguanli', hidden: false, name: '权限管理', component: _import('company/permissionManage/index'), meta: { title: '权限管理', stitle: '权限', noCache: true }},
    {
      path: '/company/employeeManage',
      icon: 'yuangongguanli',
      hidden: false,
      name: '角色管理',
      component: _import('company/employeeManage/index'),
      meta: { title: '角色管理', stitle: '角色', noCache: true }
    },
    {
      path: '/company/dataDictionary',
      icon: 'kehuguanli',
      hidden: false,
      name: '数据字典',
      component: _import('company/dataDictionary/index'),
      meta: { title: '数据字典', stitle: '数据', noCache: true }
    },
    {
      path: '/company/driverManage',
      icon: 'sijiguanli',
      hidden: false,
      name: '模板管理',
      component: _import('company/driverManage/index'),
      meta: { title: '模板管理', stitle: '模板', noCache: true }
    },
    {
      path: '/company/trunkManage',
      icon: 'cheliangguanli',
      hidden: false,
      name: '片区管理',
      component: _import('company/trunkManage/index'),
      meta: { title: '片区管理', stitle: '片区', noCache: true }
    },
  ]
}
