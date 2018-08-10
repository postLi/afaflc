import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/marketing',
  component: Layout,
  redirect: '/marketing/carmarkting/carmaid',
  icon: 'baobiao',
  name: '营销管理',
  // hidden: true,
  noDropdown: false,
  children: [
  {          
        path: '/marketing/carmarkting', icon: 'QQ', name: '车主营销管理', component: _import('marketing/carmarkting/index'), meta: { role: ['admin'], title: '车主营销管理', stitle:'车主', noCache: true },
        children: [
        {
        path: '/marketing/carmarkting/carmaid', name: '抽佣管理', component: _import('marketing/carmarkting/carmaid/index'), meta: { role: ['admin'], title: '抽佣管理',stitle: '抽佣',  noCache: true }
        }
        ]
  } 
  ]
}
