<template>
    <div class="identicalStyle" style="height:100%">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="订单流水号">
            <el-input v-model="data.orderSerial" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="交易流水号">
            <el-input v-model="data.tradeSerial" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户姓名/账号">
            <el-input v-model="data.accountName" placeholder="请输入内容" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号类型">
                   <el-select v-model="data.accountType" clearable placeholder="请选择">
                       <el-option label="货主" value="AF00101"></el-option>
                       <el-option label="车主" value="AF00102"></el-option>
                       <el-option label="现金账户" value="AF01601"></el-option>
                       <el-option label="运营账户" value="AF01602"></el-option>
                       <el-option label="合伙人" value="AF00103"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="交易方式">
                   <el-select v-model="data.payWay" clearable placeholder="请选择">
                       <el-option label="支付宝" value="AF0041803"></el-option>
                       <el-option label="微信" value="AF0041802"></el-option>
                       <el-option label="钱包" value="AF0041801"></el-option>
                    </el-select>
            </el-form-item>
                        <br>
            <el-form-item label=" 交易类型" label-width='70px'>
                   <el-select v-model="data.tradeType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in optionsAccountType2"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                          >
                        </el-option>
                    </el-select>
            </el-form-item>                        
            <el-form-item label="服务分类" label-width='70px'>
                   <el-select v-model="data.orderType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in optionsAccountType"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                          >
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="收支类型" label-width='88px'>
                   <el-select v-model="data.incomeExpendType" clearable placeholder="请选择">
                          <el-option label="收入" value="1"></el-option>
                          <el-option label="支出" value="0"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="付款时间">
                    <el-date-picker
                    v-model="payTime"
                        is-range
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                         @change='cTime'
                    >
                    </el-date-picker>
            </el-form-item>            
                <el-form-item class="fr">     
                  <el-button type="primary"  plain @click="getdata_search" :size="btnsize">查询</el-button>
                  <el-button type="primary"  plain @click="reset" :size="btnsize">重置</el-button>
                </el-form-item>    
          </el-form>
  
            <div class="classify_info">
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
                    <el-table-column  label="序号" width="80px" type="index">
                    </el-table-column>
                        <el-table-column
                            align = "center"
                            prop="orderSerial"
                            label="订单流水号"
                             show-overflow-tooltip
                            width="180">
                        </el-table-column>
                        <el-table-column
                          align = "center"
                          prop="tradeSerial"
                          label="交易流水号"
                           show-overflow-tooltip
                          width="180">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="createTime"
                          label="创建时间"
                          width="170">
                             
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="accountName"
                          label="用户账号 / 姓名"
                          width="150">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="accountTypeName"
                          label="账号类型"
                          width="110">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payTotal"
                          width="110"
                          label="交易金额">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="incomeExpendTypeName"
                          width="110"
                          label="收支类型">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payWayName"
                          width="110"
                          label="交易方式">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="tradeTypeName"
                          label="交易类型"
                          width="110">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="orderTypeName"
                          width="110"
                          label="服务分类">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payTime"
                           show-overflow-tooltip
                          label="付款时间">
                        </el-table-column>
                        
                        <el-table-column
                        align = "center"
                          prop="totalAmount"
                          label="操作"
                          width="80">
                          <template slot-scope="scope">
                              <el-button @click="handleClick(scope.row)" type="text" size="small">相关信息</el-button>
                              
                            </template>
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
                </div>
            </div>
    </div>
</template>

<script type="text/javascript">
import {data_financeList,data_GetServerType,data_GetServerType2,data_GetServerType3} from '@/api/finance/financeServer.js'
import {data_GetCarStyle} from '@/api/server/areaPrice.js'
import '@/styles/dialog.scss'
import { parseTime,formatTime } from '@/utils/index.js'

    export default{
        data(){
            return{
                data:{
                  orderSerial:null,
                  tradeSerial:null,
                  tradeStatus:null,
                  accountName:null,
                  accountType:null,                 
                  payWay:null,
                  tradeType:null,
                  orderType:null,
                  tradeStartTime:null,
                  tradeEndTime:null,
                  incomeExpendType:null,
                },
                btnsize:'mini',
                payTime:null,
                currentPage4:1,
                page:1,
                pagesize:20,
                dataTotal:null,
                tableDataTree:[],
                optionsAccountType: [
                    {code:'AF01701',name:'同城'},
                    {code:'AF01702',name:'零担'},
                    {code:'AF01703',name:'城际'},                    
                ],
                optionsAccountType2: [
                    {code:'AF01403',name:'订单多退'},
                    {code:'AF01404',name:'理赔收入'},
                    {code:'AF01407',name:'退运费'},
                    {code:'AF01408',name:'运费收入'},
                    {code:'AF01411',name:'支付运费'},
                    {code:'AF01412',name:'支付理赔'},
                    {code:'AF01414',name:'平台抽佣'},
                    {code:'AF01501',name:'支付运费'},
                    {code:'AF01503',name:'支付理赔'},
                    {code:'AF01505',name:'优惠券'},
                    {code:'AF01508',name:'运费收入'},
                    {code:'AF01509',name:'理赔收入'},
                    {code:'AF01510',name:'订单多退'},
                    {code:'AF01511',name:'退运费'},
                    {code:'AF01515',name:'优惠金'},
                    {code:'AF01516',name:'奖励金'},                    
                    ],
                alloption1:{},
                alloption2:{},
            }
        },
        components:{
            

        },
        mounted(){
            this.load();
            this.getMoreInformation();
        },  
        methods: {
          //翻页
           handleSizeChange(val){

                this.pagesize = val ;
                this.load();
           },
           //跳转当前页
           handleCurrentChange(val){

                this.page = val;
                this.load();
           },
            //点击查询
            getdata_search(event){
               this.load()
            },
            
           //重置
            reset(){
                this.data = {
                  orderSerial:null,
                  tradeSerial:null,
                  tradeStatus:null,
                  accountName:null,
                  accountType:null,                 
                  payWay:null,
                  tradeType:null,
                  orderType:null,
                  tradeStartTime:null,
                  tradeEndTime:null,
                  incomeExpendType:null,
                  tradeStartTime:null,
                  tradeEndTime:null,
                };
                  this.payTime=null
                this.load();
            },
             //点击选中当前行
           clickDetails(row, event, column){
               
           },
           //双击
            moreinfo(row, event){
              
               
            },
            //获取信息列表
            getMoreInformation(){    
            },
            //相关信息
            handleClick(row){
                this.data.orderSerial = row.orderSerial;
                this.load();
            },
            //判断是否选中
            getinfomation(selection){
               
            },
            cTime(i){
            this.data.tradeStartTime = i[0];
            this.data.tradeEndTime = i[1];
            },
            //刷新页面  
            load(){                   
                data_financeList(this.page,this.pagesize,this.data).then(res=>{              
                    this.tableDataTree = res.data.list;
                    this.dataTotal = res.data.totalCount;
                     for(var i = 0;i<this.tableDataTree.length;i++){
                        this.tableDataTree[i].payTime = parseTime(this.tableDataTree[i].payTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    }  
                })
            },
            
        }
    }
</script>

<style type="text/css" lang="scss">
    .finance{
        height:100%;    
        position: relative;
        margin-left:7px;
        &>.classify_searchinfo{
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            height:160px;
            width:100%;
            line-height: 35px;

            label{
                  width: 24%;
                  color: #666;
                  font-size: 14px;
                  overflow: hidden;
                  display: inline-block;
                  text-align:center;
                span{
                      width: 100px;
                      display: inline-block;
                      text-align: right;
                      float: left;
                }
                .el-button{
                  span{
                    width:auto;
                  }
                }
                .el-input{
                    width:calc(100% - 100px);
                    display: inline-block;
                    .el-input__inner{
                        color:#3e9ff1;
                        height:30px;
                        line-height: 30px;
                        width:100%;
                    }
                }
                .el-select {
                    display: inline-block;
                    position: relative;
                    width: calc(100% - 100px);
                    display: inline-block;
                    float: left;
                    .el-input{
                      width:100%;
                    }
                }
                .el-date-editor--daterange.el-input__inner{
                    width: calc(100% - 100px);
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
            
            padding:170px 13px 18px;
            height:100%;
            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:20px;
                    padding:10px 20px;
                }
            }
            .info_news{
                height:100%;
            }
            .Pagination{
                margin-top:13px;
                text-align:right;
            }
        }
    }
</style>