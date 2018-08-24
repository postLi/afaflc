<template>
    <div class="TCorderInfo clearfix" v-loading="loading" v-if="listInformation.length != 0">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>订单编号：</span>
                    <span>{{listInformation.orderSerial}}</span>
                 </p>
                <p>
                    <span>所属区域：</span>
                    <span>{{listInformation.belongCity}}</span>
                </p>
                <p>
                    <span>服务分类：</span>
                    <span>{{listInformation.orderType}}</span>
                </p>
                <p>
                    <span>订单状态：</span>
                    <span>{{listInformation.orderStatus}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>订单类型：</span>
                    <span>{{listInformation.orderClass === '1' ? '实时订单' : '预约订单'}}</span>
                </p>
                <p>
                    <span>用车时间：</span>
                    <span>{{listInformation.useCarTime | parseTime}}</span>
                </p>
                <p>
                    <span>下单时间：</span>
                    <span>{{listInformation.useTime | parseTime}}</span>
                </p>
                <p>
                    <span>货主账号：</span>
                    <span class="fontRed">{{listInformation.shipperMobile}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>货主姓名：</span>
                    <span class="fontRed">{{listInformation.shipperName}}</span>
                </p>        
                <p>
                    <span>所需车型：</span>
                    <span>{{listInformation.usedCarType}} </span>
                    <span v-if="listInformation.spec">- {{listInformation.spec}}</span>
                </p>
                <p>
                    <span>我的司机优先接单：</span>
                    <span>{{listInformation.isFirst == 1 ? '已选' : '未选'}}</span>
                </p>
                <p>
                    <span>订单来源：</span>
                    <span>{{listInformation.orderFrom}}</span>
                </p>
            </div>
        </div>
        <!-- 地址信息 -->
        <div class="address-collapse collapseInfo">
            <h2>地址信息</h2>
            <div class="essentialInformation" v-for="(obj,idx) in listInformation.aflcOrderAddresses" :key="obj.id">
                <p class="morewidth">
                    <span v-if="idx == 0">发货地：</span>
                    <span v-else-if="idx == listInformation.aflcOrderAddresses.length-1">收货地：</span>
                    <span v-else>途径地{{ listInformation.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                    <span>{{obj.viaAddressName}}({{obj.provinceCityArea}}{{obj.viaAddress}})</span>
                </p>
                <p>
                    <span v-if="idx == 0">发货人：</span>
                    <span v-else>收货人：</span>
                    <span>{{obj.contacts}}</span>
                </p>
                    <p>
                    <span>联系方式：</span>
                    <span>{{obj.contactsPhone}}</span>
                </p>
            </div>
        </div>
        <!-- 货物及备注 -->
        <div class="mark-collapse collapseInfo">
            <h2>货物及备注</h2>
            <div class="essentialInformation">
                <p>
                    <span>货物名称：</span>
                    <span v-if="listInformation.goodsName">{{listInformation.goodsName}}</span>
                    <span v-else>未填写</span>
                 </p>
                <p>
                    <span>重量体积：</span>
                    <span v-if="listInformation.goodsWeight || listInformation.goodsVolume">{{listInformation.goodsWeight ? listInformation.goodsWeight+'吨' : ''}} {{listInformation.goodsVolume ? listInformation.goodsVolume + '方':''}}</span>
                    <span v-else>未填写</span>
                </p>
                <p>
                    <span>额外服务：</span>
                    <span v-if="listInformation.extraName" class="fontRed">{{listInformation.extraName}}</span>
                    <span v-else>未填写</span>
                </p>
                <p>
                    <span>备注：</span>
                    <span v-if="listInformation.remark">{{listInformation.remark}}</span>
                    <span v-else>未填写</span>
                </p>
            </div>
        </div>

        <!-- 运费信息 -->
        <div class="yunfei-collapse collapseInfo">
            <h2>运费信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>运费总额：</span>
                    <span class="fontRed">￥{{listInformation.totalAmount}}</span>
                 </p>
                <p>
                    <span>货主支付：</span>
                    <span class="fontRed">￥{{listInformation.aflcOrderExpenses.factPay}}({{listInformation.payWay}})</span>
                </p>
                <p> 
                    <span>车主收入：</span>
                    <span class="fontRed">￥{{listInformation.orderType}}</span>
                </p>
                <p>
                    <span>付款状态：</span>
                    <span class="fontRed">{{listInformation.payStatus}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>里程数：</span>
                    <span>{{listInformation.aflcOrderExpenses.totalMileage}}公里</span>
                </p>
                <p>
                    <span>起步价：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.startPrice}}</span>
                </p>
                <p>
                    <span>超里程费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.outMileagePrice}}</span>
                    <span v-if="listInformation.aflcOrderExpenses.outMileagePrice != 0">({{listInformation.outMileage}} 公里)</span>
                </p>
                <p>
                    <span>额外服务费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.totalExtraCharge}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>等候费：</span>
                    <span>￥{{listInformation.shipperName}}</span>
                </p>
                <p>
                    <span>小费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.tip}} </span>
                </p>
                <p>
                    <span>车主改价：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.driverChangeFee}}</span>
                </p>
                <p>
                    <span>优惠券抵扣：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.preferentialPrice}}</span>
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>平台奖励车主：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.reward}}</span>
                </p>
            </div>
        </div>

        <!--  车主信息 -->
        <div class="mark-collapse collapseInfo">
            <h2> 车主信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>车主账号：</span>
                    <!-- <span>{{listInformation.aflcDriverStatus.driverMobile ? listInformation.aflcDriverStatus.driverMobile :''}}</span> -->
                 </p>
                <p>
                    <span>车主姓名：</span>
                    <!-- <span>{{listInformation.aflcDriverStatus.driverName}}</span> -->
                </p>
                <p>
                    <span>车牌号：</span>
                    <!-- <span>{{listInformation.aflcDriverStatus.carNumber}}</span> -->
                </p>
                <p>
                    <span>车型：</span>
                    <!-- <span>{{listInformation.aflcDriverStatus.carType}}</span> -->
                </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>中单等级：</span>
                    <span>{{listInformation.orderClass === '1' ? '实时订单' : '预约订单'}}</span>
                </p>
                <p>
                    <span>派单方式：</span>
                    <span></span>
                </p>
            </div>
        </div>

        <!--  客服备注 -->
        <div class="mark-collapse collapseInfo">
            <h2> 客服备注</h2>
             <div class="essentialInformation">
                <p>
                    <span>客服：</span>
                    <!-- <span>{{listInformation.aflcDriverStatus.driverMobile}}</span> -->
                 </p>
                <p>
                    <span>备注时间：</span>
                    <!-- <span>{{listInformation.aflcDriverStatus.driverName}}</span> -->
                </p>
                <p class="markInfo">
                    <span>备注内容：</span>
                    <!-- <span>{{listInformation.aflcDriverStatus.carNumber}}</span> -->
                </p>
            </div>
        </div>
    </div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import { orderDetailsList } from '@/api/order/ordermange'


export default {
    name: 'TCorderInfo',
    components:{

    },
    props: {
        isvisible: {
            type: Boolean,
            default: false
        },
       
    },
    data() {
        return {
            listInformation:[],
            loading:true,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03', 
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
        };
    },
    watch:{
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal){
                    this.init();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
    },
    methods: {
        init(){
            console.log('orderInfo')
            orderDetailsList(this.$route.query.orderSerial).then(res => {
                console.log('details',res)
                this.listInformation = res.data;
                this.listInformation.aflcOrderAddresses.sort(function(a,b){  
                    return a.viaOrder - b.viaOrder;  
                })
                this.loading = false;
            })
        },
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .TCorderInfo{
        .collapseInfo{
            border: 1px solid #e2e2e2;
            background: #ffffff;
            color: #333;
            padding: 0 24px;
            padding-bottom: 10px;
            margin-bottom: 12px;
            h2{
                font-size: 16px;
                line-height: 20px;
                padding: 19px 0 10px 0;
                border-bottom: 1px solid #e2e2e2; 
            }
            .essentialInformation{
                font-size: 14px;
                margin: 5px;
                p{
                    display: inline-block;
                    color:#333333;
                    line-height: 30px;
                    vertical-align: top;
                    width: 24%;
                    font-size: 14px;
                    .spanDiv{
                        display: block;
                    }
                    span{
                        color:#333;
                        display: inline-block;
                    }
                    span:first-child{
                        text-align: center;
                    }
                    span:nth-child(2){
                        // color: #333;
                        font-weight: bold;
                    }
                    .fontRed{
                        color: red;
                    }
                }
                .minwidth{
                    width: 200px;
                }
                .morewidth{
                    width: 48.4%;
                }
                .lesswidth{
                    width: 521px;
                }

                .markInfo{
                    width: 50%;
                }
            }
        }
    }
</style>
