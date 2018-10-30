import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/sm',
  component: Layout,
  redirect: '/sm/xiaohuoche/standardPrice',
  icon: 'yunyingguanli',
  name: '服务管理',
  noDropdown: true,
  meta: {
    title: '服务管理', code: 'SERVICE'
  },
  children: [
    {
      path: '/sm/xiaohuoche', 
      icon: 'xiaohuoche', 
      name: '小货车', 
      component: _import('sm/xiaohuoche/index'), 
      meta: { role: ['admin'], title: '小货车', stitle: '小货车', noCache: true , code: 'SERVICE_SMALL_CAR'},
      children: [
        {
            path: '/sm/xiaohuoche/standardPrice',
            name: '标准服务及定价',
            component: _import('sm/xiaohuoche/standardPrice/index'),
            meta: { role: ['admin'], title: '标准服务及定价', stitle: '标准', noCache: true , code: 'SERVICE_SMALL_CAR_STANDARD_PRICE'}
        },
        {
            path: '/sm/xiaohuoche/areaPrice',
            name: '区域服务及定价',
            component: _import('sm/xiaohuoche/areaPrice/index'),
            meta: { role: ['admin'], title: '区域服务及定价', stitle: '区域', noCache: true, code: 'SERVICE_SMALL_CAR_AREA_PRICE' }
        },
        {
            path: '/sm/xiaohuoche/extraPrice',
            name: '额外服务管理',
            component: _import('sm/xiaohuoche/extraPrice/index'),
            meta: { role: ['admin'], title: '额外服务管理', stitle: '额外', noCache: true , code: 'SERVICE_SMALL_CAR_OTHER_SERVICE'}
        },
        {
            path: '/sm/xiaohuoche/waitPrice',
            name: '等候费用定价',
            component: _import('sm/xiaohuoche/waitPrice/index'),
            meta: { role: ['admin'], title: '等候费用定价', stitle: '等候', noCache: true , code: 'SERVICE_SMALL_CAR_WAIT_PRICE'}
        }
      ]
    },
    {
      path: '/sm/lingdan', 
      icon: 'lingdan', 
      name: '发物流', 
      component: _import('sm/lingdan/index'), 
      meta: { role: ['admin'], title: '发物流', stitle: '发物流', noCache: true , code: 'SERVICE_LTL'},
      children: [
        { path: '/sm/lingdan/transportRange',
          hidden: false,
          name: '物流专线',
          component: _import('sm/lingdan/transportRange/index'),
          meta: { title: '物流专线', stitle: '专线', noCache: true , code: 'SERVICE_LTL_TRANSPORT_RANGE'}
        },
        { path: '/sm/lingdan/newTransportRange',
          hidden: true,
          name: '发布专线',
          component: _import('sm/lingdan/transportRange/newTransport'),
          meta: { title: '发布专线', stitle: '专线', noCache: true , code: ''}
        }
      ]
    },
    {
      path: '/sm/dahuoche', 
      icon: 'dahuoche', 
      name: '大货车', 
      component: _import('sm/dahuoche/index'), 
      meta: { role: ['admin'], title: '大货车', stitle: '大货车', noCache: true , code: 'SERVICE_BIG_CAR'},
      children: [

      ]
    }
  // {
  //   path: '/server/standardPrice/createOrder', icon: 'QQ', name: '创建运单', component: _import('server/order/createOrder/index'), meta: { role: ['admin'], title: '创建运单', noCache: true }
  // },
  // {
  //   path: '/server/order/pickClip', icon: 'QQ', name: '挑单夹', component: _import('server/order/pickClip/index'), meta: { role: ['admin'], title: '挑单夹', noCache: true }
  // }
  ]
}
