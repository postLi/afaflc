<template>
    <div class="finance clearfix">
             <div class="classify_searchinfo">
                <label><span>订单流水号&nbsp;</span>                   
                  <el-input v-model="data.orderSerial" placeholder="请输入内容" clearable></el-input>
                </label>
                <label><span>交易流水号&nbsp;</span>                   
                  <el-input v-model="data.tradeSerial" placeholder="请输入内容" clearable></el-input>
                </label>
                <label><span>用户姓名&nbsp;</span>
                   <el-input v-model="data.accountName" placeholder="请输入内容" clearable></el-input>
                </label> 
                <label><span>用户账号&nbsp;</span>
                   <el-input v-model="data.accountName" placeholder="请输入内容" clearable></el-input>
                </label>
                <label><span>账号类型&nbsp;</span>
                   <el-select v-model="data.accountType" clearable placeholder="请选择">
                            
                    </el-select>
                </label> 
                <label><span>交易方式&nbsp;</span>
                   <el-select v-model="data.payWay" clearable placeholder="请选择">
                            
                    </el-select>
                </label>
                <label><span>交易类型&nbsp;</span>
                   <el-select v-model="data.tradeType" clearable placeholder="请选择">
                            
                    </el-select>
                </label> 
                <label><span>服务分类&nbsp;</span>
                   <el-select v-model="data.orderType" clearable placeholder="请选择">
                            
                    </el-select>
                </label>
                <label><span>收支类型&nbsp;</span>
                   <el-select v-model="data.serivceCode6" clearable placeholder="请选择">
                            
                    </el-select>
                </label>         
                <label ><span>交易时间&nbsp;</span>
                    <el-date-picker
                    v-model="data.value6"
                    value-format="timestamp"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </label>    
                <!-- {{value6}}  -->
                <label>
                  <el-button type="primary"  plain >查询</el-button>
                  <el-button type="primary"  plain>重置</el-button>
                </label>
                
            </div>
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
                            label="订单流水号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="tradeSerial"
                          label="交易流水号"
                          width="80">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="createTime"
                          label="创建时间"
                          width="120">
                             
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="accountName"
                          label="用户账号 / 姓名"
                          width="120">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="accountType"
                          label="账号类型"
                          width="110">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payTotal"
                          label="交易金额">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="endTime"
                          label="收支类型">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="payWay"
                          label="交易方式">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="tradeType"
                          label="交易类型"
                          width="110">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="totalAmount"
                          label="资金来源"
                          width="80">
                        </el-table-column>
                        <el-table-column
                        align = "center"
                          prop="shipperName"
                          label="交易类型"
                          width="110">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="orderType"
                          label="服务分类">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="tradeStatus"
                          label="交易状态">
                        </el-table-column>
                         <el-table-column
                        align = "center"
                          prop="endTime"
                          label="交易时间">
                        </el-table-column>
                        
                        <el-table-column
                        align = "center"
                          prop="totalAmount"
                          label="操作"
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
                    
                </div>
                
                
            </div>
     
        
    </div>
</template>

<script type="text/javascript">
import {data_financeList} from '../../../api/finance/financeServer.js'
import '@/styles/dialog.scss'


    export default{
        data(){
            return{
                data:{

                },
                currentPage4:1,
                page:1,
                pagesize:20,
                dataTotal:null,
                tableDataTree:[],
            }
        },
        components:{
            

        },
        mounted(){
            this.load();
        },  
        methods: {
           handleSizeChange(obj){
                this.pagesize = val ;
                this.load();
           },
           handleCurrentChange(obj){
                this.page = val;
                this.load();
           },
           //重置
            reset(){
                this.data = {
                    
                };
                this.load();
            },
             //点击选中当前行
           clickDetails(row, event, column){
               
           },
           //双击
            moreinfo(row, event){
                // console.log(row, event)
               
            },
            //判断是否选中
            getinfomation(selection){
               
            },
            //刷新页面  
            load(){
                data_financeList(this.page,this.pagesize,this.data).then(res=>{
                    console.log('res:',res)
                   

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
        .classify_searchinfo{
            
            position: absolute;
            left:0;
            top:0;
            padding:15px 16px;
            border-bottom:2px dashed #ccc;
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