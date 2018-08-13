<template>
    <!-- 详情 -->
   <el-collapse v-model="activeNames" class="detailsList" v-loading="loading" v-if="Object.keys(listInformation).length != 0" @change="handleChange">
        <el-collapse-item title="订单基本信息" name="1">
            <div class="essentialInformation">
                <h6>
                    <span>订单编号：</span>
                    <span>{{listInformation.orderSerial}}</span>
                 </h6>
                <h6>
                    <span>所属区域：</span>
                    <span>{{listInformation.belongCity}}</span>
                </h6>
                <h6>
                    <span>服务分类：</span>
                    <span>{{listInformation.orderType}}</span>
                </h6>
                <h6>
                    <span>订单状态：</span>
                    <span>{{listInformation.orderStatus}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6>
                    <span>订单类型：</span>
                    <span>{{listInformation.orderClass === '1' ? '实时订单' : '预约订单'}}</span>
                </h6>
                <h6>
                    <span>用车时间：</span>
                    <span>{{parseTimeFunction(listInformation.useCarTime)}}</span>
                </h6>
                <h6>
                    <span>下单时间：</span>
                    <span>{{parseTimeFunction(listInformation.useTime)}}</span>
                </h6>
                <h6>
                    <span>货主账号：</span>
                    <span>{{listInformation.shipperMobile}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6>
                    <span>货主姓名：</span>
                    <span>{{listInformation.shipperName}}</span>
                </h6>
                <h6>
                    <span>所需车型：</span>
                    <span>{{listInformation.usedCarType}} </span>
                    <span v-if="listInformation.spec">- {{listInformation.spec}}</span>
                </h6>
                <h6>
                    <span>我的司机优先接单：</span>
                    <span>{{listInformation.isFirst == 1 ? '已选' : '未选'}}</span>
                </h6>
                <h6>
                    <span>订单来源：</span>
                    <span>{{listInformation.orderFrom}}</span>
                </h6>
            </div>
        </el-collapse-item>
        <el-collapse-item title="地址信息" name="2">
            <div v-for="(obj,idx) in listInformation.aflcOrderAddresses" :key="obj.id">
                <div class="essentialInformation">
                    <h6 class="morewidth">
                        <span v-if="idx == 0">发货地：</span>
                        <span v-else-if="idx == listInformation.aflcOrderAddresses.length-1">收货地：</span>
                        <span v-else>途径地{{ listInformation.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                        <span>{{obj.viaAddressName}}({{obj.provinceCityArea}}{{obj.viaAddress}})</span>
                    </h6>
                </div>
                <div class="essentialInformation">
                    <h6>
                        <span v-if="idx == 0">发货人：</span>
                        <span v-else>收货人：</span>
                        <span>{{obj.contacts}}</span>
                    </h6>
                     <h6>
                        <span>联系方式：</span>
                        <span>{{obj.contactsPhone}}</span>
                    </h6>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title=" 货物及备注" name="3">
            <div class="essentialInformation">
                <h6>
                    <span>货物名称：</span>
                    <span>{{listInformation.goodsName}}</span>
                 </h6>
                <h6>
                    <span>重量体积：</span>
                    <span>{{listInformation.goodsWeight}}吨 {{listInformation.goodsVolume}}方</span>
                </h6>
                <h6>
                    <span>额外服务：</span>
                    <span>{{listInformation.extraName}}</span>
                </h6>
                <h6>
                    <span>备注：</span>
                    <span>{{listInformation.remark}}</span>
                </h6>
            </div>
        </el-collapse-item>
        <el-collapse-item title="运费信息" name="4">
            <div class="essentialInformation">
                <h6>
                    <span>运费总额：</span>
                    <span>￥{{listInformation.totalAmount}}</span>
                 </h6>
                <h6>
                    <span>货主支付：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.factPay}}({{listInformation.payWay}})</span>
                </h6>
                <h6>
                    <span>车主收入：</span>
                    <span>￥{{listInformation.orderType}}</span>
                </h6>
                <h6>
                    <span>付款状态：</span>
                    <span>{{listInformation.payStatus}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6>
                    <span>里程数：</span>
                    <span>{{listInformation.aflcOrderExpenses.totalMileage}}</span>
                </h6>
                <h6>
                    <span>起步价：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.startPrice}}</span>
                </h6>
                <h6>
                    <span>超里程费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.outMileagePrice}}</span><span v-if="listInformation.aflcOrderExpenses.outMileagePrice != 0">({{listInformation.outMileage}})</span>
                </h6>
                <h6>
                    <span>额外服务费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.totalExtraCharge}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6>
                    <span>等候费：</span>
                    <span>￥{{listInformation.shipperName}}</span>
                </h6>
                <h6>
                    <span>小费：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.tip}} </span>
                </h6>
                <h6>
                    <span>车主改价：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.driverChangeFee}}</span>
                </h6>
                <h6>
                    <span>优惠券抵扣：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.preferentialPrice}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6>
                    <span>平台奖励车主：</span>
                    <span>￥{{listInformation.aflcOrderExpenses.reward}}</span>
                </h6>
            </div>
        </el-collapse-item>
        <el-collapse-item title="车主信息" name="5">
            <div class="essentialInformation">
                <h6>
                    <span>车主账号：</span>
                    <span>{{listInformation.aflcDriverStatus.driverMobile}}</span>
                 </h6>
                <h6>
                    <span>车主姓名：</span>
                    <span>{{listInformation.aflcDriverStatus.driverName}}</span>
                </h6>
                <h6>
                    <span>车牌号：</span>
                    <span>{{listInformation.aflcDriverStatus.carNumber}}</span>
                </h6>
                <h6>
                    <span>车型：</span>
                    <span>{{listInformation.aflcDriverStatus.carType}}</span>
                </h6>
            </div>
            <div class="essentialInformation">
                <h6>
                    <span>中单等级：</span>
                    <span>{{listInformation.orderClass === '1' ? '实时订单' : '预约订单'}}</span>
                </h6>
                <h6>
                    <span>派单方式：</span>
                    <span>{{parseTimeFunction(listInformation.useCarTime)}}</span>
                </h6>
            </div>
        </el-collapse-item>
         <el-collapse-item title="客服备注" name="6">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="date"
                label="客服"
                width="200"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="备注时间"
                width="300"
                >
            </el-table-column>
            <el-table-column
                prop="address"
                label="备注内容">
            </el-table-column>
            </el-table>
        </el-collapse-item>
        <el-collapse-item name="7">
             <el-tabs v-model="tabName" type="border-card" @tab-click="handleClick" >
            <!-- 订单跟踪 -->
                <el-tab-pane label="订单跟踪" name="orderTracking">
                    <orderTracking  :tableDataArr = "listInformation.aflcOrderFollowingFiles" :isvisible="tabName === 'orderTracking'"></orderTracking>
                </el-tab-pane>

            <!-- 抢单记录 -->
                <el-tab-pane label="抢单记录" name="robbingList">
                    <robbingList :isvisible="tabName === 'robbingList'" :robbingData = "listInformation.aflcOrderGrabs"></robbingList>
                </el-tab-pane>

            <!-- 推单记录 -->
                <el-tab-pane label="推单记录" name="pushOrderList">
                    <pushList :isvisible="tabName === 'pushOrderList'" :pushOrderData = "listInformation.aflcOrderPushes"></pushList>
                </el-tab-pane>
                
            <!-- 行驶轨迹 -->
                <el-tab-pane label="行驶轨迹" name="driveTrail">
                    <driverTrail :isvisible="tabName === 'driveTrail'" :driverTrailData = "listInformation.aflcOrderCarTrails"></driverTrail>
                </el-tab-pane>

            <!-- 回单回款评价 -->
                <el-tab-pane label="回单回款评价" name="rate">
                    <rate :isvisible="tabName === 'rate'" :rateData = "listInformation.aflcOrderEvaluations"></rate>
                </el-tab-pane>
            </el-tabs>
        </el-collapse-item>
    </el-collapse> 

</template>

<script>
import { orderDetailsList } from '@/api/order/ordermange'
import { parseTime } from '@/utils/index.js'
import orderTracking from './tabsTable/orderTracking'
import robbingList from './tabsTable/robbingList'
import pushList from './tabsTable/pushOrderList'
import driverTrail from './tabsTable/driveTrail'
import rate from './tabsTable/rateComponent'

export default {
    name: 'detailsComponent',
    components:{
        orderTracking,
        robbingList,
        pushList,
        driverTrail,
        rate
    },
    props: {
        listOrderSerial:{
            type:String,
            required:true
        },
        record:{
            type:Boolean,
        }
    },
    data() {
        return {
            tabName:'orderTracking',
            loading:true,
            listInformation:{},
            parseTimeFunction:null,
            activeNames: ['1','2','3','4','5','6','7'],
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
            // tableDataArray:[],
        };
    },
    computed: {
    　　
    },
    watch: {
        listOrderSerial: {
            handler (cval, oval) {
                console.log('--------')
                console.log(cval, oval)
                if(cval){
                    this.init();
                }
            },
            deep: true,
            immediate:true
        },
    },
    mounted(){

    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        init(){
            this.parseTimeFunction = parseTime;
            orderDetailsList(this.listOrderSerial).then(res => {
                console.log('details',res)
                this.listInformation = res.data;
                this.listInformation.aflcOrderAddresses.sort(function(a,b){  
                    return a.viaOrder - b.viaOrder;  
                })
                this.loading = false;
                // this.tableDataArray = this.listInformation.aflcOrderFollowingFiles;
            })
            console.log()
        },
        handleClick(tab, event){
            this.tabName = tab.name;
        }
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .el-collapse{
        border-top: 0 none ;
        border-bottom:0 none ;
        padding: 0 10px;
        .el-collapse-item{
            margin-bottom:10px;
            .el-collapse-item__header{
                text-align: center;
                background-color: #e9f3fa;
                font-size:16px;
                color: #333333;
                height: 45px;
                line-height: 45px;
                .el-icon-arrow-right{
                    margin-right:0;
                    float: left;
                    margin-left:15px;
                    line-height: 45px;
                }
            }
            .el-collapse-item__wrap{
                background-color: #f0f0f0;
                margin:4px 0;
                border:0 none ;
                width:100%;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #666666;
                .el-collapse-item__content{
                    padding-bottom:0;
                    .essentialInformation:nth-child(2n-1){
                        background: #f8f0e5;
                    }
                    .essentialInformation{
                        padding: 5px 10px 5px 60px;
                        h6{
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
                                color:#666;
                                display: inline-block;
                            }
                            span:first-child{
                                text-align: center;
                                // width: 30%;
                            }
                            span:nth-child(2){
                                color: #333;
                            }
                        }
                        .minwidth{
                            width: 200px;
                        }
                        .morewidth{
                            width: 100%;
                        }
                        .lesswidth{
                            width: 521px;
                        }
                    }
                }
            }
            .el-table{
                position:static;    
                th,td{
                    // border-bottom:0 none;
                    // border-color:none;
                    background:#f0f0f0;
                    text-align:center;
                }
                &::before {
                    height:0px;
                    width:0px;
                }
                .el-table--border::after, .el-table--group::after {
                    top: 0;
                    right: 0;
                    height: 0;
                    width: 0;
                    /* width: 1px; */
                    /* height: 100%; */
                }
                .cell {
                    white-space: initial;
                    overflow: hidden;
                }
            }
            .el-table{
                margin-bottom: 5px;
            }
            .info_tab_footer{
                position: relative;
            }
        }
    }
</style>