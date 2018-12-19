<template>
    <div class="TCorderInfo clearfix OrderLog" v-if="formData.length != 0">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo" >
            <h2>基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>订单编号：</span>
                    <span>{{formData.orderExpenses.orderSerial}}</span>
                 </p>
                <p>
                    <span>所属区域：</span>
                    <span>{{formData.startProvince}}-{{formData.startCity}}-{{formData.startArea}}</span>
                 </p>
                <p>
                    <span>订单类型：</span>
                    <span>{{formData.orderTypeName}}</span>
                </p>                 
                <p>
                    <span>订单状态：</span>
                    <span>{{formData.orderStatusName}}</span>
                </p>  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>装货时间：</span>
                    <span>{{formData.loadingTime}}</span>
                 </p>
                <p>
                    <span>下单时间：</span>
                    <span>{{formData.useTime}}</span>
                 </p>
                <p>
                    <span>货主账号：</span>
                    <span>{{formData.shipperMobile}}</span>
                 </p>                 
                <p>
                    <span>货主姓名：</span>
                    <span>{{formData.shipperName}}</span>
                </p>  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>订单来源：</span>
                    <span>{{formData.orderFromName}}</span>
                </p>
            </div>
        </div>

        <!-- 地址信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>地址信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>发货地：</span>
                    <span v-if="formData.aflcOrderAddressWebDtoList.length>0">{{formData.aflcOrderAddressWebDtoList[0].viaAddressName}}</span>
                 </p>
                <p>
                    <span>街道/门牌号：</span>
                    <span v-if="formData.aflcOrderAddressWebDtoList.length>0">{{formData.aflcOrderAddressWebDtoList[0].viaAddress}}</span>
                 </p>
                <p>
                    <span>发货人：</span>
                    <span v-if="formData.aflcOrderAddressWebDtoList.length>0">{{formData.aflcOrderAddressWebDtoList[0].contacts}}</span>
                 </p>                 
                <p>
                    <span>联系方式：</span>
                    <span v-if="formData.aflcOrderAddressWebDtoList.length>0">{{formData.aflcOrderAddressWebDtoList[0].contactsPhone}}</span>
                </p>  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>目的地：</span>
                    <span v-if="formData.aflcOrderAddressWebDtoList.length>0">{{formData.aflcOrderAddressWebDtoList[1].viaAddressName}}</span>
                 </p>
                <p>
                    <span>街道/门牌号：</span>
                    <span v-if="formData.aflcOrderAddressWebDtoList.length>0">{{formData.aflcOrderAddressWebDtoList[1].viaAddress}}</span>
                </p>
                <p>
                    <span>收货人：</span>
                    <span v-if="formData.aflcOrderAddressWebDtoList.length>0">{{formData.aflcOrderAddressWebDtoList[1].contacts}}</span>
                </p>                 
                <p>
                    <span>联系方式：</span>
                    <span v-if="formData.aflcOrderAddressWebDtoList.length>0">{{formData.aflcOrderAddressWebDtoList[1].contactsPhone}}</span>
                </p>  
            </div>
        </div>

        <!-- 货物及备注 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>货物及备注</h2>
            <div class="essentialInformation" >
                <p>
                    <span>重量 / 体积：</span>
                    <span v-if="formData.aflcFCLOrderGoodsDtoList.length>0">{{formData.aflcFCLOrderGoodsDtoList[0].goodsWeight}}  <i class="red">/</i>  {{formData.aflcFCLOrderGoodsDtoList[0].goodsVolume}}</span>
                 </p>
                <p>
                    <span>货物名称 / 件数：</span>
                    <span v-if="formData.aflcFCLOrderGoodsDtoList.length>1">{{formData.aflcFCLOrderGoodsDtoList[0].goodsName}}  <i  class="red">/</i>  {{formData.aflcFCLOrderGoodsDtoList[0].goodsNum}}</span>
                 </p>
                <p>
                    <span>货物保价：</span>
                    <span>{{formData.valuationCost}}</span>
                </p>                 
                <p>
                    <span>时效：</span>
                    <span>{{formData.transportAging}}</span>
                </p>  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>上门提货：</span>
                    <span>{{formData.isDoorPickUp=='1'?'是':'否'}}</span>
                </p>
                <p>
                    <span>送货上门：</span>
                    <span>{{formData.isDoorDelivery=='1'?'是':'否'}}</span>
                </p>
                <p>
                    <span>回单：</span>
                    <span>{{formData.isReceipt?'是':'否'}}</span>
                </p>                 
                <p>
                    <span>回款：</span>
                    <span>{{formData.isReceivable?'是':'否'}}</span>
                </p>  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>开票：</span>
                    <span>{{formData.invoiceTitle}}</span>
                </p>
            </div>
        </div>

        <!-- 运费信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>运费信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>付款状态：</span>
                    <span>{{formData.payStatusName}}</span>
                 </p>
                <p>
                    <span>付款时间：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>付款方式：</span>
                    <span>1</span>
                </p>                 
                <p>
                    <span>是否改价：</span>
                    <span>1</span>
                </p>  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>订单总额：</span>
                    <span>{{formData.totalAmount}}</span>
                </p>
                <p>
                    <span>干线费：</span>
                    <span>1</span>
                </p>
                <p>
                    <span>保价服务费：</span>
                    <span>1</span>
                </p>                 
                <p>
                    <span>协商差价：</span>
                    <span>1</span>
                </p>  
            </div>
            <div class="essentialInformation">
                <p>
                    <span>上门提货费：</span>
                    <span>1</span>
                </p>
                <p>
                    <span>送货上门费：</span>
                    <span>1</span>
                </p>
                <p>
                    <span>优惠券抵扣：</span>
                    <span>1</span>
                </p>
                <p>
                    <span>优惠金抵扣：</span>
                    <span>1</span>
                </p>                                
            </div>
            <div class="essentialInformation">
                <p>
                    <span>奖励金发放：</span>
                    <span>1</span>
                </p>
                <p>
                    <span>订单抽佣：</span>
                    <span>1</span>
                </p>
                <p>
                    <span>货主支付：</span>
                    <span>1</span>
                </p>
                <p>
                    <span>物流公司收入：</span>
                    <span>1</span>
                </p>                                
            </div>
        </div>

        <!-- 物流公司信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>物流公司信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>物流公司账号：</span>
                    <span>{{formData.logisticsCompanyPhone}}</span>
                 </p>
                <p>
                    <span>物流公司负责人：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>承运网点：</span>
                    <span>1</span>
                </p>                 
                <p>
                    <span>网点负责人：</span>
                    <span>1</span>
                </p>  
            </div>
        </div>

        <!-- 客服备注 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>客服备注</h2>
            <div class="essentialInformation">
                <p>
                    <span>客服备注：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>备注时间：</span>
                    <span>1</span>
                 </p>
                <p>
                    <span>备注内容：</span>
                      <el-tooltip placement="top-start" effect="dark" content="ssssssssss">
                          <span>客服备注内容与那个呗</span>
                      </el-tooltip>
                </p>                 
            </div>
        </div>

    </div>
</template>

<script>
import {getFCLOrderByOrderSerial} from '@/api/order/logistics/logistics.js'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
export default {
    data(){
        return{
         formData:[]
        }
    },
    methods:{
    firstblood(){
        getFCLOrderByOrderSerial(this.$route.query.orderSerial).then(res=>{
            console.log('data：',res)
            this.formData = res.data
            this.formData.useTime = parseTime(this.formData.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
        })
        }
    },
    mounted() {
     this. firstblood()
    },
}
</script>

<style lang="scss">
.OrderLog{
    .red{
        color: red;
        padding: 0px 10px;
    }
}
</style>
