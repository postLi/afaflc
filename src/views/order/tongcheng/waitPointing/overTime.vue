<template>
    <div class="identicalStyle clearfix plantOrigin" v-loading="loading">
            <searchInfo></searchInfo>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" @click="handleSearch('search')" size="mini">指派司机</el-button>
                    <el-button type="primary" @click="handleSearch('search')" size="mini">取消订单</el-button>
                    <el-button type="primary" @click="handleSearch('search')" size="mini">导出Exce</el-button>
                </div>
                <div class="info_news" style="height:85%;">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            fixed
                            type="selection"
                            width="55">
                        </el-table-column>
                         <el-table-column
                            fixed
                            label="序号"
                            type="index"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="orderSerial"
                            label="订单号"
                            width="250">
                                <template  slot-scope="scope">
                                        <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderType"
                            label="服务分类"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            prop="belongCity"
                            label="区域"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="shipperMobile"
                            label="货主账号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="shipperName"
                            label="货主姓名"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="usedCarType"
                            label="所需车型"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="totalAmount"
                            label="运费总额（元）"
                            width="150">
                        </el-table-column> 
                        <el-table-column
                            prop="totalAmount"
                            label="等待时长"
                            width="150">
                        </el-table-column> 
                        <el-table-column
                            prop="useCarTime"
                            label="用车时间"
                            width="250">
                                <template  slot-scope="scope">
                                    <span class="timeChoose">
                                        {{ parseTimeFunction(scope.row.useCarTime)}}    
                                    </span>
                                </template>
                        </el-table-column>
                         <el-table-column
                            label="订单类型"
                            width="120">
                                <template  slot-scope="scope">
                                    {{ scope.row.orderClass == '1' ? '即时订单' : '预约订单' }}
                                </template>
                        </el-table-column>
                        <el-table-column
                            label="付款状态"
                            width="150">
                                <template  slot-scope="scope">
                                    {{ scope.row.payStatus == 'AF00801' ? '待付款' : '已付款' }}
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="aflcOrderAddresses"
                            label="配送路径"
                            width="500">
                            <template  slot-scope="scope">
                                <p class="aflcOrderAddresses" v-for="(obj,idx) in scope.row.aflcOrderAddresses" :key="obj.id">
                                    <span v-if="idx == 0">发货地：</span>
                                    <span v-else-if="idx == scope.row.aflcOrderAddresses.length-1">收货地：</span>
                                    <span v-else>途径地{{ scope.row.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                                    {{obj.viaAddress}}
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="下单时间"
                            width="250">
                            <template  slot-scope="scope">
                                {{ parseTimeFunction(scope.row.useTime)}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    

            <Details :dialogFormVisible_details.sync = "dialogFormVisible_details" :orderSerial="DetailsOrderSerial" ></Details>
    </div>
</template>

<script type="text/javascript">

import { orderStatusList } from '@/api/order/ordermange'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import Details from '../components/detailsInformations'
import searchInfo from './components/searchInfo'

    export default{

        components:{
            Pager,
            Details,
            searchInfo
        },
        data(){
            return{
                timeOut:null,
                loading: false,//加载
                sizes:[20,50,100],
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    belongCity:'',//区域
                    shipperName:'',//货主
                    startOrderDate:'',//下单起始时间
                    endOrderDate:'',//下单结束时间
                    orderSerial:'',//订单号
                    parentOrderStatus:'AF00801',//订单状态
                },
                tableData:[],
                parseTimeFunction:null,
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
            }
        },
        watch:{
            isvisible: {
                handler(newVal, oldVal) {
                    if(newVal){
                        this.firstblood();
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            }
        },
        created(){

        },
        mounted(){
            // this.firstblood();
        },  
        beforeDestroy(){
            clearInterval(this.timeOut);
        },
        methods: {
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
            },
            //刷新页面  
            firstblood(){
                orderStatusList(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log(res)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;

                    this.tableData.forEach(item => {
                        item.aflcOrderAddresses.sort(function(a,b){  
                            return a.viaOrder - b.viaOrder;  
                        })  
                    })
                })

                this.loading = false;
                this.parseTimeFunction = parseTime;
            },
           
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                switch(type){
                    case 'search':
                        if(this.chooseTime){
                            this.searchInfo.startOrderDate = this.chooseTime[0];
                            this.searchInfo.endOrderDate = this.chooseTime[1];
                        }
                        break;
                    case 'clear':
                        this.searchInfo = {
                            belongCity:'',//区域
                            shipperName:'',//货主
                            startOrderDate:'',//下单起始时间
                            endOrderDate:'',//下单结束时间
                            orderSerial:'',//订单号
                            parentOrderStatus:'AF00801',//订单状态待支付
                        }
                }
                this.firstblood();
            },
             //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },
             //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //详情弹窗
            pushOrderSerial(item){
                // console.log(item)
                this.dialogFormVisible_details = true;
                this.DetailsOrderSerial = item.orderSerial;
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .plantOrigin{
        height: 100%;
    }
</style>