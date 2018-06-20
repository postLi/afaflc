<template>
    <div class="DispatchTrack clearfix">
             <div class="classify_searchinfo">
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
                    <el-button type="primary" plain icon="el-icon-success" @click="addClassfy">指派司机</el-button>
                    <el-button type="primary" plain icon="el-icon-error" @click="cancellOrder">取消订单</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableDataTree"
                        stripe
                        border
                        align = "center"
                        height="93%"
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
                            align = "center"
                            fixed
                            prop="orderSerial"
                            label="订单号"
                            width="250">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="orderTypeName"
                          label="订单分类"
                          width="80">
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
                          label="货主账号"
                          width="120">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="shipperName"
                          label="货主姓名"
                          width="110">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="shipperAddress"
                          label="发货地址">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="endTime"
                          label="途径地">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="endTime"
                          label="收货地址">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="carTypeName"
                          label="所需车型"
                          width="110">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="totalAmount"
                          label="运费总额"
                          width="80">
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
                
                <!-- 新增数据 -->
                <appointDriver :dialogFormVisible.sync = "dialogFormVisible" :formtitle = "formtitle" @renovate="Onrenovate" @ifError="hint" ></appointDriver>
                <!-- 修改数据 -->
                <changeclassify :dialogFormVisibleChange.sync = "dialogFormVisibleChange" :formtitle = "formtitle_change" @ifError="hint" @renovate="Onrenovate" :changeforms = 'changeforms'></changeclassify>
            </div>
        <!-- loading   -->
        <!-- <spinner v-show="show"></spinner>  -->
        
    </div>
</template>

<script type="text/javascript">

import { data_dispatchList,data_ChangeStatus } from '../../../api/dispatch/OrderServer.js'
import '@/styles/dialog.scss'
import spinner from '../../spinner/spinner'
// import { parseTime,formatTime } from '../../../../utils/index.js'
import appointDriver from './appointDriver'
import changeclassify from './changeclassify'
import { data_CarList } from '@/api/common.js'

    export default{
        data(){
            return{
                value6:null,
                carNumber:null,//车主账号
                shipperNumber:null,//货主账号
                data:{
                },//获取页面数据 后端要求传参{}
                changeforms:{},
                page:1,//页码
                pagesize:20,//页码数量
                formtitle:'指派司机',//弹窗标题
                formtitle_change:'修改绑定车主',
                currentPage4:1,//默认显示第一页
                dialogFormVisible: false,//新增弹窗
                dialogFormVisibleChange:false,//修改弹窗
                dialogFormVisible_change:false,
                centerDialogVisible:false,
                delDialogVisible:false,
                dataTotal:null,//总数
                information:'你想知道什么',
                delIDTree:'',
                checkedinformation:[],//选中的内容
                tableDataTree:[],//table数据表
                carTypeList:null,//车辆类型
            }
        },
        components:{
            spinner,
            appointDriver,
            changeclassify

        },
        mounted(){
            this.firstblood();
            data_CarList().then(res => {
                // console.log(res)
                this.carTypeList = res.data;
            })
        },  
        methods: {
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
            //shuangji
            moreinfo(row, event){
                // console.log(row, event)
               
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
                data_dispatchList(this.page,this.pagesize,this.data).then(res=>{
                    console.log('res:',res)
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
                        
                        item.carTypeName = this.carTypeList.find(el => el.code === item.usedCarType)['name'];
                        // item.startTime = parseTime(item.bindingStartDate,"{y}-{m}-{d}");
                        // item.endTime = parseTime(item.bindingEndDate,"{y}-{m}-{d}");
                    })
                    // console.log(parseTime("1528710180","{y}-{m}-{d}"))
                    // console.log(formatTime("1528710180"))
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
            //新增分类信息
            addClassfy(){
                this.dialogFormVisible = true;
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
    .DispatchTrack{
        height:100%;    
        position: relative;
        margin-left:7px;
        .classify_searchinfo{
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
        .classify_info{
            height:100%;
            padding:90px 13px 18px;
            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:90%;
            }
            .Pagination{
                margin-top:13px;
                text-align:right;
            }
        }
    }
</style>