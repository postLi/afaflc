
import fetch from '@/utils/fetch'

const baseUrl = 'aflcusercenterservice'

//新增增值服务定价-线路增值服务定价
export function newTradeAreaLineCarrier(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/add',
      method: 'post',
      data:data
    })
  }

//根据条件获取增值服务定价import列表-线路增值服务定价
export function TradeAreaLineCarrierList(page,pagesize,data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/importlist',
      method: 'post',
      data:{
        "currentPage":page,
        "pageSize": pagesize,
        "vo": data
      }
    })
  }

//根据ids 启用或禁用增值服务定价
export function TradeAreaLineCarrierStatus(data){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/enableOrDisable',
      method: 'post',
      data:data
    })
  }


//根据areaCode获取增值服务定价
export function TradeAreaLineCarrierDetails(areaCode){
    return fetch({
      url: '/'+baseUrl+'/usercenter/aflcIncrementPrice/v1/areaCode?areaCode=' + areaCode,
      method: 'get',
    })
  }
