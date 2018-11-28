<template>
    <div class="identicalStyle clearfix plantOrigin" v-loading="loading">
            <searchInfo @change="getSearchParam"></searchInfo>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" icon="el-icon-warning" :size="btnsize" plain @click="handleSearch('cancel')">取消订单</el-button>
                    <!-- <el-button type="primary" :size="btnsize" plain @click="handleSearch('export')">导出Exce</el-button> -->
                </div>
                <div class="info_news" style="height:89%;">
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
                            type="selection"
                            width="55">
                        </el-table-column>
                         <el-table-column label="序号"  width="80">
                            <template slot-scope="scope">
                                {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            sortable                            
                            prop="orderSerial"
                            label="订单号"
                            width="250">
                                <template  slot-scope="scope">
                                    <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                                </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="orderType"
                            label="服务分类"
                            width="110">
                        </el-table-column>
                        <el-table-column
                            sortable
                            :show-overflow-tooltip="true"
                            prop="belongCity"
                            label="区域"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            sortable
                            :show-overflow-tooltip="true"
                            prop="shipperMobile"
                            label="货主"
                            width="250">
                            <template slot-scope="scope">
                                <p>{{scope.row.shipperMobile}}<span v-if="scope.row.shipperName">-</span>{{scope.row.shipperName}}</p>    
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="车主"  
                            :show-overflow-tooltip="true"
                            sortable
                            prop="driverMobile"
                            width="250">
                            <template slot-scope="scope">
                                {{scope.row.aflcDriverStatus.driverMobile}}{{scope.row.aflcDriverStatus.driverName ? '-' + scope.row.aflcDriverStatus.driverName : ''}}{{scope.row.aflcDriverStatus.carNumber ? "-" + scope.row.aflcDriverStatus.carNumber : ''}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            :show-overflow-tooltip="true"
                            prop="usedCarType"
                            label="所需车型"
                            width="120">
                        </el-table-column>
                         <el-table-column
                            sortable
                            :show-overflow-tooltip="true"
                            prop="totalAmount"
                            label="运费总额（元）"
                            width="150">
                        </el-table-column> 
                        <el-table-column
                            sortable
                            prop="useCarTime"
                            label="用车时间"
                            width="160">
                                <template  slot-scope="scope">
                                    <span>
                                        {{ scope.row.useCarTime | parseTime}}    
                                    </span>
                                </template>
                        </el-table-column>
                         <el-table-column
                            sortable
                            prop="orderClass"
                            label="订单类型"
                            width="120">
                                <template  slot-scope="scope">
                                    {{ scope.row.orderClass == '1' ? '即时订单' : '预约订单' }}
                                </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="payStatus"
                            label="付款状态"
                            width="120">
                                <template  slot-scope="scope">
                                    {{ scope.row.payStatus == 'AF00801' ? '待付款' : '已付款' }}
                                </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="aflcOrderAddresses"
                            label="提货地"
                            :show-overflow-tooltip="true"
                            width="250">
                            <template  slot-scope="scope">
                                 {{ scope.row.aflcOrderAddresses[0].viaAddressName}}{{scope.row.aflcOrderAddresses[0].viaAddress ? '('+scope.row.aflcOrderAddresses[0].viaAddress+')' : ''}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="aflcOrderAddresses"
                            label="目的地"
                            :show-overflow-tooltip="true"
                            width="250">
                            <template  slot-scope="scope">
                                {{ scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddressName }}{{scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddress ? '('+scope.row.aflcOrderAddresses[scope.row.aflcOrderAddresses.length-1].viaAddress+')' : ''}}
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            prop="aflcOrderAddresses"
                            label="配送路径"
                            width="500">
                            <template  slot-scope="scope">
                                <p class="aflcOrderAddresses" v-for="(obj,idx) in scope.row.aflcOrderAddresses" :key="obj.id">
                                    <span v-if="idx == 0">发货地：</span>
                                    <span v-else-if="idx == scope.row.aflcOrderAddresses.length-1">收货地：</span>
                                    <span v-else>途径地{{ scope.row.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                                    {{obj.viaAddressName}}
                                </p>
                            </template>
                        </el-table-column> -->
                        <el-table-column
                            sortable
                            prop="useTime"
                            label="下单时间"
                            width="160">
                            <template  slot-scope="scope">
                                {{ scope.row.useTime | parseTime}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>    

            <cancelCompnent :dialogVisible.sync="dialogVisible" :orderSerial = "currentOrderSerial"   @close = "shuaxin"/>
    </div>
</template>

<script type="text/javascript">

import { orderStatusList } from '@/api/order/ordermange'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import searchInfo from './components/searchInfo'
import cancelCompnent from '../components/cancel'

    export default{
        props: {
            isvisible: {
                type: Boolean,
                default: false
            },
            status: {
                type: String,
                required : true
            }
        },
        components:{
            Pager,
            // Details,
            searchInfo,
            cancelCompnent,
        },
        data(){
            return{
                btnsize:'mini',
                currentOrderSerial:'',//当前选择的流水号
                timeOut:null,
                loading: true,//加载
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
                    orderStatus:'',//订单状态
                    parentOrderStatus:'AF00806PT',//订单状态
                },
                tableData:[],
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
                dialogVisible:false,//取消订单弹框
                checkedinformation:[],//选中数据
            }
        },
        watch:{
            isvisible: {
                handler(newVal, oldVal) {
                    if(newVal){
                        this.firstblood();
                        // this.timeOut = setInterval(this.firstblood,60000)
                    }else{
                        clearInterval(this.timeOut);
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            },
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
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                this.searchInfo.orderStatus = this.status;
                orderStatusList(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log('是否刷新',res.data)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.tableData.forEach(item => {
                        item.aflcOrderAddresses.sort(function(a,b){  
                            return a.viaOrder - b.viaOrder;  
                        })  
                    })
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                switch(type){
                    case 'cancel':
                        console.log(this.checkedinformation.length)
                        if(this.checkedinformation.length == 0){
                            return this.$message({
                                type: 'info',
                                message: '请选择一个订单' 
                            })
                        } else if(this.checkedinformation.length > 1){
                            return this.$message({
                                type: 'info',
                                message: '只能选择一个订单' 
                            })
                        }else{
                            this.currentOrderSerial = this.checkedinformation[0].orderSerial;
                            this.dialogVisible = true;
                        }
                        break;
                    case 'export':
                        
                }
            },
             //判断是否选中
            getinfomation(selection){
                console.log('当前选中',selection)
                this.checkedinformation = selection;
            },
             //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //详情弹窗
            pushOrderSerial(item){
                this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});
            },
            getSearchParam(obj) {
                console.log(obj)
                this.searchInfo = Object.assign(this.searchInfo, obj)
                this.loading = false;
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                }
                this.firstblood()
            },
            shuaxin(){
                this.firstblood();
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .plantOrigin{
        height: 100%;
    }
</style>