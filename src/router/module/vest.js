import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default{
    path: '/vest',
    component: Layout,
    redirect: '/vest/pushsheet',
    name: '马甲货源',
    icon: 'zujian',
    children: [
        { path: '/vest/pushsheet', icon: 'QQ', hidden: false, name: '推送设置', component: _import('vest/pushsheet/index'), meta: { title: '推送设置', stitle: '推送',noCache: true },
        },

    ]
}