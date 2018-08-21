<template>
    <div class="dingdanxiangqing">
       <el-tabs v-model="orderTabName" type="card" @tab-click="handleClick" >
            <!-- 订单跟踪 -->
                <el-tab-pane label="订单详情" name="orderInfo">
                    <OrderInfo :isvisible="orderTabName === 'orderInfo'"></OrderInfo>

                </el-tab-pane>

            <!-- 订单跟踪 -->
                <el-tab-pane label="订单跟踪" name="orderTracking">
                    <!-- <orderTracking  :tableDataArr = "listInformation.aflcOrderFollowingFiles" :isvisible="orderTabName === 'orderTracking'"></orderTracking> -->
                </el-tab-pane>

            <!-- 抢单记录 -->
                <el-tab-pane label="抢单记录" name="robbingList">
                    <!-- <robbingList :isvisible="orderTabName === 'robbingList'" :robbingData = "listInformation.aflcOrderGrabs"></robbingList> -->
                </el-tab-pane>

            <!-- 推单记录 -->
                <el-tab-pane label="推单记录" name="pushOrderList">
                    <!-- <pushList :isvisible="orderTabName === 'pushOrderList'" :pushOrderData = "listInformation.aflcOrderPushes"></pushList> -->
                </el-tab-pane>
                
            <!-- 行驶轨迹 -->
                <el-tab-pane label="行驶轨迹" name="driveTrail">
                    <!-- <driverTrail :isvisible="orderTabName === 'driveTrail'" :driverTrailData = "listInformation.aflcOrderCarTrails"></driverTrail> -->
                </el-tab-pane>

            <!-- 回单回款评价 -->
                <el-tab-pane label="回单回款评价" name="rate">
                    <!-- <rate :isvisible="orderTabName === 'rate'" :rateData = "listInformation.aflcOrderEvaluations"></rate> -->
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { orderDetailsList } from '@/api/order/ordermange'
import OrderInfo from './components/orderInfo'
// import orderTracking from './tabsTable/orderTracking'
// import robbingList from './tabsTable/robbingList'
// import pushList from './tabsTable/pushOrderList'
// import driverTrail from './tabsTable/driveTrail'
// import rate from './tabsTable/rateComponent'

export default {
    name: 'dingdanxiangqing',
    components:{
        OrderInfo,
        // orderTracking,
        // robbingList,
        // pushList,
        // driverTrail,
        // rate
    },
    props: {
        // listOrderSerial:{
        //     type:String,
        //     required:true
        // },
        // record:{
        //     type:Boolean,
        // }
    },
    data() {
        return {
            orderTabName:'orderTracking',
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
            orderDetailsList(this.listOrderSerial).then(res => {
                console.log('details',res)
                this.listInformation = res.data;
                this.listInformation.aflcOrderAddresses.sort(function(a,b){  
                    return a.viaOrder - b.viaOrder;  
                })
                this.loading = false;
            })
        },
        handleClick(tab, event){
            this.orderTabName = tab.name;
        }
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .dingdanxiangqing{
        height: 100%;
        background-color: #f0f0f0;
        padding-right: 16px;
        .el-tabs--card>.el-tabs__header {
            border-bottom: 1px solid #91cbf7;
            padding-left: 10px;
            padding-top: 12px;
        }
        
        .el-tabs--card>.el-tabs__header .el-tabs__nav{
            border: 0 none;
        }

        .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
            border-left: 1px solid #d2d2d2;
        }

        .el-tabs__item{
            border: 1px solid #d2d2d2;
            border-radius: 4px 4px 0px 0px;
            border-bottom: 0 none;
            height: 30px;
            line-height: 30px;
        }

        .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
            border-top-width: 2px;
            border-color: #91cbf7;
            border-bottom-color: #f0f0f0;
            line-height: 29px;

        }

        .el-tabs__content{
            padding-left: 10px;
            padding-top: 12px;
        }
    }
</style>
