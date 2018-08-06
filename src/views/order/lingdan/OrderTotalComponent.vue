<template>
    <div class="orderTotal clearfix">
        <div class="order_searchinfo">
            <label>订单号&nbsp;
                <el-input v-model="data.shipperName" placeholder="请输入内容" clearable></el-input>
            </label>
            <label>货主姓名&nbsp;
                <el-input v-model="data.driverName" placeholder="请输入内容" clearable></el-input>
            </label>   
            <label>下单时间&nbsp;
                <el-date-picker
                v-model="value6"
                value-format="timestamp"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </label>    
            <!-- {{value6}}  -->
            <el-button type="primary"  plain @click="getdata_search">查询</el-button>
            <el-button type="primary"  plain @click="reset">重置</el-button>
        </div>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" plain icon="el-icon-warning" @click="appoint">跟踪订单</el-button>
                <el-button type="primary" plain icon="el-icon-success" @click="appoint">签收订单</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="cancellOrder">取消订单</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableDataTree"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    @selection-change = "getinfomation"
                    @row-dblclick="moreinfo"
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    style="width: 100%"> 
                    <el-table-column
                        align = "center"
                        fixed
                        type="selection"
                        width="55">
                        </el-table-column>
                    <el-table-column
                        align="center"
                        fixed
                        prop="orderSerial"
                        label="订单号"
                        width="250">
                            <template  slot-scope="scope">
                                    <h4 class="needMoreInfo" >{{ scope.row.orderSerial}}</h4>
                            </template>
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="orderTypeName"
                        label="订单分类"
                        width="110">
                    </el-table-column>
                    <el-table-column
                        align = "center"
                        prop="orderClass"
                        label="订单类型"
                        width="120">
                            <template  slot-scope="scope">
                            {{ scope.row.orderClass === '1' ? '实时用车' : '预约用车' }}
                            </template>
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="shipperMobile"
                        label="运输状态"
                        width="180">
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="shipperName"
                        label="运输二级状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="shipperName"
                        label="付款状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="shipperName"
                        label="货主信息"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="shipperName"
                        label="车主信息"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="aflcOrderAddresses"
                        label="配送路径"
                        width="300  ">
                        <template  slot-scope="scope">
                            <p class="aflcOrderAddresses" v-for="(obj,idx) in scope.row.aflcOrderAddresses" :key="obj.id">
                                <span v-if="idx == 0">发货地：</span>
                                <span v-else-if="idx == scope.row.aflcOrderAddresses.length-1">收货地：</span>
                                <span v-else>途径地{{ scope.row.aflcOrderAddresses.length >3 ? idx : ''}}：</span>
                                <!-- <span v-if="idx != 0 && idx != scope.row.aflcOrderAddresses.length-1 && scope.row.aflcOrderAddresses.length > 2 && scope.row.aflcOrderAddresses.length >= 3">途径地：</span> -->
                                {{obj.viaAddress}}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="carTypeName"
                        label="所需车型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    align = "center"
                        prop="totalAmount"
                        label="运费总额"
                        width="120">
                    </el-table-column>
                </el-table>
                
                    <!-- 页码 -->
                <div class="Pagination ">
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="dataTotal">
                        </el-pagination>
                    </div>
                </div>
                <!-- <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" /></div> </div>     -->

            </div>
            
            
        </div>
        <!-- loading   -->
        <!-- <spinner v-show="show"></spinner>  -->
        <!-- <cue ref="cue"></cue> -->
    </div>
</template>

<script type="text/javascript">

// import spinner from '../../spinner/spinner'
// import { parseTime,formatTime } from '../../../../utils/index.js'
import { data_getList,data_getOrderDetail } from '../../../api/dispatch/OrderServer.js'

    export default{
        props: {
            isvisible: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                value6:null,
                record:false,
                listInformation:{},//列表详细内容
                carNumber:null,//车主账号
                shipperNumber:null,//货主账号
                data:{
                },//获取页面数据 后端要求传参{}
                page:1,//页码
                pagesize:20,//页码数量
                formtitle:'指派司机',//弹窗标题
                formtitle_change:'订单详情',
                currentPage4:1,//默认显示第一页
                dialogFormVisible: false,//新增弹窗
                dialogFormVisibleDetails:false,//详情弹窗
                dataTotal:null,//总数
                information:'你想知道什么',
                checkedinformation:[],//选中的内容
                tableDataTree:[],//table数据表
                carTypeList:null,//车辆类型
                noOrderInformation:'未选中指派订单',//未选中订单提示
                ifOrderInformation:'不可同时指派多个订单',//不可同时指派多个订单
            }
        },
        components:{

        },
        watch: {
            isvisible: {
                handler(newVal, oldVal) {
                
                    if(newVal && !this.inited){
                        console.log('123')
                        // this.inited = true
                        this.firstblood()
                        // this.getMoreInformation()
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            }
        },
        mounted(){
            // eventBus.$on('changeListtwo', () => {
            //         this.firstblood()
            // })
        },
        methods: {
            init(){
                data_CarList().then(res => {
                    console.log('carTypeList:',res.data)
                    this.carTypeList = res.data;
                    this.firstblood();
                })
            },
            //子组件调用父组件刷新页面  
            Onrenovate(){
                this.firstblood();
                this.dialogFormVisible = false;
            },
            // 获取翻页返回的数据
            handlePageChange (obj) {
                console.log(obj)
                // Object.assign(this.searchForm, obj)
                // this.fetchData()
            },
            //双击打开详情页面
            moreinfo(row, event){
                // console.log(row)
                if(row){
                    this.getOrderDetails(row.id);
                    this.record = true;
                    this.dialogFormVisibleDetails = true;
                }
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val ;
                this.firstblood();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                data_getList(this.page,this.pagesize,this.data).then(res=>{
                    console.log('res:',res.data.list)
                    this.tableDataTree = res.data.list;
                    
                    this.dataTotal = res.data.totalCount;

                    this.tableDataTree.forEach(item => {
                        switch(item.orderType){
                            case "AF01701":
                                item.orderTypeName = "同城";
                                break;
                            case "AF01702":
                                item.orderTypeName = "零担";
                                break;
                            case "AF01703":
                                item.orderTypeName = "省际";
                                break;
                        }

                        if(this.carTypeList){
                            item.carTypeName = this.carTypeList.find(el => el.code === item.usedCarType)['name'];
                        }else{

                        }
                        
                        item.receiverPhone  = item.aflcOrderAddresses[item.aflcOrderAddresses.length-1].contactsPhone;
                        item.receiverAddress = item.aflcOrderAddresses[item.aflcOrderAddresses.length-1].viaAddress;

                        // console.log('item.aflcOrderAddresses:',item.aflcOrderAddresses,item.receiverAddress)
                        // console.log('listInformation.aflcOrderAddresses.slice(1,-1):',item.aflcOrderAddresses.slice(1,-1))   
                        item.aflcOrderAddresses.sort(function(a,b){  
                            return a.viaOrder - b.viaOrder;  
                        })  
                        // console.log('item.aflcOrderAddresses:',item.aflcOrderAddresses)
                        // item.startTime = parseTime(item.bindingStartDate,"{y}-{m}-{d}");
                        // item.endTime = parseTime(item.bindingEndDate,"{y}-{m}-{d}");
                    })

                })
            },
            //模糊查询 分类名称或者code
            getdata_search(){
                this.firstblood();
            },
            //重置
            reset(){
                this.data = {
                    shipperName:null,
                    driverName:null,
                };
                this.firstblood();
            },
            //指派司机
            appoint(){
                if(Object.keys(this.checkedinformation).length == 0){
                    //未选择任何修改内容的提示
                    this.$refs.cue.hint(this.noOrderInformation)
                }else if(this.checkedinformation.length >1){
                    this.$refs.cue.hint(this.ifOrderInformation)
                }else{
                    console.log(this.checkedinformation)
                    let detailID = this.checkedinformation[0].id;
                    this.getOrderDetails(detailID);
                    this.dialogFormVisible = true;
                }
            },
            //
            getOrderDetails(id){
                data_getOrderDetail(id).then(res => {
                    this.listInformation
                    let  details = res.data;
                    switch(details.orderBaseInfo.orderType){
                        case "AF01701":
                            details.orderBaseInfo.orderTypeName = "同城";
                            break;
                        case "AF01702":
                            details.orderBaseInfo.orderTypeName = "零担";
                            break;
                        case "AF01703":
                            details.orderBaseInfo.orderTypeName = "省际";
                            break;
                    }
                    if(this.carTypeList){
                        details.orderBaseInfo.carTypeName = this.carTypeList.find(el => el.code === details.orderBaseInfo.usedCarType)['name'];
                    }else{
                        
                    }
                    details.orderBaseInfo.receiverPhone  = details.orderBaseInfo.aflcOrderAddresses[details.orderBaseInfo.aflcOrderAddresses.length-1].contactsPhone;
                    details.orderBaseInfo.receiverAddress = details.orderBaseInfo.aflcOrderAddresses[details.orderBaseInfo.aflcOrderAddresses.length-1].viaAddress;

                    details.orderBaseInfo.aflcOrderAddresses.sort(function(a,b){  
                        return a.viaOrder - b.viaOrder;  
                    })  

                    this.listInformation = details;
                    console.log('listInformation:',this.listInformation)
                })
            },
            //取消订单
            cancellOrder(){

            },
            hint(){

            }
        }
    }
</script>

<style type="text/css" lang="scss">
    @import "../../../styles/tab.scss";
    .orderTotal{
        height: 100%;
        .needMoreInfo{
            cursor: pointer;
            color:#409EFF;
        }
        .order_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            border-bottom:2px dashed #ccc;
            height:70px;
            width:100%;
            line-height: 35px;
            
            label{
                margin-right:50px;
                color: #666;
                font-size:14px; 
                .el-input{
                    width:300px;
                    .el-input__inner{
                        color:#3e9ff1;
                        height:30px;
                        line-height: 30px;
                    }
                }
                .el-date-editor{
                    height: 30px;
                    line-height: 30px;
                    vertical-align: middle;
                    .el-range-separator{
                        width: 10%;
                        margin-top:-10px; 
                    }
                    .el-input__icon{
                        margin-top:-10px; 
                    }
                }
            }
            .el-button{
                padding:8px 20px;
            }
        }
    }
</style>