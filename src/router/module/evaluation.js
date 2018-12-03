import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/evaluation/',
  component: Layout,
  redirect: '/evaluation/truck/kpiSetup',
  name: '考核管理',
  icon: 'kehuguanli',
  hidden: false,
  meta: { title: '考核管理' },
  children: [
    {
      path: '/evaluation/truck',
      name: '小货车',
      icon: 'zonghe',
      component: _import('evaluation/index'),
      meta: { role: ['admin'], title: '小货车', noCache: true },
      children: [{
        path: '/evaluation/truck/kpiSetup',
        name: 'KPI考核设置',
        component: _import('evaluation/truck/kpiSetup'),
        meta: { role: ['admin'], title: 'KPI考核设置', stitle: 'KPI', noCache: true }
      }, {
        path: '/evaluation/truck/evaluationTotal',
        name: '考核汇总表',
        component: _import('evaluation/truck/evaluationTotal'),
        meta: { role: ['admin'], title: '考核汇总表', stitle: '考核', noCache: true }
      }]
    }
  ]
}
