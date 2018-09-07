<template>
    <div class="identicalStyle clearfix waitpayment" v-loading="loading">
              <el-form :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                    <el-form-item label="区域" prop="pointName">
                        <vregion :ui="true" @values="regionChange" class="form-control">
                            <el-input v-model="searchInfo.belongCityName" placeholder="请选择出发地" clearable></el-input>
                        </vregion>
                    </el-form-item>
                    <el-form-item label="订单号" prop="orderSerial">
                        <el-input v-model="searchInfo.orderSerial" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="货主" maxlength="18"  prop="shipperName">
                        <el-input v-model="searchInfo.shipperName" clearable placeholder="账户/姓名">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="车主" maxlength="18"  prop="shipperName">
                        <el-input v-model="searchInfo.driverName" clearable placeholder="账户/姓名/车牌号">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="下单时间" prop="mobile">
                        <el-date-picker
                            v-model="chooseTime"
                            type="daterange"
                            :picker-options="pickerOptions2"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            :default-time="['00:00:00', '23:59:59']"
                            value-format="timestamp">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="btnChoose fr"  style="margin-left:0;">
                        <el-button type="primary" plain @click="handleSearch('search')">搜索</el-button>
                        <el-button type="info" plain @click="handleSearch('clear')">清空</el-button>
                    </el-form-item>
              </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" plain @click="handleSearch('search')" size="mini">导出Exce</el-button>
                </div>
                <div class="info_news" style="height:87%;">
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
                            label="货主"
                            width="250">
                            <template slot-scope="scope">
                                <p>{{scope.row.shipperMobile}}<span v-if="scope.row.shipperName">-</span>{{scope.row.shipperName}}</p>    
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="车主"
                            width="300">
                            <template slot-scope="scope">
                                <p>{{scope.row.aflcDriverStatus.driverMobile}}<span v-if="scope.row.aflcDriverStatus.driverName">-</span>{{scope.row.aflcDriverStatus.driverName}}<span v-if="scope.row.aflcDriverStatus.carNumber">-</span>{{scope.row.aflcDriverStatus.carNumber}}</p>    
                            </template>
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
                            prop="useCarTime"
                            label="用车时间"
                            width="250">
                                <template  slot-scope="scope">
                                    <span class="timeChoose">
                                        {{ scope.row.useCarTime | parseTime}}    
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
                                {{ scope.row.useTime | parseTime}}
                            </template>
                        </el-table-column>
                    </el-table>
                      <!-- 页码 -->
                    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>    
                </div>
            </div>

            <!-- <Details :dialogFormVisible_details.sync = "dialogFormVisible_details" :orderSerial="DetailsOrderSerial" ></Details> -->
    </div>
</template>

<script type="text/javascript">

import '@/styles/dialog.scss'
import { orderStatusList } from '@/api/order/ordermange'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
// import Details from '../components/detailsInformations'
import vregion from '@/components/vregion/Region'


    export default{
        components:{
            Pager,
            // Details,
            vregion
        },
        data(){
            return{
                timeOutComplate:null,
                loading: true,//加载
                sizes:[20,50,100],
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    belongCity:'',//区域
                    belongCityName:'',//区域
                    shipperName:'',//货主
                    startOrderDate:'',//下单起始时间
                    endOrderDate:'',//下单结束时间
                    orderSerial:'',//订单号
                    parentOrderStatus:'AF00807',//订单状态
                    driverName:''
                },
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                chooseTime:'',
                tableData:[],
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
            }
        },
        created(){

        },
        mounted(){
            this.firstblood();
            // this.timeOutComplate = setInterval(this.firstblood,60000)
            // console.log(this.$store)
        },  
        beforeDestroy(){
            clearInterval(this.timeOutComplate);
        },
        methods: {
            regionChange(d) {
                console.log('data:',d)
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.city){
                    this.searchInfo.belongCity = d.city.code;
                }else{
                    this.searchInfo.belongCity = d.province.code;
                }
            },
            getValue(obj){
                return obj ? obj.value:'';
            },
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();

            },
            //单选中当前数据
            handleCurrentTask(val){
                // console.log(val)
                this.tasktest = val;
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                orderStatusList(this.page,this.pagesize,this.searchInfo).then(res => {
                    console.log('已完成',res)
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;

                    this.tableData.forEach(item => {
                        item.aflcOrderAddresses.sort(function(a,b){  
                            return a.viaOrder - b.viaOrder;  
                        })  
                    })
                    this.loading = false;
                })
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
                            parentOrderStatus:'AF00807',//订单状态待支付
                        };
                        this.chooseTime = [];
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
                // this.dialogFormVisible_details = true;
                // this.DetailsOrderSerial = item.orderSerial;
                this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});

            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .waitpayment{
       
    }
</style>