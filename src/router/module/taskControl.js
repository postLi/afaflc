import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/task',
  component: Layout,
  redirect: '/task/taskDispatch',
  icon: 'canzhao',
  name: '任务调度',
  noDropdown: true, 
  children: [
    {
      path: '/task/taskDispatch', icon: 'QQ', name: '任务管理', component: _import('task/taskDispatch/index'), meta: { role: ['admin'], title: '任务管理',stitle: '任务',  noCache: true }
    },
    {
        path: '/task/taskLog', icon: 'QQ', name: '调度日志', component: _import('task/taskLog/index'), meta: { role: ['admin'], title: '调度日志',stitle: '日志',  noCache: true }
    },
    {
        path: '/task/taskExecute', icon: 'QQ', name: '执行器管理', component: _import('task/taskExecute/index'), meta: { role: ['admin'], title: '执行器管理',stitle: '执行器',  noCache: true }
    },

]
}